import { catchAsync, QueryBuilder } from "@manoxen/core-util";
import { Customer } from "../../infrastructure/persistence/mongoose/customer.model";
import { type ICustomer } from "../../domain/entities/customer.entity";
import { User, Role, UserBusinessAccess, genereteCustomerId } from "@manoxen/iam";
import { startSession } from "mongoose";
import { AppError } from "@manoxen/core-util";
import { appConfig } from "@manoxen/platform-core";
import { sendImageToCloudinary } from "@manoxen/infra-common";
import { USER_ROLE } from "@manoxen/iam-core";

/**
 * Get all customers with pagination and filtering.
 */
export const getAllCustomersService = async (query: Record<string, unknown> = {}) => {
    // 1. Fetch Customers (Without Join)
    const customerQuery = new QueryBuilder(
        Customer.find(), // .populate("user") REMOVED (Rule #4 Violation)
        query
    )
        .search(["email", "id"])
        .filter()
        .sort()
        .paginate()
        .fields();

    const customers = await customerQuery.modelQuery;
    const meta = await customerQuery.countTotal();

    // 2. Application Layer Join (Manual Population)
    // In a pure Microservice, this would be a gRPC/HTTP call to Identity Service.
    // Here, we maintain modular monolith boundary by querying User separately.
    if (customers.length > 0) {
        const userIds = customers.map((c: any) => c.user);
        const users = await User.find({ _id: { $in: userIds } }).select("email phone name avatar").lean();
        
        const userMap = new Map(users.map((u: any) => [u._id.toString(), u]));

        // Attach user data
        customers.forEach((c: any) => {
            if (c.user && userMap.has(c.user.toString())) {
                c.user = userMap.get(c.user.toString());
            }
        });
    }

    return { meta, result: customers };
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
            const namePart = customerData.name?.firstName || "customer";
            const imgName = `${namePart}-${id}`;
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


