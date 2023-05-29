const Admin = require("../database/models/adminModel");
const constants = require("../constants");
const { formatMongoData } = require("../helper/dbHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async ({ email, password }) => {
  try {
    const admin = await Admin.findOne({ email });
    if (admin) {
      throw new Error(constants.adminMessage.DUPLICATED_EMAIL);
    }
    password = await bcrypt.hash(password, 12);
    const newAdmin = new Admin({ email, password });
    let result = await newAdmin.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: signup", error);
    throw new Error(error);
  }
};

module.exports.login = async ({ email, password }) => {
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error(constants.adminMessage.USER_NOT_FOUND);
    }
    const isValid = bcrypt.compare(password, admin.password);
    if (!isValid) {
      throw new Error(constants.adminMessage.INVALID_PASSWORD);
    }
    const token = jwt.sign(
      { id: admin._id },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "1d" }
    );
    return { token };
  } catch (error) {
    console.log("Something went wrong: Service: login", error);
    throw new Error(error);
  }
};
