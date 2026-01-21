import type { ITax } from "#domain/catalog/index.js";
import { TaxService } from "../../../application/services/tax.service";
import { GenericController } from "@manoxen/core-util";


const genericTaxController = new GenericController<ITax>(TaxService as any, "Tax");

export const TaxController = {
    createTax: genericTaxController.create,
    getAllTaxes: genericTaxController.getAll,
    getTaxById: genericTaxController.getById,
    updateTax: genericTaxController.update,
    deleteTax: genericTaxController.delete,
};




