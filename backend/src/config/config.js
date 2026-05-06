import dotenv from 'dotenv'
dotenv.config()

const config = {
    MISTRAL_API_KEY : process.env.MISTRAL_API_KEY,
    PORT : process.env.PORT
}

export default config