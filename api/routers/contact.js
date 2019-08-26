
const base = require("./base");
const {getContacts, getContact, createContact, updateContact} = require("../controllers/contact");

module.exports = function contactRoutes(router) {
  router
    .route('/contacts')
    .get(getContacts);
  router
    .route('/contacts/:id')
    .get(getContact);
  router
    .route('/contacts/create')
    .post(createcontact)
  router
    .route('/contacts/:id')
    .put(updatecontact)
}