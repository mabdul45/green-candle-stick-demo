import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    message: '',
    loading: false,
    notify: false
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setMessage(state, action) {
            state.loading = false
            state.message = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload
        },
        setNotify(state, action) {
            state.notify = action.payload
        }
    }
})

export const notificationActions = notificationSlice.actions
export default notificationSlice