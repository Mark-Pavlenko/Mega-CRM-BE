import ProjectModel from "../models/Project";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import UserModel from "../models/EmployeeModel";

class ProjectsController {
  @TryCatchErrorDecorator
  static async getAllProjects(req, res, next) {
    const projects = await ProjectModel.find({});
    res.status(200).json(projects);
  }

  // add new projects to the db
  @TryCatchErrorDecorator
  static async addProject(req, res) {
    // console.log("req body of add new project", req.body);
    const projectData = req.body;
    const newProject = new ProjectModel({ ...projectData });

    // eslint-disable-next-line no-shadow,consistent-return
    await newProject.save((err, body) => {
      if (err) return res.json(err);
      res.status(201).json(body);
    });
  }
}

export default ProjectsController;
