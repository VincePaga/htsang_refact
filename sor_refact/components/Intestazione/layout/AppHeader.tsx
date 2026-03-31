import React from "react";
import { View } from "react-native";
import HeaderLeft from "./HeaderLeft";
import HeaderLogo from "./HeaderLogo";
import HeaderRight from "./HeaderRight";
import { headerStyles } from "../../../styles/intestazioneStyles";

type AppHeaderProps = {
  isHome?: boolean;
  isSettings?: boolean;
  isLogin?: boolean;
  showDirectListButton?: boolean;
  navigation: any;
  aggiorna?: () => void;
};

export default function AppHeader({
  isHome,
  isSettings,
  isLogin,
  showDirectListButton,
  navigation,
  aggiorna,
}: AppHeaderProps) {
  return (
    <View style={headerStyles.container}>
      <HeaderLeft
        isHome={isHome}
        isSettings={isSettings}
        isLogin={isLogin}
        showDirectListButton={showDirectListButton}
        navigation={navigation}
      />

      <HeaderLogo />

      <HeaderRight
        isSettings={isSettings}
        navigation={navigation}
        onSettingsGoBack={aggiorna}
      />
    </View>
  );
}