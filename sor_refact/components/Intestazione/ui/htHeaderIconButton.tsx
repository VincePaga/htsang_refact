import React from "react";
import {
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  ImageStyle,
} from "react-native";

type HeaderIconButtonProps = {
  source: ImageSourcePropType;
  onPress: () => void;
  containerStyle?: StyleProp<ViewStyle>;
  imageStyle?: StyleProp<ImageStyle>;
};

export default function HeaderIconButton({
  source,
  onPress,
  containerStyle,
  imageStyle,
}: HeaderIconButtonProps) {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image source={source} style={imageStyle} />
    </TouchableOpacity>
  );
}
