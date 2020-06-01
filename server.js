const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const documents = require('./routes/documents');
const resources = require('./routes/resources');

// Load env vars
dotenv.config({ path: './config/config.env' });

const app = express();


// Body parser
app.use(express.json());

app.use(morgan('dev'));

// Connect to database
connectDB();

// Mount routers
app.use('/api/v1/documents', documents);
app.use('/api/v1/resources', resources);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process
    server.close(() => process.exit(1));
});