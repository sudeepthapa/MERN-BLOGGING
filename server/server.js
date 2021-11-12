require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// Module Imports
const connectToDatabase = require('./config/db');
const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');

// Express app
const app = express();

// Database connection
connectToDatabase();

// Middlewares configuration
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan(':method :url :status - :response-time ms'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);
app.use('/api/v1/posts', postsRoutes);

app.use((req, res, next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    })
});


app.listen(process.env.PORT, () => {
    console.log('Server is running at port: ' + process.env.PORT);
})

