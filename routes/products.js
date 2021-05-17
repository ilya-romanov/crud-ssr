const {
    index,
    createOneLanding, createOne,
    readOneLanding, readOne,
    updateOneLanding, updateOne,
    deleteOneLanding, deleteOne,
    readAllLanding, readAll,
    loginLanding, login,
    registerLanding, register
} = require('../controllers/products.js');

const router = require('express').Router();
const checkToken = require('../mids/checkToken');

/*
const { check } = require('express-validator');
const checkGetOne = require('../mids/checkGetOne');
const checkCreateOne = require('../mids/checkCreateOne');
*/


module.exports = () => {

    router.get('/', index);

    router.get('/create', checkToken, createOneLanding);
    router.post('/create', checkToken, createOne);

    router.get('/read', checkToken, readOneLanding);
    router.post('/read', checkToken, readOne);

    router.get('/update', checkToken, updateOneLanding);
    router.post('/update', checkToken, updateOne);

    router.get('/delete', checkToken, deleteOneLanding);
    router.post('/delete', checkToken, deleteOne);

    router.get('/read-all', checkToken, readAll);

    return router;
}

