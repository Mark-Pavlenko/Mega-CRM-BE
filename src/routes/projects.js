import express from "express";
import ProjectsController from "../controllers/ProjectsController";

const router = express.Router();

router.get("/projects/getAllProjects", ProjectsController.getAllProjects);

router.post("/projects/addProject", ProjectsController.addProject);

export default router;
