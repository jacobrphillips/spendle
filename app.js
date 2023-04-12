//initialise all dependencies
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

//import routers
const userRouter = require('./src/../routes/userRoutes');
const expenseRouter = require('./src/../routes/expensesRoutes');
const budgetRouter = require('./src/../routes/budgetRoutes');

//create my express application
const app = express();

//setting template engine
// app.set('view engine', 'pug');
// app.set('views', path.join(__dirname, 'views'));

//serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, '/src')));
app.use('/views', express.static(path.join(__dirname,'/views')));

//initialise middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// mounted routes
app.get('/', (req, res) => {
    res.status(200).render('base');
})

app.use('/api/users', userRouter);
app.use('/api/expenses', expenseRouter);
app.use('/api/budgets', budgetRouter);

//export app for server
module.exports = app;
