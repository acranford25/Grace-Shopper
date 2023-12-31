const stripeRouter = require("express").Router();

// This is your test secret API key.
const stripe = require("stripe")('sk_test_51NSsoYE7507WjCKqRjIFVFzFZaiy0wOqpY9QfY9UxFG7IDLn9vBSzwiEFLrYsXT2sl8o4QSkMX3uLIiZfLfMljUU00JEpHouh0');



const calculateOrderAmount = (items) => {
  // Replace this constant with a calculation of the order's amount
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  console.log("inside of calculatedOrderAmount",items)
  let sum =0;
  for(let item of items){
    sum = sum+(item.quantity*item.cost);
  }
  console.log("testing sum",sum)
  return sum;
};
//api/create-payment-intent
stripeRouter.post("/create-payment-intent", async (req, res) => {
  console.log("req.body in route",req.body)
  const items = req.body;
try {
  // Create a PaymentIntent with the order amount and currency
  const paymentIntent = await stripe.paymentIntents.create({
    amount: calculateOrderAmount(items), 
    currency: "usd",
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
    total: calculateOrderAmount(items),
  });
} catch (error) {
  console.log(error)
} 
});


module.exports = stripeRouter;