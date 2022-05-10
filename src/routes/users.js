import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.get("/users", UsersController.getUsers);
// router.get("/users", Authorize.check, UsersController.index);

router.get("/user/:id", UsersController.getCurrentUser);

router.get("/user/:id/getScheduleDays", UsersController.getScheduleDays);

// create calendar request
router.post("/user/addScheduleDays", UsersController.addScheduleDays);

// update full user`s profile object
router.put("/user/updateProfile", UsersController.updateProfile);

// add new project to a specific user - OLD
router.put("/user/addProject", UsersController.addProject);

// add inventory Unit to a specific user
router.put("/user/addInventoryUnit", UsersController.addInventoryUnit);

router.get("/users/getWeekendsList", UsersController.getWeekendsList);

router.put("/user/updateWeekendsList", UsersController.updateWeekendsList);

// get all candidates list
router.get("/hr/getCandidatesList", UsersController.getCandidatesList);

// add new employees router
router.post("/hr/addNewCandidate", UsersController.addNewCandidate);

router.get("/hr/getEmployeesList", UsersController.getEmployeesList);

router.post("/hr/addEmployee", UsersController.addEmployee);

router.put("/hr/updateEmployee", UsersController.updateEmployee);

// delete calendar event by hr
router.post("/removeCalendarEvent", UsersController.removeCalendarEvent);

router.put("/removeEmployee", UsersController.removeEmployee);

export default router;
