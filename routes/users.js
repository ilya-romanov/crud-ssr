const {
    loginLanding, login,
    registerLanding, register
} = require('../controllers/users.js');

const router = require('express').Router();

module.exports = () => {

    router.get('/register', registerLanding)
    router.post('/register', register);

    router.get('/login', loginLanding);
    router.post('/login', login);

    return router;
}


