import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CandidateSchema = new Schema(
  {
    avatar: String,
    noAvatar: {
      type: Boolean,
      required: true,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    surname: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    patronymic: {
      type: String,
      required: true,
      minlength: 2,
      trim: true,
    },
    corporateEmail: {
      type: String,
      // required: true,
      // unique: true,
      trim: true,
    },
    additionalEmail: {
      type: String,
      // required: true,
      // unique: true,
      trim: true,
    },
    phone: {
      type: String,
      // required: true,
      trim: true,
    },
    additionalPhone: {
      type: String,
      // required: false,
      trim: true,
    },
    position: {
      title: String,
      level: String,
    },
    salary: {
      type: String,
      trim: true,
    },
    sex: { type: String, trim: true },
    skype: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
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
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
CandidateSchema.plugin(uniqueValidator);

export default mongoose.model("Candidate", CandidateSchema);
