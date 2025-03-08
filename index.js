// index.js

const dotenv = require('dotenv'); 
const { initServer } = require('./configs/server.js');

dotenv.config();  

initServer();
