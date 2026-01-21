// Models
export { Courier, type ICourier } from "./infrastructure/persistence/mongoose/courier.model";
export { Driver, type IDriver } from "./infrastructure/persistence/mongoose/driver.model";
export { Vehicle, type IVehicle } from "./infrastructure/persistence/mongoose/vehicle.model";

// Services
export { LogisticsService } from "./application/services/logistics.service";

// Controllers
export { LogisticsActionController, courierController } from "./interface/http/controllers/logistics.controller";

// Routes
export { default as logisticsRoutes } from "./interface/http/routes/logistics.routes";
