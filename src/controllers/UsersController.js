import EmployeeModel from "../models/EmployeeModel";
import CandidateModel from "../models/CandidateModel";
// import EmployeeModel from "../models/EmployeeModel_OLD";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import PasswordService from "../services/PasswordService";
import ClientError from "../exeptions/ClientError";

class UsersController {
  // get all users list
  @TryCatchErrorDecorator
  static async getEmployeesList(req, res) {
    const users = await EmployeeModel.find({});
    res.json(users);
  }

  // get current user data
  @TryCatchErrorDecorator
  static async getEmployeeById(req, res, next) {
    // eslint-disable-next-line consistent-return
    await EmployeeModel.findById(req.params.id, (err, data) => {
      if (err) return next(err);
      res.json(data);
    });
  }

  // update user Profile
  @TryCatchErrorDecorator
  static async updateProfile(req, res, next) {
    const userProfileData = req.body;
    console.log("userProfileData", userProfileData);
    // console.log(
    //   "userProfileData.password.newPassword",
    //   userProfileData.password.newPassword
    // );

    let password;
    if (userProfileData.password.newPassword === undefined) {
      password = userProfileData.password;
    } else {
      password = userProfileData.password.newPassword;
    }

    console.log("password for push", password);

    const updatedUser = {
      // password: await PasswordService.hashPassword(password),
      noAvatar: userProfileData.noAvatar,
      name: userProfileData.name,
      surname: userProfileData.surname,
      patronymic: userProfileData.patronymic,
      // password: await PasswordService.hashPassword(password),
      phone: userProfileData.phone,
      phone_additional: userProfileData.phone_additional,
      email: userProfileData.email,
      email_additional: userProfileData.email_additional,
      telegram: userProfileData.telegram,
      linkedIn: userProfileData.linkedIn,
      facebook: userProfileData.facebook,
      skype: userProfileData.skype,
    };

    if (userProfileData.newAvatar)
      updatedUser.avatar = userProfileData.newAvatar;

    console.log("user obj to push on db", updatedUser);

    const filter = { _id: userProfileData._id };

    if (userProfileData.isAvatarDeleted) {
      await EmployeeModel.findOneAndUpdate(
        filter,
        {
          $set: { ...updatedUser, noAvatar: true },
          $unset: { avatar: "" },
        },
        { new: true }
      )
        .then((result) => {
          res.status(200).json(result);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
    } else {
      await EmployeeModel.findOneAndUpdate(filter, updatedUser, { new: true })
        .then((result) => {
          console.log(result);
          return res.status(200).json(result);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err });
        });
    }
  }

  // get schedule days
  @TryCatchErrorDecorator
  static async getScheduleDays(req, res, next) {
    // eslint-disable-next-line consistent-return
    await EmployeeModel.findById(req.params.id, (err, data) => {
      if (err) return next(err);
      res.json(data.scheduleDays);
    });
  }

  // add calendar days
  @TryCatchErrorDecorator
  static async addScheduleDays(req, res) {
    console.log("req.body to create calendar event", req.body);

    EmployeeModel.updateOne(
      { _id: req.body.userId },
      { $addToSet: { scheduleDays: { ...req.body } } },
      { upsert: true, new: true }
    )
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  // add new  project to the current user
  @TryCatchErrorDecorator
  static async addProject(req, res, next) {
    // console.log("req body to add new user project", req.body);

    const obj = {
      title: req.body.title,
      description: "Mock description of the project",
    };

    console.log(obj);

    EmployeeModel.updateOne(
      { _id: req.body.id },
      { $addToSet: { projectsList: { ...obj } } },
      { upsert: true, new: true }
    )
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  // add new inventoryUnit to the current user
  @TryCatchErrorDecorator
  static async addInventoryUnit(req, res, next) {
    console.log("req body to add new inventoryItem for a user", req.body);

    EmployeeModel.updateOne(
      { _id: req.body.id },
      { $addToSet: { inventoryUnitsList: { ...req.body } } },
      { upsert: true, new: true }
    )
      .exec()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  }

  // TODO: rewrite request in order to get array of user`s weekends objects - now get the current user
  @TryCatchErrorDecorator
  static async getWeekendsList(req, res, next) {
    const users = await EmployeeModel.find({});
    // eslint-disable-next-line consistent-return,array-callback-return
    const fullWeekendsList = users.map((employee) => ({
      id: employee._id,
      name: employee.name,
      surname: employee.surname,
      patronymic: employee.patronymic,
      avatar: employee.avatar,
      ...employee.weekendsList,
    }));
    res.status(200).json(fullWeekendsList);
  }

  @TryCatchErrorDecorator
  static async updateWeekendsList(req, res, next) {
    console.log("req body to update user`s weekends list", req.body);

    const filter = { _id: req.body.id };
    await EmployeeModel.findOneAndUpdate(
      filter,
      {
        $set: { weekendsList: req.body },
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
  static async getCandidatesList(req, res) {
    const candidates = await CandidateModel.find({});
    res.status(200).json(candidates);
  }

  @TryCatchErrorDecorator
  static async addNewCandidate(req, res) {
    console.log("req.body to add new candidates", req.body);

    const userData = req.body;
    const noAvatar = userData.avatar === undefined;

    const candidate = {
      ...userData,
      noAvatar,
    };

    if (userData.avatar) candidate.avatar = userData.avatar;

    const newCandidate = new CandidateModel(candidate);

    console.log("formatted with Modal candidate data", newCandidate);

    await newCandidate
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

  // @TryCatchErrorDecorator
  // static async getEmployeesList(req, res) {
  //   const employeesList = await EmployeeModel.find({});
  //   res.status(200).json(employeesList);
  // }

  @TryCatchErrorDecorator
  static async addEmployee(req, res) {
    // console.log("req.body to add new employee", req.body);

    const corporateEmailExist = await EmployeeModel.findOne({
      contacts: { corporateEmail: req.body.contacts.corporateEmail },
    });

    // const personalEmailExist = await EmployeeModel.findOne({
    //   contacts: { personalEmail: req.body.contacts.personalEmail },
    // });

    if (corporateEmailExist) {
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

    console.log("formatted with Modal employee data", newEmployee);

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
  static async removeCalendarEvent(req, res) {
    // console.log("req body to delete calendar event", req.body);

    // future - delete all users request by hr and only if status is processing
    const userIdFilter = { _id: req.body.UserId };
    const eventIdFilter = { _id: req.body.EventId };

    await EmployeeModel.findOneAndUpdate(
      userIdFilter,
      {
        $pull: { scheduleDays: eventIdFilter },
      },
      { multi: true }
    )
      .then((result) => {
        res.status(202).json(result);
      })
      .catch((err) => {
        res.status(500).json({ error: err });
      });
  }

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

export default UsersController;
