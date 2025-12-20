import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";
import client from "../config/redis.js";

// global variables
const currency = "inr";
const deliveryCharge = 10;

// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing orders using COD
const placeOrder = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await client.del("allOrders");

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({ success: true, message: "Order Placed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// Placing orders using Stripe method
const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address, amount } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await client.del("allOrders");
    await client.del(`order-${newOrder._id}`);

    const line_items = items.map((item) => ({
      price_data: {
        currency: currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: deliveryCharge * 100,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: err.message });
  }
};

// verify Stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      await client.del("allOrders");
      res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      await client.del("allOrders");
      await client.del(`order-${orderId}`);
      res.json({ success: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// All Orders Data For Admin Panel
const allOrders = async (req, res) => {
  try {
    const cacheKey = "allOrders";
    const cached = await client.get(cacheKey);

    if (cached) {
      console.log("🔥 Serving allOrders from cache");

      try {
        return res.json({
          success: true,
          orders: cached,
          cached: true,
        });
      } catch (error) {
        console.error("❌ Corrupted allOrders cache detected:", cacheKey);
        await client.del(cacheKey);
      }
    }
    console.log("🗄️ Fetching allOrders from DB & setting cache");

    const orders = await orderModel.find({}).lean();

    await client.set(cacheKey, JSON.stringify(orders), { ex: 3600 });

    res.json({ success: true, orders, cached: false });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const cacheKey = `userOrders-${userId}`;

    const cached = await client.get(cacheKey);
    if (cached) {
      console.log("🔥 Serving userOrders from cache");

      try {
        return res.json({
          success: true,
          orders: cached,
          cached: true,
        });
      } catch (error) {
        console.error("❌ Corrupted userOrders cache detected:", cacheKey);
        await client.del(cacheKey);
      }
    }

    const orders = await orderModel.find({ userId }).lean();
    if (!orders) {
      return res.json({ success: false, message: "No orders found" });
    }
    console.log("🗄️ Fetching userOrders from DB & setting cache");
    await client.set(cacheKey, JSON.stringify(orders), { ex: 3600 });

    res.json({ success: true, orders });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

//Update Order Status
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status }).lean();
    await client.del("allOrders");
    await client.del(`order-${orderId}`);
    res.json({ success: true, message: "order updated" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

export {
  placeOrder,
  placeOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
};
