import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { initialUserState } from "../type/signUpType";

const userInitialState = {
  user: null, // サインインしていない場合はnull
  isLoading: false, // サインイン/サインアップのリクエスト中はtrue
  error: null, // エラーメッセージを格納
};

// スライスを作成
export const userSlice = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    // サインインアクション
    signInSuccess: (state, action) => {
      state.user = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    // サインインエラー
    signInFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload; // エラーが発生した場合の処理
    },
    // サインアウトアクション
    signOut: (state) => {
      state.isLoading = false;
      state.user = null;
    },
  },
});

// アクションをエクスポート
export const { signInSuccess, signInFailure, signOut } = userSlice.actions;

// リデューサーをエクスポート
export default userSlice.reducer;
