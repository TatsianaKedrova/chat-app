import {ref} from './../firebaseFirestore/firebaseConfig';
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

export type UserType = {
  avatar: string | null;
  fullname: string;
  phoneNumber: string;
  userId: string;
};

export type UserListType = {
  users: UserType[];
  formattedPhone: string;
  isOnline: boolean;
  isLoading: boolean;
};

const initialState: UserListType = {
  users: [],
  formattedPhone: '',
  isOnline: false,
  isLoading: false,
};

export const getUsersFromDB = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    let newArray: UserType[] = [];
    let newUser = {
      avatar: '',
      phoneNumber: '',
      userId: '',
      fullname: '',
    };
    try {
      thunkAPI.dispatch(setIsLoading({isLoading: true}));
      
      (await ref.get()).docs.map(doc => {
        const eachDoc = doc.data();
        newUser = {
          avatar: eachDoc.avatar,
          phoneNumber: eachDoc.phoneNumber,
          userId: eachDoc.userId,
          fullname: eachDoc.fullname,
        };
        newArray.push(newUser);
      });
      thunkAPI.dispatch(setIsLoading({isLoading: false}));
      return {users: newArray};
    } catch (e) {
      console.log('Error: ', e);
    }
  },
);

export const setFormattedPhone = createAsyncThunk(
  'users/setPhoneFormatted',
  (formattedPhone: string) => {
    return {formattedPhone};
  },
);

const slice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    setIsLoading(state, action: PayloadAction<{isLoading: boolean}>) {
      state.isLoading = action.payload.isLoading;
    },
  },
  extraReducers: builder => {
    builder.addCase(getUsersFromDB.fulfilled, (state, action) => {
      state.users = action.payload!.users;
    }),
      builder.addCase(setFormattedPhone.fulfilled, (state, action) => {
        state.formattedPhone = action.payload.formattedPhone;
      });
  },
});

export const usersReducer = slice.reducer;

export const {setIsLoading} = slice.actions;
