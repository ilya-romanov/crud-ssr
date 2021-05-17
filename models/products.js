const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    articleNo: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
});

const Product = mongoose.connection.model("products", productSchema);

const createOne = async (articleNo, name, description, price) =>
    await new Product({ articleNo, name, description, price }).save();

const readOne = async (articleNo) => await Product.findOne({ articleNo });

const updateOne = async (articleNo, price) =>
    await Product.updateOne({ articleNo }, { price });

const deleteOne = async (articleNo) =>
    await Product.deleteOne({ articleNo });

const readAll = async () => await Product.find({});

module.exports = {
    createOne,
    readOne,
    updateOne,
    deleteOne,
    readAll
};
