const userService = require("../service/userService");
const constants = require("../constants");

module.exports.createUser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.createUser(req.body);
    response.status = 200;
    response.message = constants.userMessage.USER_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createUser", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllUsers = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.getAllUsers(req.query);
    response.status = 200;
    response.message = constants.userMessage.USER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllUsers", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getUserById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.getUserById(req.params);
    response.status = 200;
    response.message = constants.userMessage.USER_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getUserById", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateUser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.updateUser({
      user_id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.userMessage.USER_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateUser", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteUser = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await userService.deleteUser(req.params);
    response.status = 200;
    response.message = constants.userMessage.USER_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteUser", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
