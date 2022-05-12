import express from "express";
import EmployeesController from "../controllers/EmployeesController";

const employeesRouter = express.Router();

employeesRouter.get(
  "/hr/getEmployeesList",
  EmployeesController.getEmployeesList
);

employeesRouter.get("/hr/getEmployee/:id", EmployeesController.getEmployeeById);

employeesRouter.post("/hr/addEmployee", EmployeesController.addEmployee);

//TODO - fix API

employeesRouter.put("/hr/updateEmployee", EmployeesController.updateEmployee);

employeesRouter.put("/removeEmployee", EmployeesController.removeEmployee);

// employeesRouter.get(
//   "/hr/employee/:id/getScheduleDays",
//   EmployeesController.getScheduleDays
// );

export default employeesRouter;
