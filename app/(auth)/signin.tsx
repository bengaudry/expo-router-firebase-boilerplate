import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Link, useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "@firebase/auth";

import { useColors } from "@/hooks";
import APP_INFO from "@/constants/appInfo";
import { isEmailFormatCorrect } from "@/lib";
import { getFirebaseAuth } from "@/firebase";
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
  const { primaryTextColor } = useColors();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignin = async () => {
    if (!isEmailFormatCorrect(email)) return;
    try {
      const res = await signInWithEmailAndPassword(
        getFirebaseAuth(),
        email,
        password
      );
      console.info("Signed in user :", res.user);
    } catch (err) {
      console.error("Error while signin in :", err);
    }

    push("/home");
  };

  return (
    <AuthWrapper>
      <View style={styles.MainContainer}>
        <AuthHeader
          title={`Sign in to ${APP_INFO.name}`}
          subtitle="Welcome back! Please sign in to continue"
        />

        <InputContainer>
          <TextInput
            label="Email address"
            placeholder="yourname@example.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoFocus
          />
          <TextInput
            label="Password"
            placeholder="***********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </InputContainer>
        <CTA
          content="Sign in"
          onPress={handleSignin}
          style={styles.Cta}
          disabled={
            email.length === 0 ||
            !isEmailFormatCorrect(email) ||
            password.length === 0
          }
        />

        <Link
          href={"/register"}
          style={[{ color: primaryTextColor }, styles.ForgotPassLink]}
        >
          Forgot password ?
        </Link>
      </View>
      <AuthFooter redirectUri="register" />
    </AuthWrapper>
  );
}

const styles = StyleSheet.create({
  MainContainer: { paddingHorizontal: 24, paddingBottom: 32 },
  ForgotPassLink: {
    fontWeight: "500",
    textAlign: "right",
  },
  Cta: { marginTop: 32, marginBottom: 8 },
});
