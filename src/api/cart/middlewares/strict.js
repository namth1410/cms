"use strict";

module.exports = (config, { strapi }) => {
  return async (ctx, next) => {
    console.log(ctx);
    console.log(next);
    const userId = ctx.state.user.id; // ID của người dùng hiện tại
    const cartId = ctx.params.id; // ID của cart từ URL

    // Kiểm tra xem cart có thuộc về người dùng hiện tại không
    const cart = await strapi.db
      .query("api::cart.cart")
      .findOne({ where: { id: cartId } });

    if (cart.userId !== userId) {
      return ctx.unauthorized("You are not authorized to access this cart");
    }

    console.log("ahihi middlewares");

    await next();
  };
};
