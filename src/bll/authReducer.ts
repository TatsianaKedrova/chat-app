import {firestoreDataBase, ref} from './../firebaseFirestore/firebaseConfig';
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

export type SignedInUserType = {
  displayName: string | null | undefined;
  phoneNumber: string | null;
  photoURL: string | null | undefined;
  uid: string;
};

type InitialStateType = {
  isRegistered: boolean;
  user: SignedInUserType | null;
  isLoading: boolean;
};

export const initialState: InitialStateType = {
  isRegistered: false,
  user: {
    displayName: null,
    phoneNumber: null,
    photoURL: null,
    uid: '',
  },
  isLoading: false,
};

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  (
    params: {
      phoneNumber: string | null;
      uid: string;
      displayName: string | null;
      photoURL: string | null;
    },
    thunkAPI,
  ) => {
    return {user: params};
  },
);

export const registerUserTC = createAsyncThunk(
  'auth/registerUser',
  async (
    param: {displayName: string | null; photoURL: string | null},
    thunkAPI,
  ) => {
    try {
      const update = {
        displayName: param.displayName,
        photoURL: param.photoURL,
      };
      await auth().currentUser?.updateProfile(update);
      let equalID;
      let docId;

      await ref.get().then(querySnapshot => {
        equalID = querySnapshot.docs.find(doc => {
          docId = doc.id;
          const docData = doc.data();
          return docData.userId === auth().currentUser?.uid;
        });
        const equalUserId = equalID?.data().userId;
        console.log('equalUserId: ', equalUserId);
      });
      if (equalID) {
        console.log('id: ', equalID);
        console.log('docID: ', docId);
        console.log(
          `there exist already a document with such ID: ${equalID}. No need to create one more doc!`,
        );
        await ref
          .doc(docId)
          .update({
            fullname: param.displayName,
            avatar: param.photoURL,
          })
          .then(res => {
            console.log('User updated!: ', res);
          });
      } else {
        console.log('id: ', equalID);
        console.log(
          "It seems this user is new so let's add him to our collection!",
        );
        firestoreDataBase.collection('users').add({
          fullname: param.displayName,
          avatar: param.photoURL,
          phoneNumber: auth().currentUser?.phoneNumber,
          userId: auth().currentUser?.uid,
        });
        thunkAPI.dispatch(setIsRegistered({isRegistered: true}));
      }
      return {displayName: param.displayName, photoURL: param.photoURL};
    } catch (e) {
      console.log('User is not registered: ', e);
    }
  },
);

//redux toolkit createSlice method
const slice = createSlice({
  initialState,
  name: 'auth',
  reducers: {
    setIsRegistered(state, action: PayloadAction<{isRegistered: boolean}>) {
      state.isRegistered = action.payload.isRegistered;
    },
    setIsLoading(state, action: PayloadAction<{isLoading: boolean}>) {
      state.isLoading = action.payload.isLoading;
    },

    setUserAuth(state, action: PayloadAction<{user: SignedInUserType | null}>) {
      state.user = action.payload.user;
    },
  },
  extraReducers: builder => {
    builder.addCase(registerUserTC.fulfilled, (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          displayName: action.payload?.displayName,
          photoURL: action.payload?.photoURL,
        };
      }
    }),
      builder.addCase(signInUser.fulfilled, (state, action) => {
        if (state.user) {
          state.user = action.payload!.user;
        }
      });
  },
});

//reducer
export const authReducer = slice.reducer;

//action creators
export const {setIsRegistered, setIsLoading, setUserAuth} = slice.actions;
