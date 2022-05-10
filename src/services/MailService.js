import { MailComposer as KamilMailcomposer } from "kamil-mailcomposer";
import mailgunModule from "mailgun-js";
import fs from "fs";
import path from "path";
import ejs from "ejs-promise";
import AppError from "../exeptions/AppError";
import config from "../config";
import logger from "../utils/logger";

const root = path.join.bind(this, __dirname, "../../");
const srcPath = path.join.bind(this, __dirname, "../");

const saveEmailInFile = async (data) => {
  try {
    const mailComposer = new KamilMailcomposer();

    // add additional header field
    mailComposer.addHeader("x-mailer", "Nodemailer 1.0");

    // setup message data
    mailComposer.setMessageOption(data);
    mailComposer.streamMessage();

    // set up path of saving message
    const pathFolder = root("logs/mail");
    if (!fs.existsSync(pathFolder)) {
      fs.mkdirSync(pathFolder);
    }

    mailComposer.pipe(
      fs.createWriteStream(`${pathFolder}/${new Date().getTime()}.eml`)
    );

    return true;
  } catch (err) {
    throw new AppError(err.message);
  }
};

const compileTemplate = async (template, data, options = {}) => {
  try {
    const file = path.join(srcPath(`templates/mail/${template}.ejs`));

    if (!file) {
      throw new AppError(
        `Could not find template: ${template} in path: ${file}`
      );
    }

    return await ejs.renderFile(file, data, options, (err, result) => {
      if (err) {
        throw new AppError(err.message);
      }
      return result;
    });
  } catch (err) {
    throw new AppError(err.message);
  }
};

/* eslint no-param-reassign: ["error", { "props": false }] */
const send = async (data) => {
  try {
    // console.log("config data from email", config);

    const mailgun = mailgunModule({
      apiKey: config.mail.apiKey,
      domain: config.mail.domain,
    });

    console.log("config email", config.mail.to);
    console.log("откуда идет", data.from);
    console.log("куда идет", data.to);

    // data.to = data.from;
    if (!data.from) {
      data.to = config.mail.to;
    }

    if (config.app.isDev) {
      return saveEmailInFile(data);
    }

    return await mailgun.messages().send(data);
  } catch (err) {
    logger.error(err.message, { type: "EMAIL_ERROR", data });

    throw new AppError(err.message);
  }
};

const sendWithTemplate = async (data, templateOptions) => {
  try {
    const template = templateOptions.template || "";
    const dataTemplate = templateOptions.data || {};
    const options = templateOptions.options || {};

    if (!template) {
      throw new AppError(`Could not find template name in options`);
    }

    data.html = await compileTemplate(template, dataTemplate, options);

    return await send(data);
  } catch (err) {
    throw new AppError(err.message);
  }
};

export default { send, sendWithTemplate };
