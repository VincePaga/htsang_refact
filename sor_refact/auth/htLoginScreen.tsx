import React from "react";
import { View } from "react-native";
import { Intestazione } from "../components/Intestazione";
import LoginForm from "../components/Login/forms/LoginForm";
import LoginBranding from "../components/Login/layout/LoginBranding";
import MessageModal from "../components/Login/modals/MessageModal";
import ResetPasswordModal from "../components/Login/modals/ResetPasswordModal";
import { useLogin } from "../hooks/htUseLogin";
import { styles } from "../styles/loginStyles";

type LoginScreenProps = {
  navigation: any;
};

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    logocliente,
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
    setLogocliente,
  } = useLogin({ navigation });

  return (
    <View style={{ flex: 1 }}>
      <Intestazione
        isHome={false}
        navigation={navigation}
        IsSettings={false}
        isLogin={true}
        aggiorna={loadServerParams}
      />

      <ResetPasswordModal
        visible={modalResetVisible}
        onClose={() => setModalResetVisible(false)}
        resetPwd={resetPwd}
        resetPwd2={resetPwd2}
        resetPincode={resetPincode}
        loading={resetIsLoading}
        onChangeResetPwd={setResetPwd}
        onChangeResetPwd2={setResetPwd2}
        onChangeResetPincode={setResetPincode}
        onSubmit={handleResetPassword}
        nestedMessageVisible={modalVisible}
        nestedMessageTitle={titoloMessaggio}
        nestedMessageText={messaggio}
        onCloseNestedMessage={() => setModalVisible(false)}
      />

      <MessageModal
        visible={modalVisible && !modalResetVisible}
        title={titoloMessaggio}
        message={messaggio}
        onClose={() => setModalVisible(false)}
      />

      <View style={styles.contentWrapper}>
        <View style={styles.columnWrapper}>
          <LoginBranding
            logocliente={logocliente}
            onLogoError={() => setLogocliente("data:image/png;base64,")}
          />

          <LoginForm
            email={email}
            password={password}
            loading={isLoading}
            onChangeEmail={setEmail}
            onChangePassword={setPassword}
            onSubmit={handleLogin}
          />
        </View>
      </View>
    </View>
  );
}