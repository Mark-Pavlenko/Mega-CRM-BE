import express from "express";
import WarehouseController from "../controllers/WarehouseController";

const warehouseRouter = express.Router();

warehouseRouter.get(
  "/getInventoryUnitsList",
  WarehouseController.getInventoryUnitsList
);

warehouseRouter.post("/addInventoryUnit", WarehouseController.addInventoryUnit);

export default warehouseRouter;
