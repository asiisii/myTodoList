const Pool = require('pg').Pool
require('dotenv').config()

// const devConfig = {
// 	user: process.env.PG_USER,
// 	host: process.env.PG_HOST,
// 	database: process.env.PG_DATABASE,
// 	port: process.env.PG_PORT,
// }

const devConfig = `postgresql://${process.env.PG_USER}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`

const prodConfig = process.env.DATABASE_URL //will come from heroku addons

// const pool = new Pool(
// 	process.env.NODE_ENV === 'production' ? prodConfig : devConfig
// )

const pool =
	process.env.NODE_ENV === 'production'
		? new Pool({
				connectionString: prodConfig,
				ssl: {
					rejectUnauthorized: false,
				},
		  })
		: new Pool({
				connectionString: devConfig,
		  })

module.exports = pool
