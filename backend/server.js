// Server entry point
require('dotenv').config();
const app = require('./app');
const connectDB = require('./config/db');
const logger = require('./utils/logger');
const config = require('./config').default;

const PORT = config.port;
connectDB(config.mongoUri)
  .then(() => {
    app.listen(PORT, () => logger.log(`Server running on port ${PORT}`));
  })
  .catch((err) => logger.error(`DB connection error: ${err.message}`));
