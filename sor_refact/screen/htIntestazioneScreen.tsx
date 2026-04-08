import React from "react";
import AppHeader from "../components/Intestazione/layout/htAppHeader";

type IntestazioneProps = {
  isHome?: boolean;
  isSettings?: boolean;
  isLogin?: boolean;
  showDirectListButton?: boolean;
  navigation: any;
  aggiorna?: () => void;
};

export function Intestazione({
  isHome,
  isSettings,
  isLogin,
  showDirectListButton,
  navigation,
  aggiorna,
}: IntestazioneProps) {
  return (
    <AppHeader
      isHome={isHome}
      isSettings={isSettings}
      isLogin={isLogin}
      showDirectListButton={showDirectListButton}
      navigation={navigation}
      aggiorna={aggiorna}
    />
  );
}
