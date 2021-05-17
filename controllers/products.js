const products = require("../models/products");
const { validationResult } = require('express-validator');
const e = require("express");
const log = console.log;

const index = async (req, res) => {
    try { res.status(200).render('index', {exp: '∞'}) }
    catch (e) { res.status(404).render( 'error', {response: 'Can not serve the landing page: ' + e.message} ) }
}

const createOneLanding = async (req, res) => {
    try { res.status(200).render('create',
        {
            response: 'No responses yet !',
            exp: res.locals.token.exp - Math.round(new Date().getTime() / 1000)
        }
    )}
    catch (e) { res.status(404).render( 'error', {response: 'Can not serve the create landing page: ' + e.message} ) }
}
const createOne = async (req, res) => {
    try {
        /* const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ error: error.array() })
        } */
        res.status(200).render('create', {response: await products.createOne(
            req.body.articleNo,
            req.body.name,
            req.body.description,
            req.body.price
        ),
        exp: res.locals.token.exp - Math.round(new Date().getTime() / 1000)
    });
    }
    catch (e) { res.status(404).render('error', {response: 'Can not create the product: ' + e.message}) }
}

const readOneLanding = async (req, res) => {
    try { res.status(200).render('read',
        {
            response: 'No responses yet !',
            exp: res.locals.token.exp - Math.round(new Date().getTime() / 1000)
        }
    )}
    catch (e) { res.status(404).render( 'error', {response: 'Can not serve the read landing page: ' + e.message, exp: '$'} ) }
}
const readOne = async (req, res) => {
    try {
       /*  const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(422).json({ error: error.array() })
        } */
        const result = await products.readOne(req.body.articleNo);
        result === null ?
            res.status(404).render('error', {response: 'Can not serve this product: ' + e.message, exp: '$'}) :
            res.status(200).render('read', {response: result, exp: '$'});
    }
    catch (e) { res.status(404).send('Can not serve this product: ' + e.message) }
}

const updateOneLanding = async (req, res) => {
    try { res.status(200).render('update',
        {
            response: 'No responses yet !',
            exp: res.locals.token.exp - Math.round(new Date().getTime() / 1000)
        }
    )}
    catch (e) { res.status(404).render( 'error', {response: 'Can not serve the update landing page: ' + e.message} ) }
}
const updateOne = async (req, res) => {
    try {
        const result = await products.updateOne(
            req.body.articleNo,
            req.body.price
        );
        console.log({result});
        const updatedProduct = await products.readOne(req.body.articleNo);
        res.status(200).render('update', {
            response: updatedProduct,
            exp: res.locals.token.exp - Math.round(new Date().getTime() / 1000)
        });
    }
    catch (e) { res.status(404).render('error', {response: 'Can not update the price of the product: ' + e.message}) }
}

const deleteOneLanding = async (req, res) => {
    const exp = res.locals.token.exp - Math.round( new Date().getTime() / 1000 );
    try { res.status(200).render('delete',
        {
            response: 'No responses yet !',
            exp: res.locals.token.exp - Math.round(new Date().getTime() / 1000)
        }
    )}
    catch (e) { res.status(404).render( 'error', {response: 'Can not serve the delete landing page: ' + e.message, exp} ) }
}
const deleteOne = async (req, res) => {
    try {
        const articleNo = req.body.articleNo;
        log('articleNo:', articleNo);
        const result =  await products.deleteOne(articleNo);
        log(result);
        if(result.n !== 1) throw new Error(`Can not delete the product, articleNo: ${articleNo} !`);
        const exp = res.locals.token.exp - Math.round( new Date().getTime() / 1000 );
        res.status(200).render('delete', {response: `Successfully deleted product: ${articleNo}`, exp});
    }
    catch (e) {
        console.log('e.message:', e.message);
        res.status(404).render('error', {response: 'Can not delete the product: ' + e.message, exp: '0 sec'}) }
}

const readAll = async (req, res) => {

    try {
        const exp = res.locals.token.exp - Math.round( new Date().getTime() / 1000 );
        res.status(200).render( 'readAll',
            {
                response: await products.readAll(),
                exp: res.locals.token.exp - Math.round(new Date().getTime() / 1000)
            }
    )}
    catch (e) { res.status(404).render('error', {response: 'Can not serve all the products: ' + e.message, exp: 0 }) }
}

module.exports = {
    index,
    createOneLanding, createOne,
    readOneLanding, readOne,
    updateOneLanding, updateOne,
    deleteOneLanding, deleteOne,
    readAll
};


