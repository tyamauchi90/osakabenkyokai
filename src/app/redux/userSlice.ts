import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../type/signUpType";

const userInitialState = {
  isSignedIn: false, // サインインしていない場合はnull
  isLoading: true, // サインイン/サインアップのリクエスト中はtrue
  error: null, // エラーメッセージを格納
};

// スライスを作成
export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    // サインインアクション
    signedUp: (state) => {
      state.isSignedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    // サインアップエラーアクション
    signedUpFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // エラーが発生した場合の処理
    },
    // サインインアクション
    signInSuccess: (state) => {
      state.isSignedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    // サインインエラーアクション
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // エラーが発生した場合の処理
    },
    // サインアウトアクション
    signedOut: (state) => {
      state.isSignedIn = false;
      state.isLoading = false;
    },
  },
});

// アクションをエクスポート
export const {
  signedUp,
  signedUpFailure,
  signInSuccess,
  signInFailure,
  signedOut,
} = userSlice.actions;

// リデューサーをエクスポート
export default userSlice.reducer;
