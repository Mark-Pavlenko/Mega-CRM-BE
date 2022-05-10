import UserModel from "../models/User";
import PasswordService from "../services/PasswordService";
import ClientError from "../exeptions/ClientError";
import TryCatchErrorDecorator from "../decorators/TryCatchErrorDecorator";
import TokenService from "../services/TokenService";
import AppError from "../exeptions/AppError";
import MailService from "../services/MailService";
import config from "../config/app";
import emailConfig from "../config";
import randomize from "../utils/randomize";

// const multer = require("multer");

// import randomize from "randomatic";

class AuthController {
  // registration
  @TryCatchErrorDecorator
  static async signUp(req, res) {
    const isAlreadyUser = await UserModel.findOne({ email: req.body.email });
    if (isAlreadyUser) {
      throw new ClientError("This email is already registered", 409);
    }
    // console.log("req.body", req.body);

    // weekends list object with default number of days
    const weekendsList = {
      absent_days: 2,
      absent_days_used: 0,
      business_trip_days: 2,
      business_trip_days_used: 0,
      remote_days: 5,
      remote_days_used: 0,
      sick_leave_days: 3,
      sick_leave_days_used: 0,
      vacation_days: 3,
      vacation_days_used: 0,
    };

    const userData = req.body;
    const noAvatar = userData.avatar === undefined;

    const user = {
      noAvatar,
      name: userData.name,
      surname: userData.surname,
      patronymic: userData.patronymic,
      phone: userData.phone,
      phone_additional: userData.phone_additional,
      role: userData.position.value,
      email: userData.email,
      email_additional: userData.email_additional,
      telegram: userData.telegram,
      linkedIn: userData.linkedIn,
      skype: userData.skype,
      facebook: userData.facebook,
      password: await PasswordService.hashPassword(userData.password),
      weekendsList: { ...weekendsList },
      sex: userData.sex,
    };

    if (userData.avatar) user.avatar = userData.avatar;

    const newUser = new UserModel(user);

    console.log("formatted user register data according to User Modal", user);

    await newUser.save();

    // TODO: fix forming of the template of success registration
    // await MailService.sendWithTemplate(
    //   {
    //     to: user.email,
    //     subject: "Thanks for registering, your password is inside",
    //   },
    //   {
    //     template: "singup",
    //     data: {
    //       email: user.email,
    //       password: user.password,
    //     },
    //   }
    // );

    res.json({ status: "success" });
  }

  @TryCatchErrorDecorator
  // authorization
  static async signIn(req, res) {
    console.log("authSaga req body", req.body);

    const user = await UserModel.findOne({ email: req.body.email });

    console.log("found user", user);

    if (!user) {
      throw new ClientError("User not found", 404);
    }

    const checkPassword = await PasswordService.checkPassword(
      req.body.password,
      user.password
    );

    if (!checkPassword) {
      throw new ClientError("Incorrect email or password", 401);
    }

    const accessToken = await TokenService.createAccessToken(user);
    const refreshTokenHash = await TokenService.createRefreshToken(user);
    const refreshToken = await TokenService.addRefreshTokenUser(
      user,
      refreshTokenHash
    );

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }

  @TryCatchErrorDecorator
  static async refreshTokens(req, res) {
    const refreshTokenRequest = req.body.refreshToken;

    const verifyData = await TokenService.verifyRefreshToken(
      refreshTokenRequest
    );

    if (!verifyData) {
      throw new ClientError("Refresh token invalid or expired", 400);
    }

    const user = await UserModel.findOne({ _id: verifyData.id });

    const isValid = await TokenService.checkRefreshTokenUser(
      user,
      refreshTokenRequest
    );

    if (!isValid) {
      throw new ClientError("Refresh token invalid or expired", 400);
    }

    await TokenService.removeRefreshTokenUser(user, refreshTokenRequest);

    const accessToken = await TokenService.createAccessToken(user);
    const refreshTokenHash = await TokenService.createRefreshToken(user);
    const refreshToken = await TokenService.addRefreshTokenUser(
      user,
      refreshTokenHash
    );

    if (!verifyData) {
      throw new ClientError("Refresh token invalid or expired", 400);
    }

    res.json({ accessToken, refreshToken });
  }

  @TryCatchErrorDecorator
  static async logout(req, res, next) {
    const user = await UserModel.findOne({ _id: req.userId });
    if (!user) {
      throw new AppError("UserId not found in request", 401);
    }

    user.refreshTokens = [];
    await user.save();

    res.json({ status: "success" });
  }

  @TryCatchErrorDecorator
  static async restorePassword(req, res, next) {
    const user = await UserModel.findOne({ email: req.body.email });
    console.log("user data for password restore", user);

    if (!user) {
      throw new ClientError("User not found", 404);
    }

    const token = await TokenService.createRestorePasswordToken(user);

    await MailService.sendWithTemplate(
      {
        from: "our current domain",
        to: user.email,
        subject: "Restore password",
      },
      {
        template: "restorePassword",
        data: {
          host: config.frontendHost,
          token,
        },
      }
    );

    res.json({ status: "success" });
  }

  @TryCatchErrorDecorator
  static async confirmRestorePassword(req, res, next) {
    const tokenRequest = req.body.token;
    // console.log("token for password recover", req.body);

    const verifyData = await TokenService.verifyRestorePasswordToken(
      tokenRequest
    );

    if (!verifyData) {
      throw new ClientError("Refresh token invalid or expired", 400);
    }

    const user = await UserModel.findOne({ _id: verifyData.id });
    const password = randomize.generateString(12);
    user.password = await PasswordService.hashPassword(password);

    console.log("user password hashed (old)", user.password);
    console.log("new user password (not hashed)", password);

    await user.save();

    await MailService.sendWithTemplate(
      {
        from: "our current domain",
        to: user.email,
        subject: "New password",
      },
      {
        template: "confirmRestorePassword",
        data: {
          password,
        },
      }
    );

    res.json({ status: "success" });
  }
}

export default AuthController;
