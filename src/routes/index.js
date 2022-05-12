import users from "./users";
import auth from "./auth";
import projects from "./projects";
import employeesRouter from "./employeesRoutes";
import candidatesRouter from "./candidatesRoutes";
import warehouseRouter from "./warehouseRoutes";

export default [
  auth,
  projects,
  users,
  employeesRouter,
  candidatesRouter,
  warehouseRouter,
];
