const User = require("../database/models/userModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

module.exports.createUser = async (serviceData) => {
  try {
    let user = new User({ ...serviceData });
    let result = await user.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createUser", error);
    throw new Error(error);
  }
};

module.exports.getAllUsers = async ({ skip = 0, limit = 10 }) => {
  try {
    let users = await User.find({}).skip(parseInt(skip)).limit(parseInt(limit));
    return formatMongoData(users);
  } catch (error) {
    console.log("Something went wrong: Service: getAllUsers", error);
    throw new Error(error);
  }
};

module.exports.getUserById = async ({ id }) => {
  try {
    checkObjectId(id);
    let user = await User.findById(id);
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    return formatMongoData(user);
  } catch (error) {
    console.log("Something went wrong: Service: getUserById", error);
    throw new Error(error);
  }
};

module.exports.updateUser = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let user = await User.findOneAndUpdate({ user_id: id }, updateInfo, {
      new: true,
    });
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    return formatMongoData(user);
  } catch (error) {
    console.log("Something went wrong: Service: updateUser", error);
    throw new Error(error);
  }
};

module.exports.deleteUser = async ({ id }) => {
  try {
    checkObjectId(id);
    let user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error(constants.userMessage.USER_NOT_FOUND);
    }
    return formatMongoData(user);
  } catch (error) {
    console.log("Something went wrong: Service: deleteUser", error);
    throw new Error(error);
  }
};
