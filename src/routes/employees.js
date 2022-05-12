import express from "express";
import EmployeesController from "../controllers/EmployeesController";
import UsersController from "../controllers/UsersController";
import router from "./users";
// import UsersController from "../controllers/UsersController";

const employeesRouter = express.Router();

employeesRouter.get(
  "/hr/getEmployeesList",
  EmployeesController.getEmployeesList
);

employeesRouter.get("/hr/getEmployee/:id", EmployeesController.getEmployeeById);

employeesRouter.post("/hr/addEmployee", EmployeesController.addEmployee);

employeesRouter.put("/hr/updateEmployee", EmployeesController.updateEmployee);

employeesRouter.put("/removeEmployee", EmployeesController.removeEmployee);

// employeesRouter.get(
//   "/hr/employee/:id/getScheduleDays",
//   EmployeesController.getScheduleDays
// );

// employeesRouter;

export default employeesRouter;
