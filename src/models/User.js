import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import Double from "@mongoosejs/double";

const refreshTokens = new Schema({
  token: {
    type: String,
    required: true,
  },
});
//
const UserSchema = new Schema(
  {
    active: Boolean,
    salary: Double,
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
      // required: true,
      minlength: 2,
      trim: true,
    },
    age: Number,
    date: Date,
    sex: {
      type: String,
      required: true,
      trim: true,
    },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    addedDate: Date,
    technologies: [
      {
        type: String,
        trim: true,
        //required: true
      },
    ],
    comments: [
      {
        type: String,
        trim: true,
      },
    ],
    permissions: String,
    avatar: String,
    noAvatar: {
      type: Boolean,
      required: true,
    },
    status: {
      type: String,
      title: String,
      date: Date,
    },
    contacts: {
      phone: [
        {
          type: String,
          // required: true,
          trim: true,
        },
      ],
      email: [
        {
          type: String,
          // required: true,
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
    },
    company: {
      trainee: Boolean,
      name: String,
      dateStart: Date,
      status: String,
      role: String,
      level: String,
      format: String,
    },
    posts: [
      {
        title: String,
        date: Date,
      },
    ],
    balance: {
      sickDays: Number,
      daysOff: Number,
      vacationDays: Number,
      remoteDays: Number,
    },
    languages: [
      {
        name: String,
        level: String,
      },
    ],
    education: [
      {
        name: String,
        period: String,
      },
    ],
    workExperience: [
      {
        companyName: String,
        role: String,
        period: String,
      },
    ],
    additionalInformation: {
      status: String,
      address: String,
      children: [
        {
          name: String,
          age: Number,
          sex: String,
          date: Date,
        },
      ],
    },

    inventoryUnitsList: [
      {
        name: {
          type: String,
          trim: true,
        },
        model: {
          type: String,
          trim: true,
        },
        status: String,
        dateStart: Date,
      },
    ],
    events: [
      {
        date: Date,
        name: String,
        status: String,
      },
    ],
    requests: [
      {
        name: String,
        status: String,
        type: { type: String, trim: true },
        day: Date,
        state: String,
        reviews: [
          {
            name: String,
            role: String,
          },
        ],
      },
    ],
    reports: [
      {
        name: String,
        status: String,
        date: Date,
        type: { type: String, trim: true },
        dateOfCreation: String,
      },
    ],
    files: [
      {
        name: String,
        type: { type: String, trim: true },
        source: String,
        date: Date,
      },
    ],

    password: {
      type: String,
      required: true,
      minlength: 8,
    },

    refreshTokens: [refreshTokens],

    // projectsList: [
    //   {
    //     title: {
    //       type: String,
    //       trim: true,
    //     },
    //     description: {
    //       type: String,
    //       trim: true,
    //     },
    //   },
    // ],
    // scheduleDays: [
    //   {
    //     EventType: {
    //       type: String,
    //       trim: true,
    //     },
    //     Subject: {
    //       type: String,
    //       trim: true,
    //     },
    //     Description: {
    //       type: String,
    //       trim: true,
    //     },
    //     Location: {
    //       type: String,
    //       trim: true,
    //     },
    //     IsAllDay: {
    //       type: Boolean,
    //     },
    //     StartTime: {
    //       type: String,
    //       trim: true,
    //     },
    //     EndTime: {
    //       type: String,
    //       trim: true,
    //     },
    //     requestStatus: {
    //       type: String,
    //       required: true,
    //       trim: true,
    //     },
    //   },
    // ],

    // inventoryUnitsList: [
    //   {
    //     title: {
    //       type: String,
    //       trim: true,
    //     },
    //     number: {
    //       type: String,
    //       trim: true,
    //     },
    //     bindingDate: Date,
    //   },
    // ],

    // weekendsList: {
    //   absent_days: Number,
    //   absent_days_used: Number,
    //   business_trip_days: Number,
    //   business_trip_days_used: Number,
    //   remote_days: Number,
    //   remote_days_used: Number,
    //   sick_leave_days: Number,
    //   sick_leave_days_used: Number,
    //   vacation_days: Number,
    //   vacation_days_used: Number,
    // },
  },
  {
    timestamps: true,
  }
);

mongoose.set("useCreateIndex", true);
UserSchema.plugin(uniqueValidator);

export default mongoose.model("User", UserSchema);
