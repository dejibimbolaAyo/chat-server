const logger = require("../config/logger");
const FriendRequest = require("../services/friendRequest");
const {HTTP_STATUS} = require("../constants/httpStatus");

let {error, success} = require("../constants/response");
let response = require("../helper/responseWriter");

/**
 * Accept request
 */
exports.acceptRequest = async (req, res) => {
  console.log(req.body)
  const {requestId} = req.body
  try {
    const friend = await FriendRequest.accept(requestId);

    if (!friend.status) {
      error.message = "No friend found";
      return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
    }
    success.data = friend;
    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)

  } catch (err) {
    logger.log("error", `Error occured, ${err}`);
    error.message = err.message || err._message;
    return response.writeJson(res, err, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
}

/**
 * Create request
 */
exports.createRequest = async (req, res) => {}

/**
 * Decline request
 */
exports.declineRequest = async (req, res) => {
  try {
    const friend = await FriendRequest.decline();

    if (!friend.status) {
      error.message = "No friend found";
      return response.writeJson(res, error, HTTP_STATUS.NOT_FOUND.CODE)
    }
    success.data = friend;
    return response.writeJson(res, success, HTTP_STATUS.OK.CODE)

  } catch (err) {
    logger.log("error", `Error occured, ${err}`);
    error.message = err.message || err._message;
    return response.writeJson(res, err, HTTP_STATUS.INTERNAL_SERVER_ERROR.CODE)
  }
}

exports.getRequest = async (req, res) => {

}

exports.getRequests = async (req, res) => {

}