export interface OtpResponse {
  message: string;
}

export interface TokenResponse {
  token: string;
}

export interface ApiError {
  message: string;
  status: number;
}