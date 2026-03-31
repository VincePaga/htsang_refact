import React from "react";
import { TouchableOpacity, Text, StyleProp, ViewStyle } from "react-native";
import { headerStyles } from "../../../styles/intestazioneStyles";

type HeaderTextButtonProps = {
  title: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function HeaderTextButton({
  title,
  onPress,
  style,
}: HeaderTextButtonProps) {
  return (
    <TouchableOpacity style={[headerStyles.listButton, style]} onPress={onPress}>
      <Text style={headerStyles.listButtonText}>{title}</Text>
    </TouchableOpacity>
  );
}