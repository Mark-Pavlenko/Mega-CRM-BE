import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const staff = new Schema({
  developerId: {
    type: String,
    trim: true,
  },
  startDevelopmentDate: Date,
  endDevelopmentDate: Date,
  involvement: {
    type: String,
    trim: true,
  },
  projectRatePerMonth: Number,
  projectRerHour: Number,
  customerRatePerMonth: Number,
  customerRatePerHour: Number,
});

const customer = new Schema({
  companyName: { type: String, trim: true },
  customerName: { type: String, trim: true },
  phone: { type: String, trim: true },
  email: { type: String, trim: true },
  telegram: { type: String, trim: true },
});

const ProjectSchema = new Schema(
  {
    projectName: { type: String, trim: true },
    startDate: Date,
    endDate: Date,
    initiator: {
      type: String,
      trim: true,
    },
    payment: { type: Number, trim: true },
    wastedTime: { type: Number, trim: true },
    status: { type: String, trim: true },
    description: { type: String, trim: true },
    staff: [staff],
    customer,
  },
  {
    timestamps: true,
  }
);
mongoose.set("useCreateIndex", true);
ProjectSchema.plugin(uniqueValidator);

export default mongoose.model("Project", ProjectSchema);
