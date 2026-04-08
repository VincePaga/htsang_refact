import { buildBaseUrl } from "../htBuildUrl"; 

type LoginRequestParams = {
  ip: string;
  porta: string;
  url: string;
  email: string;
  password: string;
};

type ResetPasswordRequestParams = {
  ip: string;
  porta: string;
  url: string;
  email: string;
  password: string;
  pincode: string;
};

export async function loginRequest({
  ip,
  porta,
  url,
  email,
  password,
}: LoginRequestParams) {
  const indirizzo = buildBaseUrl(ip, porta, url);
  const param = JSON.stringify({ user_mail: email, passwd: password });

  const response = await fetch(`${indirizzo}/tabute_login?${param}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

export async function resetPasswordRequest({
  ip,
  porta,
  url,
  email,
  password,
  pincode,
}: ResetPasswordRequestParams) {
  const indirizzo = buildBaseUrl(ip, porta, url);
  const param = JSON.stringify({ user_mail: email, passwd: password, pincode });

  const response = await fetch(`${indirizzo}/tabute_registra_password?${param}`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}