import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";

import { isEmailFormatCorrect } from "@/lib";
import {
  CTA,
  InputContainer,
  TextInput,
  AuthHeader,
  AuthWrapper,
} from "@/components";
import { useResetPassword } from "@/hooks/useResetPassword";
import Toast from "react-native-toast-message";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [resetPassword, loading, error] = useResetPassword();

  const handleReset = () => {
    resetPassword(email, () =>
      Toast.show({
        type: "info",
        text1: "Email has been sent",
        text2: "Don't forget to check your spam",
      })
    );
  };

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: "Error",
        text2: error,
      });
    }
  }, [error]);

  return (
    <AuthWrapper>
      <View style={styles.MainContainer}>
        <AuthHeader
          title={`Forgot pass ?`}
          subtitle="Let's send you an email"
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
        </InputContainer>
        <CTA
          content="Reset my password"
          onPress={handleReset}
          style={styles.Cta}
          loading={loading}
          disabled={email.length === 0 || !isEmailFormatCorrect(email)}
        />
      </View>
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
