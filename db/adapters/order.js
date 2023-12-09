const client = require("../client");

async function createOrder(userId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
                INSERT INTO orders("userId")
                VALUES ($1)
                RETURNING *;
            `,
      [userId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getOrderById(orderId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
    SELECT ords.id, ords."userId", ords."isCart", ords."isComplete", COALESCE(CAST(SUM(ROUND((orditms.item_quantity * itms.cost), 2)) AS INT), 0) AS "totalPrice",
    CASE WHEN orditms."orderId" IS NULL THEN '[]'::json
    ELSE
    JSON_AGG(
        JSON_BUILD_OBJECT (
            'id', itms.id,
            'name', itms.name,
            'description', itms.description,
            'cost', itms.cost,
            'category', itms.category,
            'isAvailable', itms."isAvailable",
            'quantity', orditms.item_quantity,
            'order_item_id', orditms.id
        )
    ) END AS items
    FROM orders ords
    FULL OUTER JOIN order_items orditms
        ON ords.id = orditms."orderId"
    FULL OUTER JOIN items itms
        ON orditms."itemId" = itms.id
    JOIN users us
        ON us.id = ords."userId"
    WHERE ords.id = $1
    GROUP BY ords.id, orditms."orderId";
`,
      [orderId]
    );
    if (!order) {
      return null;
    }
    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrders() {
  try {
    const { rows: orders } = await client.query(
      `
      SELECT ords.id, ords."userId", ords."isCart", ords."isComplete", COALESCE(CAST(SUM(ROUND((orditms.item_quantity * itms.cost), 2)) AS INT), 0) AS "totalPrice",
      CASE WHEN orditms."orderId" IS NULL THEN '[]'::json
      ELSE
      JSON_AGG(
          JSON_BUILD_OBJECT (
              'id', itms.id,
              'name', itms.name,
              'description', itms.description,
              'cost', itms.cost,
              'category', itms.category,
              'isAvailable', itms."isAvailable",
              'quantity', orditms.item_quantity,
              'order_item_id', orditms.id
          )
      ) END AS items
      FROM orders ords
      FULL OUTER JOIN order_items orditms
          ON ords.id = orditms."orderId"
      FULL OUTER JOIN items itms
          ON orditms."itemId" = itms.id
      GROUP BY ords.id, orditms."orderId";
      `
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getAllUsersOrders(userId) {
  try {
    const { rows: orders } = await client.query(
      `
                SELECT ords.id, ords."userId", ords."isCart", ords."isComplete", COALESCE(CAST(SUM(ROUND((orditms.item_quantity * itms.cost), 2)) AS INT), 0) AS "totalPrice",
                CASE WHEN orditms."orderId" IS NULL THEN '[]'::json
                ELSE
                JSON_AGG(
                    JSON_BUILD_OBJECT (
                        'id', itms.id,
                        'name', itms.name,
                        'description', itms.description,
                        'cost', itms.cost,
                        'category', itms.category,
                        'isAvailable', itms."isAvailable",
                        'quantity', orditms.item_quantity,
                        'order_item_id', orditms.id
                    )
                ) END AS items
                FROM orders ords
                FULL OUTER JOIN order_items orditms
                    ON ords.id = orditms."orderId"
                FULL OUTER JOIN items itms
                    ON orditms."itemId" = itms.id
                JOIN users us
                    ON us.id = ords."userId"
                WHERE us.id = $1
                GROUP BY ords.id, orditms."orderId";
            `,
      [userId]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function getUsersLastOrder(userId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
      SELECT ords.id, ords."userId", ords.order_date, ords."isCart", ords."isComplete", COALESCE(CAST(SUM(ROUND((orditms.item_quantity * itms.cost), 2)) AS INT), 0) AS "totalPrice",
                CASE WHEN orditms."orderId" IS NULL THEN '[]'::json
                ELSE
                JSON_AGG(
                    JSON_BUILD_OBJECT (
                        'id', itms.id,
                        'name', itms.name,
                        'description', itms.description,
                        'cost', itms.cost,
                        'category', itms.category,
                        'isAvailable', itms."isAvailable",
                        'quantity', orditms.item_quantity,
                        'order_item_id', orditms.id,
                        'image', it_imgs.image
                    )
                ) END AS items
                FROM orders ords
                FULL OUTER JOIN order_items orditms
                    ON ords.id = orditms."orderId"
                FULL OUTER JOIN items itms
                    ON orditms."itemId" = itms.id
                INNER JOIN items_imgs it_imgs
                    ON itms.id = it_imgs.item_id
                JOIN users us
                    ON us.id = ords."userId"
                WHERE us.id = $1
                GROUP BY ords.id, orditms."orderId", itms.id, it_imgs.id
                ORDER BY ords.order_date desc
                LIMIT 1;`,
      [userId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function getAllOrdersByUsername(username) {
  try {
    const { rows: orders } = await client.query(
      `
                SELECT ords.id, ords."userId", ords."isCart", ords."isComplete", ords.order_date, COALESCE(CAST(SUM(ROUND((orditms.item_quantity * itms.cost), 2)) AS INT), 0) AS "totalPrice",
                CASE WHEN orditms."orderId" IS NULL THEN '[]'::json
                ELSE
                JSON_AGG(
                    JSON_BUILD_OBJECT (
                        'id', itms.id,
                        'name', itms.name,
                        'description', itms.description,
                        'cost', itms.cost,
                        'category', itms.category,
                        'isAvailable', itms."isAvailable",
                        'quantity', orditms.item_quantity,
                        'order_item_id', orditms.id
                    )
                ) END AS items
                FROM orders ords
                FULL OUTER JOIN order_items orditms
                    ON ords.id = orditms."orderId"
                FULL OUTER JOIN items itms
                    ON orditms."itemId" = itms.id
                JOIN users us
                    ON us.id = ords."userId"
                WHERE us.username = $1
                GROUP BY ords.id, orditms."orderId";
            `,
      [username]
    );
    return orders;
  } catch (error) {
    throw error;
  }
}

async function updateOrdersUser(orderId, userId) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
                UPDATE orders
                SET "UserId" = $2
                WHERE id = $1
                RETURNING *;
            `,
      [orderId, userId]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrder(orderId, ordObj) {
  try {
    const { rows: order } = await client.query(
      `
                UPDATE orders
                SET
                order_date = current_timestamp,
                "isCart" = COALESCE($2, "isCart"),
                "isComplete" = COALESCE($3, "isComplete")
                WHERE id = $1
                RETURNING *;
            `,
      [orderId, ordObj.isCart, ordObj.isComplete]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrder,
  getAllUsersOrders,
  getUsersLastOrder,
  getAllOrdersByUsername,
  getAllOrders,
  getOrderById,
  updateOrder,
  updateOrdersUser,
};
