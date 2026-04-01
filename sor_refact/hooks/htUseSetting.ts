import { useCallback, useEffect, useState } from "react";
import {
  getServerConfig,
  saveServerConfig,
} from "../services/storage/htAuthStorage";

export function useSetting() {
    const [ip, setIp] = useState("");
    const [porta, setPorta] = useState("");
    const [url, setUrl] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    
    const loadServerConfig = useCallback(async () => {
        const server = await getServerConfig();
        setIp(server.ip);
        setPorta(server.porta);
        setUrl(server.url);
    }, [])

     const handleSave = useCallback(async () => {
    await saveServerConfig({ ip, porta, url });
    setModalVisible(true);
  }, [ip, porta, url]);

  useEffect(() => {
    loadServerConfig();
  }, [loadServerConfig]);

  return {
    ip,
    setIp,
    porta,
    setPorta,
    url,
    setUrl,
    modalVisible,
    setModalVisible,
    loadServerConfig,
    handleSave,
  };
}