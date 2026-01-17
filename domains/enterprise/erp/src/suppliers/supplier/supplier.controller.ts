
import { GenericController } from "@manoxen/core-util";
import {
    createSupplierService,
    getAllSuppliersService,
    getSupplierByIdService,
    updateSupplierService,
    deleteSupplierService
} from "./supplier.service";

const supplierService = {
    create: createSupplierService,
    getAll: getAllSuppliersService,
    getById: getSupplierByIdService,
    update: updateSupplierService,
    delete: deleteSupplierService
};

export const SupplierController = new GenericController(supplierService, "Supplier");





