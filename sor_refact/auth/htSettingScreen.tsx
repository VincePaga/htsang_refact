import React from "react";
import { View, Text, TouchableHighlight, TextInput } from "react-native";
import { Intestazione } from ".././components/Intestazione";
import MessageModal from "../components/Login/modals/MessageModal";
import { useSetting } from "../hooks/htUseSetting";
import { styles } from "../styles/settingStyles";

type SettingScreenProps = {
  navigation: any;
  route: any;
};

export default function SettingScreen({
  navigation,
  route,
}: SettingScreenProps) {
  const {
    ip,
    setIp,
    porta,
    setPorta,
    url,
    setUrl,
    modalVisible,
    setModalVisible,
    handleSave,
  } = useSetting();

  const handleCloseModal = () => {
    setModalVisible(false);
    route?.params?.onGoBack?.();
    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <Intestazione
        isHome={false}
        navigation={navigation}
        IsSettings={true}
      />

      <MessageModal
        visible={modalVisible}
        title="INFORMAZIONE"
        message="I dati sono stati salvati"
        onClose={handleCloseModal}
      />

      <View style={styles.corpo}>
        <Text style={{ fontSize: 46, color: "#2981ba", marginBottom: 30 }}>
          Parametri Server
        </Text>

        <View
          style={{
            justifyContent: "flex-start",
            alignItems: "center",
            height: 400,
            width: 400,
          }}
        >
          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Indirizzo Server."
              placeholderTextColor="#003f5c"
              value={ip}
              onChangeText={setIp}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Porta Server."
              placeholderTextColor="#003f5c"
              value={porta}
              onChangeText={setPorta}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              style={styles.inputText}
              placeholder="Url."
              placeholderTextColor="#003f5c"
              value={url}
              onChangeText={setUrl}
            />
          </View>

          <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
            <TouchableHighlight
              style={styles.Btn}
              underlayColor="#36a4eb"
              onPress={handleSave}
            >
              <Text style={{ color: "white" }}>SALVA</Text>
            </TouchableHighlight>

            <View style={{ width: 50 }} />

            <TouchableHighlight
              style={styles.Btn}
              underlayColor="#36a4eb"
              onPress={() => navigation.goBack()}
            >
              <Text style={{ color: "white" }}>ANNULLA</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
}
