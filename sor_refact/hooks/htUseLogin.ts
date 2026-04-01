import { useCallback, useEffect, useState } from "react";
import { loginRequest, resetPasswordRequest } from "../services/api/htAuthApi";
import { fetchClientLogo } from "../services/api/htLogoService";
import {
  clearAuthData,
  getServerConfig,
  saveOperatorCode,
} from "../services/storage/htAuthStorage";

type UseLoginParams = {
  navigation: any;
};

export function useLogin({ navigation }: UseLoginParams) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [logocliente, setLogocliente] = useState("");

  const [ip, setIp] = useState("");
  const [porta, setPorta] = useState("");
  const [url, setUrl] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [titoloMessaggio, setTitoloMessaggio] = useState("");
  const [messaggio, setMessaggio] = useState("");

  const [modalResetVisible, setModalResetVisible] = useState(false);
  const [resetIsLoading, setResetIsLoading] = useState(false);
  const [resetPwd, setResetPwd] = useState("");
  const [resetPwd2, setResetPwd2] = useState("");
  const [resetPincode, setResetPincode] = useState("");

  const showMessage = useCallback((title: string, text: string) => {
    setTitoloMessaggio(title);
    setMessaggio(text);
    setModalVisible(true);
  }, []);

  const loadServerParams = useCallback(async () => {
    const server = await getServerConfig();
    setIp(server.ip);
    setPorta(server.porta);
    setUrl(server.url);

    const logo = await fetchClientLogo(server.ip, server.porta, server.url);
    setLogocliente(logo);
  }, []);

  useEffect(() => {
    loadServerParams();
  }, [loadServerParams]);

  const handleLogin = useCallback(async () => {
    if (!ip) {
      showMessage("ERRORE", "Non hai specificato l'indirizzo del server da contattare.");
      return;
    }

    setIsLoading(true);
    try {
      const json = await loginRequest({ ip, porta, url, email, password });

      switch (json.result) {
        case "ok":
          await saveOperatorCode(String(json.opecod));
          setEmail("");
          setPassword("");
          navigation.navigate("HomeApp", {
            screen: "MainMenu",
            params: { screen: "Ricoverati" },
          });
          break;

        case "reset":
          setMessaggio("");
          setModalResetVisible(true);
          break;

        default:
          await clearAuthData();
          showMessage("ERRORE", String(json.result ?? "Errore sconosciuto"));
          break;
      }
    } catch {
      showMessage("ERRORE", "Impossibile contattare il server.");
    } finally {
      setIsLoading(false);
    }
  }, [email, ip, navigation, password, porta, showMessage, url]);

  const handleResetPassword = useCallback(async () => {
    if (resetPwd !== resetPwd2) {
      showMessage("ERRORE", "Le password inserite non sono uguali");
      return;
    }

    if (resetPincode.length !== 6) {
      showMessage("ERRORE", "Il pincode dev'essere di 6 cifre");
      return;
    }

    setResetIsLoading(true);
    try {
      const json = await resetPasswordRequest({
        ip,
        porta,
        url,
        email,
        password: resetPwd,
        pincode: resetPincode,
      });

      if (json.result === "ok") {
        setTitoloMessaggio("INFORMAZIONE");
        setMessaggio("La password è stata resettata. Adesso è possibile eseguire il login");
        setModalVisible(true);
        setModalResetVisible(false);
      } else {
        showMessage("ERRORE", String(json.result ?? "Errore sconosciuto"));
      }
    } catch {
      showMessage("ERRORE", "Impossibile completare il reset password.");
    } finally {
      setResetIsLoading(false);
    }
  }, [email, ip, porta, resetPincode, resetPwd, resetPwd2, showMessage, url]);

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    logocliente,
    setLogocliente,
    modalVisible,
    setModalVisible,
    titoloMessaggio,
    messaggio,
    modalResetVisible,
    setModalResetVisible,
    resetIsLoading,
    resetPwd,
    setResetPwd,
    resetPwd2,
    setResetPwd2,
    resetPincode,
    setResetPincode,
    handleLogin,
    handleResetPassword,
    loadServerParams,
  };
}
