import { catchAsync, QueryBuilder } from "@manoxen/core-util";
import { Customer, type ICustomer } from "@manoxen/sales";
import { User, Role, UserBusinessAccess } from "#app/modules/iam/index";
import { startSession } from "mongoose";
import { AppError } from "@manoxen/core-util";
import appConfig from "#shared/config/app.config";
import { genereteCustomerId } from "#app/modules/iam/user/user.utils";
import { sendImageToCloudinary } from "#core/utils/file-upload";
import { USER_ROLE } from "@manoxen/iam-core";

/**
 * Get all customers with pagination and filtering.
 */
export const getAllCustomersService = async (query: Record<string, unknown> = {}) => {
    const customerQuery = new QueryBuilder(
        Customer.find().populate("user", "email phone name avatar"),
        query
    )
        .search(["email", "id"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const result = await customerQuery.modelQuery;
    const meta = await customerQuery.countTotal();

    return { meta, result };
};

/**
 * Create a new customer with associated user account.
 */
export const createCustomerService = async (
    customerData: ICustomer,
    password?: string,
    file?: any
) => {
    const session = await startSession();
    try {
        session.startTransaction();

        // 1. Validate User
        const isUserExists = await User.findOne({ email: customerData.email }).session(session);
        if (isUserExists) throw new AppError(400, "User with this email already exists!");

        if (customerData.phone) {
            const phoneExists = await User.findOne({ phone: customerData.phone }).session(session);
            if (phoneExists) throw new AppError(400, "User with this phone number already exists!");
        }

        // 2. Resolve Role
        const role = await Role.findOne({ name: USER_ROLE.CUSTOMER, isActive: true }).session(session);
        if (!role) throw new AppError(404, "Customer role not found!");

        // 3. Generate ID
        const id = await genereteCustomerId(customerData.email, role._id.toString());

        // 4. Handle Avatar
        if (file) {
            const imgName = `${customerData?.name?.firstName || "customer"}-${id}`;
            const { secure_url } = await sendImageToCloudinary(imgName, file.path) as any;
            customerData.avatar = secure_url;
        }

        // 5. Create User
        const userData = {
            id,
            email: customerData.email,
            phone: customerData.phone,
            password: password || (appConfig.default_pass as string),
            globalRoles: [role._id],
            status: "pending",
            needsPasswordChange: !password,
            avatar: customerData.avatar,
            name: customerData.name
        };

        const newUser = await User.create([userData], { session });
        if (!newUser || newUser.length === 0 || !newUser[0]) throw new AppError(500, "Failed to create user account!");

        // 6. Create Customer
        const customerPayload = {
            ...customerData,
            id,
            user: newUser[0]._id,
            businessUnit: customerData.businessUnit,
            outlet: customerData.outlet || null
        };

        const newCustomer = await Customer.create([customerPayload], { session });
        if (!newCustomer?.length) throw new AppError(500, "Failed to create customer profile!");

        await session.commitTransaction();
        return await Customer.findById(newCustomer[0]?._id).populate("user", "-password");

    } catch (error: any) {
        if (session.inTransaction()) await session.abortTransaction();
        throw error instanceof AppError ? error : new AppError(500, error.message);
    } finally {
        await session.endSession();
    }
};
