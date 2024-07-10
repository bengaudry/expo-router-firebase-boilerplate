import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

import APP_INFO from "@/constants/appInfo";
import { isEmailFormatCorrect } from "@/lib";
import {
  CTA,
  InputContainer,
  TextInput,
  AuthFooter,
  AuthHeader,
  AuthWrapper,
} from "@/components";

export default function SignInPage() {
  const { push } = useRouter();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <AuthWrapper>
      <View style={styles.MainContainer}>
        <AuthHeader
          title={`Register to ${APP_INFO.name}`}
          subtitle="Welcome ! We need some info to continue"
        />

        <InputContainer>
          <TextInput
            label="Name"
            placeholder="John Doe"
            value={displayName}
            onChangeText={setDisplayName}
          />
          <TextInput
            label="Email address"
            placeholder="yourname@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            label="Password"
            placeholder="***********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            label="Password confirm"
            placeholder="***********"
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            secureTextEntry
          />
        </InputContainer>
        <CTA
          content="Register"
          style={styles.Cta}
          onPress={() => {
            push("/(tabs)/home")
          }}
          disabled={
            email.length === 0 ||
            !isEmailFormatCorrect(email) ||
            displayName.length === 0 ||
            password !== passwordConfirm ||
            password.length === 0
          }
        />
      </View>
      <AuthFooter redirectUri="signin" />
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  MainContainer: { paddingHorizontal: 24 },
  ForgotPassLink: {
    fontWeight: "500",
    textAlign: "right",
  },
  Cta: { marginTop: 32, marginBottom: 8 },
});
