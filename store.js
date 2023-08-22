import { configureStore } from '@reduxjs/toolkit'
import userActionsReducer from './LoginReducer'
import productsReducer from './ProductReducer'

const store = configureStore({
    reducer: {
        users: userActionsReducer,
        products: productsReducer
    }
})

export default store