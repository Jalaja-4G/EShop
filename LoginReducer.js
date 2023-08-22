import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn : false,
  isAdmin : false,
  currentUser : "",
  token : "",
  userId: ""
}

// user action slice
const userActionsSlice = createSlice({
  name: 'userActions',
  initialState,
  reducers: {
    userLogin: {
      reducer(state, action) {
        state.isLoggedIn = true
        const {username, token, isAdmin, userId} = action.payload
        state.currentUser = username
        state.token = token
        state.isAdmin = isAdmin
        state.userId = userId
        console.log(state.currentUser)
        console.log(state.isLoggedIn) 
        console.log(state.isAdmin);
      },
      prepare(username, token, isAdmin, userId) {
        return {
          payload: {username, token, isAdmin, userId}
        }
      }
    },
    userLogout: (state, action) => {
      state.isLoggedIn = false
	  state.isAdmin = false
	  state.token = ""
	  state.currentUser = ""
    }
  }
})

// export const selectIsUserAdmin = createSelector(state => state.isAdmin)
export const {userLogin, userLogout} = userActionsSlice.actions
export default userActionsSlice.reducer
