const Ticket = require("../database/models/ticketModel");
const { formatMongoData, checkObjectId } = require("../helper/dbHelper");
const constants = require("../constants");

module.exports.createTicket = async (serviceData) => {
  try {
    let ticket = new Ticket({ ...serviceData });
    let result = await ticket.save();
    return formatMongoData(result);
  } catch (error) {
    console.log("Something went wrong: Service: createTicket", error);
    throw new Error(error);
  }
};

module.exports.getAllTickets = async ({ skip = 0, limit = 10 }) => {
  try {
    let tickets = await Ticket.find({})
      .skip(parseInt(skip))
      .limit(parseInt(limit));
    return formatMongoData(tickets);
  } catch (error) {
    console.log("Something went wrong: Service: getAllTickets", error);
    throw new Error(error);
  }
};

module.exports.getTicketById = async ({ id }) => {
  try {
    checkObjectId(id);
    let ticket = await Ticket.findById(id);
    if (!ticket) {
      throw new Error(constants.ticketMessage.TICKET_NOT_FOUND);
    }
    return formatMongoData(ticket);
  } catch (error) {
    console.log("Something went wrong: Service: getTicketById", error);
    throw new Error(error);
  }
};

module.exports.updateTicket = async ({ id, updateInfo }) => {
  try {
    checkObjectId(id);
    let ticket = await Ticket.findOneAndUpdate({ _id: id }, updateInfo, {
      new: true,
    });
    if (!ticket) {
      throw new Error(constants.ticketMessage.TICKET_NOT_FOUND);
    }
    return formatMongoData(ticket);
  } catch (error) {
    console.log("Something went wrong: Service: updateTicket", error);
    throw new Error(error);
  }
};

module.exports.deleteTicket = async ({ id }) => {
  try {
    checkObjectId(id);
    let ticket = await Ticket.findByIdAndDelete(id);
    if (!ticket) {
      throw new Error(constants.ticketMessage.TICKET_NOT_FOUND);
    }
    return formatMongoData(ticket);
  } catch (error) {
    console.log("Something went wrong: Service: deleteTicket", error);
    throw new Error(error);
  }
};
