const express = require('express')
const colors = require('colors')
const cors = require('cors')
const morgan = require('morgan')
const dotenv = require('dotenv')
const connectdb = require('./config/db')

// dotenv configuration
dotenv.config();

// db_connection
connectdb();

// rest object
const app = express()

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));

// url: http://localhost:8080
// route
app.get('/', (req, res) => {
    return res.status(200).send('<h1>Welcome to food server </h1>');
});

// port
const PORT = process.env.PORT || 8000

// listen
app.listen(PORT, () => {
    console.log(`Server running... on ${PORT}`);
});