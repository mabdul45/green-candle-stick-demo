import notificationSlice from './notification/notificationSlice';
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notification: notificationSlice.reducer
    }
})

export default store