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

function buildBaseUrl(ip: string, porta: string, url: string): string {
  let indirizzo = `http://${ip}`;
  if (porta !== "") indirizzo += `:${porta}`;
  if (url !== "") indirizzo += `/${url}`;
  return indirizzo;
}

export async function loginRequest({
  ip,
  porta,
  url,
  email,
  password,
}: LoginRequestParams) {
  const indirizzo = buildBaseUrl(ip, porta, url);
  const param = `?{"user_mail":"${email}","passwd":"${password}"}`;

  const response = await fetch(`${indirizzo}/tabute_login${param}`);
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
  const param = `?{"user_mail":"${email}","passwd":"${password}","pincode":"${pincode}"}`;

  const response = await fetch(`${indirizzo}/tabute_registra_password${param}`);
  return response.json();
}