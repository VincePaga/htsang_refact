import { buildBaseUrl } from "../htBuildUrl"; 

export async function fetchClientLogo(
  ip: string,
  porta: string,
  url: string,
): Promise<string> {
  try {
    const indirizzo = buildBaseUrl(ip, porta, url);
    const response = await fetch(`${indirizzo}/logo_cliente`);
    const json = await response.json();

    return `data:image/${json.tipo};base64,${json.valore}`;
  } catch {
    return "data:image/png;base64,";
  }
}
