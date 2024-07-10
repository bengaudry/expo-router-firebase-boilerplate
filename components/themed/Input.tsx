import { useState } from "react";
import {
  View,
  TextInput as NatTextInput,
  type TextInputProps,
  ViewProps,
  StyleSheet,
  StyleProp,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

import { useColors } from "@/hooks";
import { Text } from "."

export function InputContainer({ style, ...props }: ViewProps) {
  return (
    <View
      style={[{ display: "flex", flexDirection: "column", gap: 10 }, style]}
      {...props}
    />
  );
}

function HideShowPassButton({
  isVisible,
  setVisible,
}: {
  isVisible: boolean;
  setVisible: (hidden: boolean) => void;
}) {
  const { focusedBorder } = useColors();

  return (
    <TouchableOpacity
      style={{
        position: "absolute",
        right: 18,
        paddingVertical: 12,
      }}
      onPress={() => setVisible(!isVisible)}
    >
      <Feather
        name={isVisible ? "eye-off" : "eye"}
        size={18}
        color={focusedBorder}
      />
    </TouchableOpacity>
  );
}

export function TextInput({
  label,
  onFocus,
  onBlur,
  style,
  value,
  secureTextEntry,
  inputStyle,
  ...props
}: TextInputProps & { label: string; inputStyle?: StyleProp<TextStyle> }) {
  const { secondaryTextColor, border, focusedBorder } =
    useColors();

  const [focused, setFocused] = useState(false);
  const [passVisible, setPassVisible] = useState(false);

  return (
    <View style={style}>
      <Text
        style={{
          fontWeight: "500",
          marginBottom: 2,
        }}
        secondary={!focused}
      >
        {label}
      </Text>
      <View
        style={{ position: "relative", display: "flex", alignItems: "center" }}
      >
        <NatTextInput
          value={value}
          onFocus={(e) => {
            setFocused(true);
            if (onFocus) onFocus(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            if (onBlur) onBlur(e);
          }}
          secureTextEntry={
            (secureTextEntry && !passVisible) || (passVisible && !focused)
          }
          style={[
            { borderColor: focused ? focusedBorder : border },
            styles.Input,
            inputStyle,
          ]}
          placeholderTextColor={secondaryTextColor}
          {...props}
        />
        {secureTextEntry && value && value.length > 0 && focused && (
          <HideShowPassButton
            isVisible={passVisible}
            setVisible={setPassVisible}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Input: {
    width: "100%",
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 18,
    paddingVertical: 12,
    position: "relative",
  },
});
