export interface AuthContextType {
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export interface AuthForm {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
}

export interface LoginForm {
  email: string;
  password: string;
}