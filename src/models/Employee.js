import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const EmployeeSchema = new Schema(
  {
    additionalPhone: {
      type: String,
      trim: true,
    },
    address: {
      type: String,
      trim: true,
    },
    avatar: String,

    // all Dates - should be in type Date
    birthDate: String,

    children: [
      {
        childBirthDate: { type: String },
        childName: { type: String, trim: true },
        childSex: { type: String, trim: true },
      },
    ],
    corporateEmail: { type: String, trim: true },
    education: { type: String, trim: true },
    email: { type: String, trim: true },
    expirationDate: { type: String },
    facebook: { type: String, trim: true },
    inn: { type: String, trim: true },
    languages: [
      {
        language: {
          type: String,
          trim: true,
        },
        level: {
          type: String,
          trim: true,
        },
      },
    ],
    level: { type: String, trim: true },
    linkedIn: {
      type: String,
      trim: true,
    },

    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    noAvatar: {
      type: Boolean,
      required: true,
    },
    patronymic: {
      type: String,
      // required: true,
      minlength: 2,
      trim: true,
    },
    phone: {
      type: String,
      // required: true,
      trim: true,
    },
    projects: [
      {
        project: {
          type: String,
          trim: true,
        },
      },
    ],
    rateHour: { type: String, trim: true },
    rateMonth: { type: String, trim: true },
    role: {
      type: String,
      trim: true,
    },
    sex: { type: String, trim: true },
    skype: {
      type: String,
      trim: true,
    },
    startDate: String,
    status: {
      type: String,
      trim: true,
    },
    surname: {
      type: String,
      // required: true,
      // minlength: 2,
      trim: true,
    },
    team: {
      type: String,
      trim: "true",
    },
    tech: [
      {
        equipmentName: {
          type: String,
          trim: true,
        },
      },
    ],
    telegram: {
      type: String,
      trim: true,
    },
    technologies: [String],
    weekendsList: [
      {
        weekendTypeName: {
          type: String,
          trim: true,
        },
        weekendTypeItems: [
          {
            year: {
              type: String,
              trim: true,
            },
            quantity: Number,
          },
        ],
      },
    ],
    workExperiences: {
      type: String,
      trim: true,
    },
    workPlace: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
EmployeeSchema.plugin(uniqueValidator);

export default mongoose.model("Employee", EmployeeSchema);
