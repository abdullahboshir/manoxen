
import type { IBrand as IBaseBrand } from "@manoxen/shared-types";

export interface IBrand extends IBaseBrand {
    businessUnit?: string;
    organization?: string;
}
