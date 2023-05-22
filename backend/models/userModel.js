import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minLength: [4, "Name must be at least 4 characters long"],
    maxLength: [30, "Name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: [validator.isEmail, "Enter a valid Email Address"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    select: false,
    validate: {
      validator: function (password) {
        // Regular expression for password validation
        //Password must contain one uppercase letter, one lowercase letter, one number and one special character
        const passwordRegex =
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);

        //Yes, that's correct! Positive lookaheads (?= )allow us to check if a pattern is present at any position in the string without consuming any characters. It can be used to validate the presence of a character or pattern at the beginning, end, or anywhere within the string.
      },
      message:
        "The password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and must be at least 8 characters long.",
    },
  },
  avatar:
    //public id is the group of characters that we get after main url
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  role: {
    type: String,
    default: "user",
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//Compare Password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Forgot Password (Generating Password Reset Token)
userSchema.methods.getResetPasswordToken = function () {
  //Generating Token

  const resetToken = crypto.randomBytes(20).toString("Hex"); //crypto.randomBytes(20) generates buffer data of 20 bytes

  //Hashing and Adding to userSchema

  // const tokenCrypto = crypto.createHash("sha256").update(token).digest("hex");
  // Generate a hash of the reset token using the SHA-256 algorithm
  this.resetPasswordToken = crypto
    .createHash("sha256") // Create a hash object using the SHA-256 algorithm
    .update(resetToken) // Update the hash object with the reset token value
    .digest("hex"); // Obtain the hash digest of the reset token in hexadecimal format

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
