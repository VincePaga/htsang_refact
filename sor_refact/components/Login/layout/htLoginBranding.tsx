import React from "react";
import { Image, View } from "react-native";
import { styles } from "../../../styles/loginStyles";

type LoginBrandingProps = {
  logocliente: string;
  onLogoError: () => void;
};

export default function LoginBranding({
  logocliente,
  onLogoError,
}: LoginBrandingProps) {
  return (
    <>
      <View style={styles.clientLogoWrapper}>
        {logocliente !== "" ? (
          <Image
            style={styles.clientLogo}
            source={{ uri: logocliente }}
            onError={onLogoError}
          />
        ) : null}
      </View>

      <View style={styles.mainBrandWrapper}>
        <Image
          source={require("../../../../img/logo_htsang_corpo.png")}
          style={styles.mainBrandLogo}
        />
      </View>

      <View style={styles.bottomBrandRow}>
        <View style={styles.bottomBrandLeft}>
          <Image
            source={require("../../../../img/logo_ht.png")}
            style={styles.bottomBrandLeftLogo}
          />
        </View>

        <View>
          <Image
            source={require("../../../../img/logo_ht2.png")}
            style={styles.bottomBrandRightLogo}
          />
        </View>
      </View>
    </>
  );
}
