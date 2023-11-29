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
    uid: string;
    username: string;
  };
}
