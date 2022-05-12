import express from "express";
import UsersController from "../controllers/UsersController";

const router = express.Router();

//---- Warehouse Equipment API -----

router.post("/addInventoryUnit", UsersController.addInventoryUnit);

//-----

// create calendar request

router.post("/employee/addScheduleDays", UsersController.addScheduleDays);

// update full user`s profile object
router.put("/employee/updateProfile", UsersController.updateProfile);

// add new project to a specific user - OLD
router.put("/employee/addProject", UsersController.addProject);

// add inventory Unit to a specific user

router.get("/employee/getWeekendsList", UsersController.getWeekendsList);

router.put("/employee/updateWeekendsList", UsersController.updateWeekendsList);

// add new employees router

// delete calendar event by hr
router.post("/removeCalendarEvent", UsersController.removeCalendarEvent);

export default router;
