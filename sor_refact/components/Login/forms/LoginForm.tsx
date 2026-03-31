import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { styles } from "../../../styles/loginStyles";

type LoginFormProps = {
  email: string;
  password: string;
  loading: boolean;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onSubmit: () => void;
};

export default function LoginForm({
  email,
  password,
  loading,
  onChangeEmail,
  onChangePassword,
  onSubmit,
}: LoginFormProps) {
  return (
    <View style={styles.loginFormContainer}>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          placeholderTextColor="#003f5c"
          value={email}
          onChangeText={onChangeEmail}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          value={password}
          onChangeText={onChangePassword}
        />
      </View>

      {loading ? (
        <View style={styles.centeredView}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <View />
      )}

      <TouchableHighlight
        style={styles.loginBtn}
        underlayColor="#36a4eb"
        onPress={onSubmit}
      >
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableHighlight>
    </View>
  );
}