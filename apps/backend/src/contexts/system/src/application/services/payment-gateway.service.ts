
import { PaymentGateway } from '#domain/system/infrastructure/persistence/mongoose/payment-gateway.model.js';
import { AppError } from '@manoxen/core-util';
import status from 'http-status';

export class PaymentGatewayService {
    static async configureGateway(data: any, user: any) {
        const organizationId = user.organization;
        const businessUnitId = user.businessUnit;
        
        if (data.isDefault) {
            await PaymentGateway.updateMany({ businessUnitId }, { isDefault: false });
        }

        const gateway = await PaymentGateway.findOneAndUpdate(
            { businessUnitId, provider: data.provider },
            { 
                ...data, 
                organizationId, 
                businessUnitId 
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        
        return gateway;
    }

    static async getGateways(user: any) {
        return PaymentGateway.find({ businessUnitId: user.businessUnit });
    }

    static async deleteGateway(id: string, user: any) {
        const query = { _id: id, businessUnitId: user.businessUnit };
        const gateway = await PaymentGateway.findOneAndDelete(query);
        
        if (!gateway) {
            throw new AppError(status.NOT_FOUND, 'Payment gateway not found');
        }
        
        return gateway;
    }
}
