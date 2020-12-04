const { merge } = require('lodash')
const env = process.env.NODE_ENV
const platform = process.env.PLATFORM || 'localhost'

const baseConfig = {
  env,
  port: process.env.PORT, 
  secrets: {
    jwt: process.env.JWT_SECRET,
    jwtExp: parseInt(process.env.JWT_EXPIRY)
  },
  dbUrl: process.env.DB_URL
}

let envConfig = {}

if (platform == 'localhost') {
  switch (env) {
    case 'test':
    case 'testing':
      envConfig = require('./testing.env')
      break
    case 'prod':
    case 'production':
      envConfig = require('./prod.env')
      break
    default:
      envConfig = require('./dev.env')
  } 
} else {
  envConfig = baseConfig
}

const config = merge(baseConfig, envConfig) 
console.log(`Running ${config.env.toUpperCase()} environment on ${platform.toUpperCase()}: `)
module.exports = config
