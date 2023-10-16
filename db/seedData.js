// Create some seed data and export it from this file
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;
const users = [
  { username: "Andrew", password: "andrew", isAdmin: false, isGuest: false },
  { username: "Matt R", password: "yesway", isAdmin: false, isGuest: false },
  { username: "BigJoe", password: "toemeat", isAdmin: false, isGuest: false },
  { username: "mother", password: "quesswho", isAdmin: false, isGuest: false },
  { username: "Rara", password: "boug", isAdmin: false, isGuest: false },
  { username: "Ced", password: "ric", isAdmin: true, isGuest: false },
];

const items = [
  {
    itemName: "Partscaster",
    isAvailable: true,
    itemCost: "800",
    itemDescription:
      "A partscaster with a fender baja neck, hot rails pickups, and a bigsby installed",
    itemCategory: "Guitars",
    inventory_qty: 1,
  },
  {
    itemName: "Harmony H78",
    isAvailable: true,
    itemCost: "1500",
    itemDescription: "A vintage 1960's Harmny H78 hollowbody guitar",
    itemCategory: "Guitars",
    inventory_qty: 1,
  },
  {
    itemName: "Fender MusicMaster Bass Amp",
    isAvailable: true,
    itemCost: "200",
    itemDescription:
      "A vintage Fender MusicMaster Bass Amp that has be reveared by guitar players.",
    itemCategory: "Amps",
    inventory_qty: 1,
  },
  {
    itemName: "Kalamazoo Model 1",
    isAvailable: true,
    itemCost: "400",
    itemDescription: "A vintage Kalamazoo Model 1 Amp. 5 watts.",
    itemCategory: "Amps",
    inventory_qty: 1,
  },
  {
    itemName: "Big Muff Pi",
    isAvailable: true,
    itemCost: "500",
    itemDescription: 'Vintage Green "Russian" Big Muff.',
    itemCategory: "Pedals",
    inventory_qty: 1,
  },
  {
    itemName: "London Fuzz",
    isAvailable: true,
    itemCost: "500",
    itemDescription:
      "Limited Edition London Fuzz. Made with the rara NKT275 transistors.",
    itemCategory: "Pedals",
    inventory_qty: 1,
  },
  {
    itemName: "Universal Audio Solo/610",
    isAvailable: true,
    itemCost: "900",
    itemDescription:
      "Vintage style tube mic preamp based off the original 610 console preamps",
    itemCategory: "Misc.",
    inventory_qty: 1,
  },
  {
    itemName: "Nord Stage 6",
    isAvailable: true,
    itemCost: "1000",
    itemDescription: "The Nord Stage 6. In excellent condition",
    itemCategory: "Misc.",
    inventory_qty: 1,
  },
];

const images = [
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104286/guitars/telecaster1_ovuyb1.jpg`,
    itemId: 1,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104286/guitars/telecaster1_ovuyb1.jpg`,
    itemId: 1,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104289/guitars/telecaster3_o7cm5g.jpg`,
    itemId: 1,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104286/guitars/telecaster1_ovuyb1.jpg`,
    itemId: 1,
  },
  /////////////////
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104182/guitars/harmony1_znib5t.jpg`,
    itemId: 2,
  },

  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104182/guitars/harmony1_znib5t.jpg`,
    itemId: 2,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104184/guitars/harmony3_ek9dlr.jpg`,
    itemId: 2,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104183/guitars/harmony2_jk9tox.jpg`,
    itemId: 2,
  },
  ///////////////////
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104005/amps/fender_amp2_zcn5gp.jpg`,
    itemId: 3,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104005/amps/fender_amp2_zcn5gp.jpg`,
    itemId: 3,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104007/amps/fender_amp1_ssklfb.jpg`,
    itemId: 3,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104009/amps/fender_amp4_b40odc.jpg`,
    itemId: 3,
  },
  ///////////////////
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104724/amps/kalamazoo1_m2vgik.jpg`,
    itemId: 4,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104724/amps/kalamazoo1_m2vgik.jpg`,
    itemId: 4,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104726/amps/kalamazoo2_pzlgtp.jpg`,
    itemId: 4,
  },
  ///////////////////
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696103903/pedals/bigmuff1_vvf8mo.jpg`,
    itemId: 5,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696103903/pedals/bigmuff1_vvf8mo.jpg`,
    itemId: 5,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696103912/pedals/bigmuff2_fiyxap.jpg`,
    itemId: 5,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696103930/pedals/bigmuff3_i8regt.jpg`,
    itemId: 5,
  },
  ////////////////////
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104051/pedals/londonfuzz1_oalcxh.jpg`,
    itemId: 6,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104051/pedals/londonfuzz1_oalcxh.jpg`,
    itemId: 6,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104052/pedals/londonfuzz2_rxrrjq.jpg`,
    itemId: 6,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104053/pedals/londonfuzz3_tr5si9.jpg`,
    itemId: 6,
  },
  ///////////////////
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104693/misc/ua610_1_uan4op.jpg`,
    itemId: 7,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104693/misc/ua610_1_uan4op.jpg`,
    itemId: 7,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104692/misc/ua610_3_ficw5r.jpg`,
    itemId: 7,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104694/misc/us620_2_ysfof4.jpg`,
    itemId: 7,
  },
  ///////////////////
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/c_thumb,w_200,g_face/v1696104406/misc/nord3_b8ada6.jpg`,
    itemId: 8,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104406/misc/nord3_b8ada6.jpg`,
    itemId: 8,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104404/misc/nord2_fppmk9.jpg`,
    itemId: 8,
  },
  {
    image: `https://res.cloudinary.com/doh7njipk/image/upload/v1696104402/misc/nord1_drrabn.jpg`,
    itemId: 8,
  },
];

//let reviews =[{itemId:1,userId:2,tite:"time",rating:2,review:"this sucks"}];
let temp = [];
let reviews = users.forEach((user, index) => {
  temp.push({
    itemId: index + 1,
    userId: index + 1,
    title: `${items[index].itemName}`,
    rating: 4,
    review: `I ${user.username},fully endorse ${items[index].itemName}`,
  });
});
reviews = temp;
console.log("reviews for products", reviews);
module.exports = { users, items, images, reviews };
