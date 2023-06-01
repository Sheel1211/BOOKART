import { Product } from "../../models/productModel.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e,
    });
  }
};

export const addProduct = async (req, res) => {
  try {

    console.log(req.body);

    const product = Product.create(req.body);

    console.log(product);

    res.status(200).json({
      success: true,
      message: "Product Added Successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const del = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e,
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e,
    });
  }
};


export const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });
    res.status(200).json({
      success: true,
      message: products,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e,
    });
  }
};



export const searchProducts = async (req, res) => {
  try {
    const query = req.query.q;
    const matchingProducts = await Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json({ success: true, matchingProducts });
  }
  catch (error) {
    res.status(400).json({ success: false, message: e, });
  }
}

