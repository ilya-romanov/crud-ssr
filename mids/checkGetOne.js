const { check } = require('express-validator');
module.exports =  check('articleNo').isLength({ min: 5 });