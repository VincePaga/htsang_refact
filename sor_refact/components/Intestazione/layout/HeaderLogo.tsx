import React from "react";
import { View, Image } from "react-native";
import { headerStyles } from "../../../styles/intestazioneStyles";

export default function HeaderLogo() {
  return (
    <View style={headerStyles.logoContainer}>
      <Image
        source={require("../../../../img/htsang_trasparente_cooper.png")}
        style={headerStyles.logo}
      />
    </View>
  );
}