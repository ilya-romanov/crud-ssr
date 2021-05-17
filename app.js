require('dotenv').config({ path: __dirname + '/env/.env' });
/* connect to db */
require('./lib/ProductsApp').connect();
const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use('/public', express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* set view engine */
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* routing */
const products = require('./routes/products');
app.use(products());
const users = require('./routes/users');
app.use(users());

/* start app */
app.listen(port, () => console.log(`Server is running: http://localhost:${port}`));


/* notes
useful in chrome to monitor events:
monitorEvents(window, 'click');

question: checkToken verify function: without callback possible ?
*/


