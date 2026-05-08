import {configureStore} from '@reduxjs/toolkit'
import aiReducer from '../features/ai/state/ai.state.js'

export const store = configureStore({
    reducer:{
        chat:aiReducer
    }
})
