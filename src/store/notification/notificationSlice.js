import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    loading: ''
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.message = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        }
    }
})

export const notificationActions = notificationSlice.actions
export default notificationSlice