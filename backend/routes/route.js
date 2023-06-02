import { Router } from "express";
import { addProduct, deleteProduct, getProducts, updateProduct, searchProducts } from "../src/controller/productController.js";
import { userLogin, userRegister } from "../src/controller/userController.js";

export const router = Router();

router.route("/register").post(userRegister);
router.route("/login").post(userLogin);


router.route("/getProducts").get(getProducts);
router.route("/addBook").post(addProduct);
router.route("/deleteProduct/:id").delete(deleteProduct);
router.route("/updateProduct/:id").put(updateProduct);
router.route("/search").get(searchProducts);

