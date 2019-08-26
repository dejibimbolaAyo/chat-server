const {emitEvent} = require("../../connections/socket")
const Contact = require("../models/contact");

exports.create = async function (user, friend) {
  // Create is called on contact when a new friend request is accepted
  const contact = await Contact.create({user, friend});

  emitEvent('contactCreated', contact)
  return contact;
};

exports.findOneById = function (query) {
  return Contact.findById(query);
};

exports.findAll = async function (query) {
  const contacts = await Contact.find().where({
      contact: query
  });
  return contacts;
}