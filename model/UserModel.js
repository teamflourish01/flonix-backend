const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  options
);

UserSchema.methods.genrateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token Error", error);
  }
};

const UserModel = mongoose.model("User", UserSchema);
module.exports = {
  UserModel,
};
