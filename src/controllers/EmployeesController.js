import EmployeeModel from "../models/EmployeeModel";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import ClientError from "../exeptions/ClientError";

class EmployeesController {
  @TryCatchErrorDecorator
  static async getEmployeesList(req, res) {
    const users = await EmployeeModel.find({});
    res.json(users);
  }

  @TryCatchErrorDecorator
  static async getEmployeeById(req, res, next) {
    // eslint-disable-next-line consistent-return
    await EmployeeModel.findById(req.params.id, (err, data) => {
      if (err) return next(err);
      res.json(data);
    });
  }

  @TryCatchErrorDecorator
  static async addEmployee(req, res) {
    const employees = await EmployeeModel.find({});

    let existedEmployee = employees.find((el) => {
      return (
        el.contacts.corporateEmail === req.body.contacts.corporateEmail ||
        el.contacts.personalEmail === req.body.contacts.personalEmail
      );
    });

    if (existedEmployee !== undefined) {
      throw new ClientError("This email is already registered", 409);
    }

    const employeeData = req.body;
    const noAvatar = employeeData.avatar === undefined;

    const employee = {
      noAvatar,
      ...employeeData,
    };

    if (employeeData.avatar) employee.avatar = employeeData.avatar;

    const newEmployee = new EmployeeModel(employee);

    // console.log("formatted with Modal employee data", newEmployee);

    await newEmployee
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  @TryCatchErrorDecorator
  static async updateEmployee(req, res) {
    console.log("req body of employee update", req.body);
    const filter = { _id: req.body.id };
    await EmployeeModel.findOneAndUpdate(
      filter,
      {
        $set: { ...req.body },
        // $set: { ...updatedUser, noAvatar: true },
      },
      { new: true }
    )
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  @TryCatchErrorDecorator
  static async removeEmployee(req, res) {
    console.log("req body to delete employee", req.body.employeeId);

    // future - delete all users request by hr and only if status is processing
    const employeeIdFilter = { _id: req.body.employeeId };

    await EmployeeModel.findOneAndRemove(employeeIdFilter)
      .then((result) => {
        res.status(204).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }
}

export default EmployeesController;
