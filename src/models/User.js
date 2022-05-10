import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const refreshTokens = new Schema({
  token: {
    type: String,
    required: true,
  },
});

const UserSchema = new Schema(
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
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    phone_additional: {
      type: String,
      // required: false,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email_additional: {
      type: String,
      trim: true,
    },
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
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    projectsList: [
      {
        title: {
          type: String,
          trim: true,
        },
        description: {
          type: String,
          trim: true,
        },
      },
    ],
    scheduleDays: [
      {
        EventType: {
          type: String,
          trim: true,
        },
        Subject: {
          type: String,
          trim: true,
        },
        Description: {
          type: String,
          trim: true,
        },
        Location: {
          type: String,
          trim: true,
        },
        IsAllDay: {
          type: Boolean,
        },
        StartTime: {
          type: String,
          trim: true,
        },
        EndTime: {
          type: String,
          trim: true,
        },
        requestStatus: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    sex: { type: String, trim: true },
    inventoryUnitsList: [
      {
        title: {
          type: String,
          trim: true,
        },
        number: {
          type: String,
          trim: true,
        },
        bindingDate: Date,
      },
    ],
    weekendsList: {
      absent_days: Number,
      absent_days_used: Number,
      business_trip_days: Number,
      business_trip_days_used: Number,
      remote_days: Number,
      remote_days_used: Number,
      sick_leave_days: Number,
      sick_leave_days_used: Number,
      vacation_days: Number,
      vacation_days_used: Number,
    },

    refreshTokens: [refreshTokens],
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);
