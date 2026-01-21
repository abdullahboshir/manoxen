import { model, Types } from "mongoose";
import { 
    AppError, 
    makeSlug, 
    QueryBuilder, 
    resolveBusinessUnitId 
} from "@manoxen/core-util";
import { OutletSettings } from "../../infrastructure/persistence/mongoose/outlet-settings.model";
import { BusinessUnit } from "../../infrastructure/persistence/mongoose/business-unit.model";

export class OutletService {
    private readonly outletModel = model('Outlet');

    async createOutlet(data: any, user: any) {
        console.log("[OutletService] createOutlet data.businessUnit:", data.businessUnit);
        console.log("[OutletService] createOutlet data.businessUnitId:", data.businessUnitId);
        
        // Resolve businessUnit from payload (ID, slug, or ObjectId) with user verification
        const businessUnitId = await resolveBusinessUnitId(data.businessUnit || data.businessUnitId, user);
        console.log("[OutletService] Resolved businessUnitId:", businessUnitId);
        
        if (!businessUnitId) {
            throw new AppError(400, "Business Unit context required to create an outlet");
        }

        // Validate Module Inheritance (Outlet cannot have modules not enabled in BU)
        const bu = await this.validateModuleInheritance(businessUnitId, data.activeModules);

        const slug = makeSlug(data.name);
        const code = await this.generateUniqueCode(businessUnitId);

        const outlet = await this.outletModel.create({
            ...data,
            businessUnit: businessUnitId,
            organization: user.organization || bu.organization,
            slug,
            code,
            createdBy: user._id
        });

        // Initialize default settings
        await OutletSettings.getSettings(outlet._id);

        return outlet;
    }

    async getOutlets(query: any) {
        // Use standard query helper which handles slug resolution robustly (returns empty if not found, doesn't throw)
        const { resolveBusinessUnitQuery } = await import("@manoxen/core-util");
        const resolvedQuery = await resolveBusinessUnitQuery(query);

        const builder = new QueryBuilder(this.outletModel.find(), query);
        builder.filter().sort().paginate();
        const data = await builder.modelQuery.populate('businessUnit');
        const meta = await builder.countTotal(); 
        return { data, meta };
    }

    async getOutletById(id: string) {
        if (!id || id === 'new') return null;
        const outlet = await this.outletModel.findById(id).populate('businessUnit');
        if (!outlet) throw new AppError(404, "Outlet not found");
        return outlet;
    }

    async updateOutlet(id: string, data: any) {
        const outlet = await this.outletModel.findById(id);
        if (!outlet) throw new AppError(404, "Outlet not found");

        if (data.activeModules) {
            await this.validateModuleInheritance((outlet as any).businessUnit, data.activeModules);
        }

        return await this.outletModel.findByIdAndUpdate(id, data, { new: true });
    }

    async deleteOutlet(id: string) {
        const outlet = await this.outletModel.findByIdAndDelete(id);
        if (!outlet) throw new AppError(404, "Outlet not found");
        // Cascading deletion of settings
        await OutletSettings.deleteOne({ outlet: id });
        return outlet;
    }

    async getOutletStats(outletId: string) {
        const mongoose = await import("mongoose");
        
        // Helper to safely get model or null
        const getModel = (name: string) => mongoose.models[name] || null;

        const Order = getModel('Order');
        const CashRegister = getModel('CashRegister');
        const Product = getModel('Product');
        const Attendance = getModel('Attendance');
        const User = getModel('User');

        const promises: Promise<any>[] = [];

        // 1. Sales
        if (Order) {
            promises.push(Order.aggregate([
                { $match: { outlet: new Types.ObjectId(outletId), status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$totalAmount' }, count: { $sum: 1 } } }
            ]));
        } else {
            promises.push(Promise.resolve([]));
        }

        // 2. Registers
        if (CashRegister) {
            promises.push(CashRegister.countDocuments({ outlet: new Types.ObjectId(outletId), status: 'open' }));
        } else {
            promises.push(Promise.resolve(0));
        }

        // 3. Low Stock
        if (Product) {
            promises.push(Product.countDocuments({ outlet: new Types.ObjectId(outletId), 'inventory.quantity': { $lte: 5 } }));
        } else {
            promises.push(Promise.resolve(0));
        }

        // 4. Attendance
        if (Attendance) {
            promises.push(Attendance.countDocuments({ outlet: new Types.ObjectId(outletId), date: { $gte: new Date().setHours(0, 0, 0, 0) } }));
        } else {
             promises.push(Promise.resolve(0));
        }

        // 5. Staff
        if (User) {
            promises.push(User.countDocuments({ 'businessAccess.outlet': new Types.ObjectId(outletId) }));
        } else {
            promises.push(Promise.resolve(0));
        }

        const [sales, registers, lowStock, attendance, staff] = await Promise.all(promises);

        return {
            totalSales: sales[0]?.total || 0,
            orderCount: sales[0]?.count || 0,
            activeRegisters: registers,
            lowStockItems: lowStock,
            staffPresent: attendance,
            totalStaff: staff
        };
    }

    private async validateModuleInheritance(businessUnitId: any, requestedModules: any): Promise<any> {
        // Use directly imported BusinessUnit model
        let bu: any = await BusinessUnit.findById(businessUnitId);

        // Fallback: Bypass Mongoose plugins (ContextScope) using native collection
        if (!bu && businessUnitId) {
             console.log("[OutletService] Warning: BU not found via Mongoose. Attempting native lookup bypass...");
             const mongoose = await import("mongoose");
             const queryId = typeof businessUnitId === 'string' 
                ? new mongoose.Types.ObjectId(businessUnitId) 
                : businessUnitId;
             
             bu = await BusinessUnit.collection.findOne({ _id: queryId });
        }

        if (!bu) throw new AppError(404, "Business Unit not found");

        if (requestedModules) {
            // Native doc vs Mongoose doc access
            const buModules = bu.activeModules || {};
            const invalidModules = Object.keys(requestedModules).filter(
                mod => requestedModules[mod] === true && buModules[mod] !== true
            );

            if (invalidModules.length > 0) {
                throw new AppError(403, `Modules [${invalidModules.join(', ')}] are not enabled in the parent Business Unit`);
            }
        }
        
        return bu;
    }

    private async generateUniqueCode(businessUnitId: any): Promise<string> {
        const count = await this.outletModel.countDocuments({ businessUnit: businessUnitId });
        return `OUT-${(count + 1).toString().padStart(4, '0')}`;
    }
}

export const outletService = new OutletService();
