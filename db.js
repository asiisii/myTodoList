const Pool = require('pg').Pool

const pool = new Pool({
	user: 'postgres',
	host: process.env.REACT_APP_HOST_NAME,
	database: process.env.REACT_APP_DB_NAME,
	port: process.env.REACT_APP_PORT,
})

module.exports = pool
