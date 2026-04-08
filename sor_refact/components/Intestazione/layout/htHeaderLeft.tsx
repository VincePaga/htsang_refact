import React from "react";
import { View, Image } from "react-native";
import HeaderIconButton from "../ui/htHeaderIconButton";
import HeaderTextButton from "../ui/htHeaderTextButton";
import { headerStyles } from "../../../styles/intestazioneStyles";

type HeaderLeftProps = {
  isHome?: boolean;
  isSettings?: boolean;
  isLogin?: boolean;
  showDirectListButton?: boolean;
  navigation: any;
};

export default function HeaderLeft({
  isHome,
  isSettings,
  isLogin,
  showDirectListButton,
  navigation,
}: HeaderLeftProps) {
  return (
    <View style={headerStyles.leftContainer}>
      {isHome ? (
        <HeaderIconButton
          source={require("../../../../img/menu.png")}
          containerStyle={headerStyles.leftIconSpacing}
          imageStyle={headerStyles.icon30}
          onPress={() => navigation.openDrawer()}
        />
      ) : isSettings || isLogin ? (
        <View style={headerStyles.leftIconSpacing}>
          <Image
            source={require("../../../../img/setting_vuoto.png")}
            style={headerStyles.icon25}
          />
        </View>
      ) : (
        <HeaderIconButton
          source={require("../../../../img/back.png")}
          containerStyle={headerStyles.backButton}
          imageStyle={headerStyles.backIcon}
          onPress={() => navigation.goBack()}
        />
      )}

      {!isHome && !isSettings && !isLogin && showDirectListButton ? (
        <HeaderTextButton title="Lista" onPress={() => navigation.popToTop()} />
      ) : null}
    </View>
  );
}
