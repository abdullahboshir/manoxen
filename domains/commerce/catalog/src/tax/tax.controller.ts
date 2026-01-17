import { TaxService } from "./tax.service";
import { GenericController } from "@manoxen/core-util";
import type { ITax } from "./tax.interface";

const genericTaxController = new GenericController<ITax>(TaxService as any, "Tax");

export const TaxController = {
    createTax: genericTaxController.create,
    getAllTaxes: genericTaxController.getAll,
    getTaxById: genericTaxController.getById,
    updateTax: genericTaxController.update,
    deleteTax: genericTaxController.delete,
};




