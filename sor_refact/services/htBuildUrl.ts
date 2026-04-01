export function buildBaseUrl(ip: string, porta: string, url: string): string {
  let indirizzo = `http://${ip}`;
  if (porta !== "") indirizzo += `:${porta}`;
  if (url !== "") indirizzo += `/${url}`;
  return indirizzo;
}
