// Customers
export * from "./domain/entities/customer.entity";
export * from "./application/services/customer.service";
export { Customer } from "./infrastructure/persistence/mongoose/customer.model";
export { createCustomerZodSchema, type CreateCustomerInput } from "./interface/http/dto/customer.dto";

// Routes
export { customerRoutes } from "./interface/http/routes/customer.routes";

















