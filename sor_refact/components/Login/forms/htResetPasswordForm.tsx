import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../styles/loginStyles";

type ResetPasswordFormProps = {
  resetPwd: string;
  resetPwd2: string;
  resetPincode: string;
  loading: boolean;
  onChangeResetPwd: (value: string) => void;
  onChangeResetPwd2: (value: string) => void;
  onChangeResetPincode: (value: string) => void;
  onSubmit: () => void;
  onClose: () => void;
};

export default function ResetPasswordForm({
  resetPwd,
  resetPwd2,
  resetPincode,
  loading,
  onChangeResetPwd,
  onChangeResetPwd2,
  onChangeResetPincode,
  onSubmit,
  onClose,
}: ResetPasswordFormProps) {
  return (
    <View style={styles.resetPopup}>
      <View style={styles.resetContainer}>
        <View style={styles.resetTitleWrapper}>
          <View>
            <Text style={styles.resetTitle}>RESET PASSWORD</Text>
          </View>
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            value={resetPwd}
            editable={!loading}
            onChangeText={onChangeResetPwd}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Ripeti Password..."
            placeholderTextColor="#003f5c"
            value={resetPwd2}
            editable={!loading}
            onChangeText={onChangeResetPwd2}
          />
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            keyboardType="numeric"
            placeholder="PINCODE..."
            placeholderTextColor="#003f5c"
            value={resetPincode}
            editable={!loading}
            onChangeText={onChangeResetPincode}
          />
        </View>

        {loading ? (
          <View style={styles.centeredView}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <View style={styles.loadingPlaceholder} />
        )}

        <View style={styles.resetButtonsRow}>
          <TouchableHighlight
            style={styles.loginBtn}
            underlayColor="#36a4eb"
            onPress={onSubmit}
          >
            <Text style={styles.loginText}>RESET</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.loginBtn}
            underlayColor="#36a4eb"
            onPress={onClose}
          >
            <Text style={styles.loginText}>CHIUDI</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
}