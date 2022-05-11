import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const CandidateSchema = new Schema({
  // data: [
  //   {
  // hr: { type: String, trim: true },
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
  position: String,
  level: String,
  languages: [
    {
      name: String,
      level: String,
    },
  ],
  expectedPaymentLevel: Number,
  technologies: [
    {
      type: String,
      trim: true,
    },
  ],
  addedDate: Date,
  country: { type: String, trim: true },
  city: { type: String, trim: true },
  address: String,
  contacts: {
    phone: [
      {
        type: String,
        trim: true,
      },
    ],
    email: [
      {
        type: String,
        unique: true,
        trim: true,
      },
    ],
    telegram: {
      type: String,
      trim: true,
    },
    linkedIn: {
      type: String,
      trim: true,
    },
    skype: {
      type: String,
      trim: true,
    },
    facebook: {
      type: String,
      trim: true,
    },
  },
  // }
  // ],
  // page: Number,
  // length: Number,
  // sorted: Boolean,
});

mongoose.set("useCreateIndex", true);
CandidateSchema.plugin(uniqueValidator);

export default mongoose.model("Candidate", CandidateSchema);
