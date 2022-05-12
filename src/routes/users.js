import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();

// router.get("/employees", Authorize.check, UsersController.index);

// Employees API

router.get("/hr/getEmployeesList", UsersController.getEmployeesList);

router.get("/hr/getEmployee/:id", UsersController.getEmployeeById);

router.get("/hr/employee/:id/getScheduleDays", UsersController.getScheduleDays);

router.post("/hr/addEmployee", UsersController.addEmployee);

//----------- Candidates API ------------

router.get("/hr/getCandidatesList", UsersController.getCandidatesList);

router.get("/hr/getCandidate/:id", UsersController.getCandidatesList);

router.post("/hr/addCandidate", UsersController.addNewCandidate);

// create calendar request

router.post("/employee/addScheduleDays", UsersController.addScheduleDays);

// update full user`s profile object
router.put("/employee/updateProfile", UsersController.updateProfile);

// add new project to a specific user - OLD
router.put("/employee/addProject", UsersController.addProject);

// add inventory Unit to a specific user
router.put("/employee/addInventoryUnit", UsersController.addInventoryUnit);

router.get("/employee/getWeekendsList", UsersController.getWeekendsList);

router.put("/employee/updateWeekendsList", UsersController.updateWeekendsList);

// add new employees router

router.put("/hr/updateEmployee", UsersController.updateEmployee);

// delete calendar event by hr
router.post("/removeCalendarEvent", UsersController.removeCalendarEvent);

router.put("/removeEmployee", UsersController.removeEmployee);

export default router;
