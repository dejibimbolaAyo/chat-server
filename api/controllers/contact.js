const logger = require("../config/logger");
const Contact = require("../services/user");
const {HTTP_STATUS} = require("../constants/httpStatus");

let {error, success} = require("../constants/response");
let response = require("../helper/responseWriter");

/**
 * Get contacts
 */
exports.getContacts = async function (req, res) {
    // Fetch logged in user from token
  try {
    const contacts = await Contact.findAll();

    if (!contacts) {
      error.message = "No contacts found";
      return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
    }
    success.data = contacts;
    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)

  } catch (err) {
    logger.log("error", `Error occured, ${err}`);
    error.message = err.message || err._message;
    return response.writeJson(res, err, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
}

/**
 * Get user details
 */
exports.getContact = async function (req, res) {}

/**
 * Update user details
 */
exports.updateContact = async function (req, res) {}

/**
 * Delete user
 * This would be equal to deleting a friend relationship
 */
exports.deleteContact = async function (req, res) {}