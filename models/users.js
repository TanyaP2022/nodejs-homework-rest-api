const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseErrror } = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema(
  {
    password: {
      type: String,
      minLength: 8,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: emailRegexp,
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.post("save", handleMongooseErrror);

const registerSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});
const loginSchema = Joi.object({
  password: Joi.string().min(8).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});
const updateSubscription = Joi.object({
  subscription: Joi.string().required(),
});

const schemas = {
  registerSchema,
  loginSchema,
  updateSubscription,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};
