const ticketService = require("../service/ticketService");
const constants = require("../constants");

module.exports.createTicket = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await ticketService.createTicket(req.body);
    response.status = 200;
    response.message = constants.ticketMessage.TICKET_CREATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: createTicket", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getAllTickets = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await ticketService.getAllTickets(req.query);
    response.status = 200;
    response.message = constants.ticketMessage.TICKET_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getAllTickets", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.getTicketById = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await ticketService.getTicketById(req.params);
    response.status = 200;
    response.message = constants.ticketMessage.TICKET_FETCHED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: getTicketById", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.updateTicket = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await ticketService.updateTicket({
      ticket_id: req.params.id,
      updateInfo: req.body,
    });
    response.status = 200;
    response.message = constants.eventMessage.EVENT_UPDATED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: updateTicket", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};

module.exports.deleteTicket = async (req, res) => {
  let response = { ...constants.defaultServerResponse };
  try {
    const responseFromService = await ticketService.deleteTicket(req.params);
    response.status = 200;
    response.message = constants.ticketMessage.TICKET_DELETED;
    response.body = responseFromService;
  } catch (error) {
    console.log("Something went wrong: Controller: deleteTicket", error);
    response.message = error.message;
  }
  return res.status(response.status).send(response);
};
