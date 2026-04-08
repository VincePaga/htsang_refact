import { buildBaseUrl } from "../htBuildUrl"; 

export async function fetchClientLogo(
  ip: string,
  porta: string,
  url: string,
): Promise<string> {
  try {
    const indirizzo = buildBaseUrl(ip, porta, url);
    const response = await fetch(`${indirizzo}/logo_cliente`);
    if (!response.ok) return "";
    const json = await response.json();
    if (!json.tipo || !json.valore) return "";

    return `data:image/${json.tipo};base64,${json.valore}`;
  } catch {
    return "";
  }
}
