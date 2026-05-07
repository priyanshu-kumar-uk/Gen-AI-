import dotenv from 'dotenv'
dotenv.config()

const config = {
    MISTRAL_API_KEY : process.env.MISTRAL_API_KEY,
    PORT : process.env.PORT,
    GEMEN_API_KEY: process.env.GEMEN_API_KEY
}

export default config