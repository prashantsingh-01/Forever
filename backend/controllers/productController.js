import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import client from "../config/redis.js";

// function for add product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestseller: bestseller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();
    await client.del("productList");

    res.json({ success: true, message: "Product Added" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// function for list product
const listProduct = async (req, res) => {
  try {
    const cacheKey = "productList";
    const cached = await client.get(cacheKey);

    if (cached) {
      console.log("🔥 Serving productList from cache");

      try {
        return res.json({
          success: true,
          products: JSON.parse(cached),
          cached: true,
        });
      } catch (err) {
        console.error("❌ Corrupted prodcutList cache detected:", cacheKey);
        await client.del(cacheKey);
      }
    }

    console.log("🗄️ Fetching productList from DB & setting cache");

    const products = await productModel.find({}).lean();

    await client.set(cacheKey, JSON.stringify(products), { ex: 3600 });

    res.json({ success: true, products, cached: false });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

// function for remove product
const removeProduct = async (req, res) => {
  try {
    const { id } = req.body;
    await productModel.findByIdAndDelete(id);

    await client.del("productList");
    await client.del(`product-${id}`);

    res.json({ success: true, message: "Product Removed" });
  } catch (err) {
    console.log(err);
    res.json({ success: false, message: err.message });
  }
};

// function for single product info
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const cacheKey = `product-${productId}`;

    const cached = await client.get(cacheKey);
    if (cached) {
      try {
        return res.json({
          success: true,
          product: JSON.parse(cached),
          cached: true,
        });
      } catch {
        console.error("❌ Corrupted singleProduct cache detected:", cacheKey);
        await client.del(cacheKey);
      }
    }

    const product = await productModel.findById(productId);
    if (!product) {
      return res.json({ success: false, message: "Product not found" });
    }

    console.log("🗄️ Fetching singleProduct from DB & setting cache");
    await client.set(cacheKey, JSON.stringify(product), { ex: 3600 });

    res.json({ success: true, product, cached: false });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export { addProduct, removeProduct, listProduct, singleProduct };
