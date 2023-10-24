export type signUpType = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export interface initialUserState {
  user: null | {
    email: string;
    isSignedIn: boolean;
    role: string;
    // payment_method_id: data.payment_method_id || "",
    uid: string;
    username: string;
  };
}
