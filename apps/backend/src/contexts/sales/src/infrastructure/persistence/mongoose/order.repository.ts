import { BaseRepository } from "@manoxen/core-util";


import { Order } from "./order.model";
import type { IOrder } from "#domain/sales/domain/index";

export class OrderRepository extends BaseRepository<IOrder> {
    constructor() {
        super(Order);
    }

    async findByOrderId(orderId: string): Promise<IOrder | null> {
        return this.model.findOne({ orderId }).populate('items.product').populate('customer');
    }

    async findByBusinessUnit(businessUnitId: string, query: any = {}): Promise<IOrder[]> {
        return this.model.find({ businessUnit: businessUnitId, ...query })
            .sort({ createdAt: -1 })
            .populate('items.product')
            .populate('customer');
    }

    override async findAll(filter: any = {}): Promise<IOrder[]> {
        return this.model.find(filter)
            .sort({ createdAt: -1 })
            .populate('items.product')
            .populate('customer');
    }
}





