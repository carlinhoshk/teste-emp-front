import { createSlice, PayloadAction  } from '@reduxjs/toolkit'


interface Name {
  firstname: string,
  lastname : string
}


interface User {
  id: number
  name: Name,
  email: string,
  username: string,
  [key: string]: any;
}

interface UserState {
  value: User[]
}

const initialState: UserState = {value: []}

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setAllUsers: (state, action: PayloadAction<User[]> ) => {
        state.value = action.payload
    }
  }
})


export const { setAllUsers } = userSlice.actions

export default userSlice.reducer