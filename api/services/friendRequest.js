const {emitEvent} = require("../../connections/socket");
const FriendRequest = require("../models/friendRequest");
const Contact = require('./contact')
const User = require('./user')

exports.accept = async function (requestId) {
  // Create is called on contact when a new friend request is accepted
  const friendRequest = await FriendRequest
    .findOne({requestId})
    .populate('user')
    .populate('contact')

  Contact.create(friendRequest.user, friendRequest.contact)

  const friend = await friendRequest.update({status: "ACCEPTED"})

  if(friend) {
    emitEvent('friendRequestAccepted', friend)
    return {
      status: true,
      message: "Request accepted",
      data: friend
    }
  }

  return {
    status: false,
    message: "Request acceptance failed"
  };
};

exports.decline = async function (requestId) {
  const friendRequest = await FriendRequest.findOneAndUpdate({
    _id: requestId
  }, {
    $set: {
      status: "DECLINED"
    }
  }).populate('friend')

  emitEvent('freindRequestDecline', friendRequest.friend)

  return friendRequest
}

exports.create = async function (userId, friendId) {
  // Find if the friend exists
  const user = await User.findOneById(friendId);

  if (!user.status) {
    return {status: false, message: `No user found with id: ${friendId}`}
  }

  const friendRequest = await FriendRequest.create(userId, user._id)
}