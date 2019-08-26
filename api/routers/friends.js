const base = require("./base");
const {getRequests, getRequest, acceptRequest, declineRequest, createRequest} = require("../controllers/friend");

module.exports = function friendRoutes(router) {
  router
    .route('/friends/requests')
    .get(getRequests);

  router
    .route('/friends/requests/:id')
    .get(getRequest);

  router
    .route('/friends/accept')
    .post(acceptRequest);

  router
    .route('/friends/decline')
    .post(declineRequest);

  router
    .route('/friends/create')
    .post([base.protectRoute], createRequest);
};