"use strict";

/**
 * cart router
 */

const { createCoreRouter } = require("@strapi/strapi").factories;

module.exports = createCoreRouter("api::cart.cart", {
  config: {
    findOne: {
      auth: false,
      policies: [],
      middlewares: ["api::cart.strict"],
    },
  },
});
