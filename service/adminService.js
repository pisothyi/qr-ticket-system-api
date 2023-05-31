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

    // Generate JWT access token
    const accessToken = jwt.sign(
      { id: admin._id },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "15m" }
    );

    // Generate JWT refresh token
    const refreshToken = jwt.sign(
      { id: admin._id },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "7d" }
    );

    // Store refresh token in database
    admin.refreshToken = refreshToken;
    await admin.save();

    return { accessToken, refreshToken };
  } catch (error) {
    console.log("Something went wrong: Service: login", error);
    throw new Error(error);
  }
};

module.exports.refresh = async ({ refreshToken }) => {
  if (!refreshToken) {
    throw new Error(constants.adminMessage.REFRESH_TOKEN_MISSING);
  }

  try {
    // Verify refresh token and extract admin ID
    const decoded = jwt.verify(
      refreshToken,
      process.env.SECRET_KEY || "my-secret-key"
    );
    const adminId = decoded.id;

    // Find admin in database
    const admin = await Admin.findById(adminId);

    if (!admin || admin.refreshToken !== refreshToken) {
      return new Error(constants.adminMessage.INVALID_REFRESH_TOKEN);
    }

    // Generate new JWT access token
    const accessToken = jwt.sign(
      { id: adminId },
      process.env.SECRET_KEY || "my-secret-key",
      { expiresIn: "15m" }
    );

    // Return new access token to client
    return { accessToken };
  } catch (error) {
    console.log("Something went wrong: Service: refresh", error);
    throw new Error(error);
  }
};
