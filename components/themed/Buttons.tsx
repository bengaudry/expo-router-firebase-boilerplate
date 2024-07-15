import { useEffect, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  type TouchableOpacityProps,
  Text,
  type TextProps,
  View,
  TextStyle,
  ViewStyle,
  type StyleProp,
  useColorScheme,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useColors } from "@/hooks";

export function ButtonLabel({ style, ...props }: TextProps) {
  const { invertedPrimaryTextColor } = useColors();

  return (
    <Text
      style={[styles.ButtonLabel, { color: invertedPrimaryTextColor }, style]}
      {...props}
    />
  );
}

export type CTAProps = TouchableOpacityProps & {
  content: string;
  icon?: string;
  textStyle?: StyleProp<TextStyle>;
  innerStyle?: StyleProp<ViewStyle>;
  gradientColors?: Array<string>;
  loading?: boolean;
  type?: "default" | "success" | "info" | "warning" | "danger";
};

export function CTA({
  style,
  content,
  children,
  icon,
  innerStyle,
  textStyle,
  gradientColors,
  disabled,
  loading,
  type = "default",
  ...props
}: CTAProps) {
  const { shadow } = useColors();
  const scheme = useColorScheme();

  const defaultBgColors =
    scheme === "dark"
      ? ["rgba(240, 240, 240, 1)", "rgba(190, 190, 190, 1)"]
      : ["rgba(72, 72, 72, 1)", "rgba(22, 22, 22, 1)"];
  const dangerBgColors = ["rgba(219, 43, 15, 1)", "rgba(173, 34, 12, 1)"];
  const warningBgColors = ["rgba(255, 193, 7, 1)", "rgba(204, 156, 14, 1)"];
  const infoBgColors = ["rgba(0, 123, 255, 1)", "rgba(0, 87, 181, 1)"];
  const successBgColors = ["rgba(40, 167, 69, 1)", "rgba(27, 117, 48, 1)"];

  const [bgColors, setBgColors] = useState(gradientColors ?? defaultBgColors);

  useEffect(() => {
    if (type === "danger") return setBgColors(dangerBgColors);
    if (type === "warning") return setBgColors(warningBgColors);
    if (type === "info") return setBgColors(infoBgColors);
    if (type === "success") return setBgColors(successBgColors);
    return setBgColors(gradientColors ?? defaultBgColors);
  }, [type, scheme]);

  return (
    <TouchableOpacity
      style={[
        styles.CtaTouchZone,
        {
          shadowColor: shadow,
          shadowOpacity: disabled ? 0 : 0.3,
          opacity: disabled ? 0.2 : 1,
        },
        style,
      ]}
      disabled={disabled || loading}
      {...props}
    >
      <LinearGradient style={styles.CtaGradientBackground} colors={bgColors} />
      <View style={[styles.CtaLabelContainer, innerStyle]}>
        {loading ? <ActivityIndicator /> : <ButtonLabel>{content}</ButtonLabel>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  CtaTouchZone: {
    position: "relative",
    width: "100%",
    display: "flex",
    borderCurve: "continuous",
    shadowRadius: 16,
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 0,
      height: 10,
    },
  },
  CtaGradientBackground: {
    position: "absolute",
    borderRadius: 12,
    width: "100%",
    height: "100%",
  },
  CtaLabelContainer: { paddingHorizontal: 32, paddingVertical: 16 },
  ButtonLabel: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "500",
  },
});
