import React from "react";
import { View, Image } from "react-native";
import HeaderIconButton from "../ui/HeaderIconButton";
import { headerStyles } from "../../../styles/intestazioneStyles";

type HeaderRightProps = {
  isSettings?: boolean;
  navigation: any;
  onSettingsGoBack?: () => void;
};

export default function HeaderRight({
  isSettings,
  navigation,
  onSettingsGoBack,
}: HeaderRightProps) {
  if (isSettings) {
    return (
      <View style={headerStyles.emptyRightContainer}>
        <Image
          source={require("../../../../img/setting_vuoto.png")}
          style={headerStyles.icon30}
        />
      </View>
    );
  }

  return (
    <HeaderIconButton
      source={require("../../../../img/setting.png")}
      containerStyle={headerStyles.rightButton}
      imageStyle={headerStyles.icon30}
      onPress={() =>
        navigation.navigate("Settings", {
          onGoBack: onSettingsGoBack,
        })
      }
    />
  );
}
