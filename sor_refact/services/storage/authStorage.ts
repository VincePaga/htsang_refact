import AsyncStorage from "@react-native-async-storage/async-storage";

export type ServerConfig = {
  ip: string;
  porta: string;
  url: string;
};

export async function getServerConfig(): Promise<ServerConfig> {
  try {
    const server = await AsyncStorage.getItem("server");

    if (!server) {
      return {
        ip: "",
        porta: "",
        url: "",
      };
    }

    const item = JSON.parse(server);

    return {
      ip: item?.ip ?? "",
      porta: item?.porta ?? "",
      url: item?.url ?? "",
    };
  } catch (error) {
    return {
      ip: "",
      porta: "",
      url: "",
    };
  }
}

export async function saveOperatorCode(opecod: string): Promise<void> {
  const obj = { opecod };
  await AsyncStorage.mergeItem("dati", JSON.stringify(obj));
}

export async function clearAuthData(): Promise<void> {
  await AsyncStorage.removeItem("dati");
}