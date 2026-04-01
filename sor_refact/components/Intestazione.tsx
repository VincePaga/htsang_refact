import React from "react";
import AppHeader from "./Intestazione/layout/htAppHeader";

type IntestazioneProps = {
  isHome?: boolean;
  IsSettings?: boolean;
  isLogin?: boolean;
  showDirectListButton?: boolean;
  navigation: any;
  aggiorna?: () => void;
};

export function Intestazione({
  isHome,
  IsSettings,
  isLogin,
  showDirectListButton,
  navigation,
  aggiorna,
}: IntestazioneProps) {
  return (
    <AppHeader
      isHome={isHome}
      isSettings={IsSettings}
      isLogin={isLogin}
      showDirectListButton={showDirectListButton}
      navigation={navigation}
      aggiorna={aggiorna}
    />
  );
}
