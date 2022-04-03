var express = require('express');
var router = express.Router();
var Product = require("../models/Product");

router.get('/products/add', function(req, res, next) {
  res.render('products/add');
});
router.post('/products/add', async function(req, res, next) {
  let product = new Product(req.body);
  await product.save();
  return res.redirect("/products");
});
router.get('/products/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  return res.render("products/edit",{product});
});
router.post('/products/edit/:id', async function(req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name= req.body.name;
  await product.save();
  return res.redirect("/products");
});
router.get('/products/delete/:id', async function(req, res, next) {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.redirect("/products");
});
router.get('/products', async function(req, res, next) {
  let products = await Product.find();
  res.render('products/index',{products});
});

module.exports = router;
