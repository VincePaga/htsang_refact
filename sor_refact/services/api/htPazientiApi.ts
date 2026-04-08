import { buildBaseUrl } from "../htBuildUrl";
import { PazienteItem } from "../../types/htPaziente";

export async function fetchListaRicoverati(
  ip: string,
  porta: string,
  url: string,
): Promise<PazienteItem[]> {
  const indirizzo = buildBaseUrl(ip, porta, url);
  const response = await fetch(`${indirizzo}/lista_ricoverati`);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}
