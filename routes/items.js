const itemsRouter = require("express").Router();

const { createImage, getImagesByItemId } = require("../db/adapters/assets");
const {
  getAllItems,
  getItemsByCategory,
  createItem,
  updateItem,
  getItemById,
  deleteItem,
} = require("../db/adapters/items");

const { authRequired } = require("./utils");

itemsRouter.use((req, res, next) => {
  console.log("A request is being made to /items");
  next();
});

//GET /api/items
itemsRouter.get("/", async (req, res) => {
  const items = await getAllItems();

  res.send({
    success: true,
    message: "Got Items",
    items,
  });
});

//GET /api/items/:itemId
itemsRouter.get("/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const item = await getItemById(itemId);
  const images = await getImagesByItemId(itemId);
  item.images = images;
  console.log("item route", item);
  res.send({
    success: true,
    message: "Got Item",
    item,
  });
});

//POST /api/items
itemsRouter.post("/", authRequired, async (req, res, next) => {
  let image = "";
  if (req.user.isAdmin != true) {
    res.send({ message: "you are not an admin" });
    return;
  }
  const { itemObj } = req.body;
  console.log("newItem Obj:", itemObj);

  if (itemObj.image !== "") {
    image = itemObj.image;
  }

  try {
    const item = await createItem(itemObj);

    if (item) {
      const itemImage = await createImage({ itemId: item.id, image });
      res.send({
        success: true,
        message: `${item.name} is added to shop`,
        item,
        itemImage,
      });
    } else {
      next({
        name: "CreateItemError",
        message: "Null value in required field",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//PATCH /api/items/:itemId
itemsRouter.patch("/:itemId", authRequired, async (req, res, next) => {
  if (req.user.isAdmin != true) {
    res.send({ message: "you are not an admin" });
    return;
  }
  const { itemId } = req.params;
  const { itemObj } = req.body;

  try {
    if (req.user.isAdmin) {
      const updatedItem = await updateItem(itemObj);
      console.log("updating item:", updatedItem);
      res.send({
        success: true,
        message: "Item updated",
        item: updatedItem,
      });
    } else {
      next({
        name: "UnauthorizedUserError",
        message: "You cannot update an item unless you are an admin",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
itemsRouter.delete("/delete/:id", authRequired, async (req, res, next) => {
  const { id } = req.params;
  console.log("item being deleted ", id);
  try {
    const { name } = await deleteItem(id);
    res.send({
      success: true,
      message: `${name} is deleted from inventory!`,
    });
  } catch (error) {
    throw error;
  }
});

module.exports = itemsRouter;
