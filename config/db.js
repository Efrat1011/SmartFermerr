const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: 'postgresql://efrat:yxAxdRUuv5Bq9zWFGmqI80Y8zwvr9dcL@dpg-d28ft7qdbo4c73fi1c8g-a.oregon-postgres.render.com/fermerdb',
  ssl: {rejectUnauthorized: false}
});

module.exports = pool;
