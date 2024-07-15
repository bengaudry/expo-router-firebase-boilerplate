import { useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { CTA, AuthHeader, AuthWrapper } from "@/components";
import { FIREBASE_CONFIG, getFirebaseAuth } from "@/firebase";
import { Text } from "@/components";
import { Redirect, useRouter } from "expo-router";
import Toast from "react-native-toast-message";
import { onAuthStateChanged, sendEmailVerification } from "@firebase/auth";
import { useAuth } from "@/hooks";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";

export default function SignInPage() {
  const { user } = useAuth();
  const { replace } = useRouter();

  const [sendEmail, loading, error] = useVerifyEmail();

  if (user?.emailVerified) replace("/home");
  
  useEffect(() => {
    if (user?.emailVerified) return replace("/home");
    sendEmail(user, () => {
      Toast.show({
        type: "info",
        text1: "Email sent",
      });
    });
  }, [user]);

  useEffect(() => {
    if (error) {
      Toast.show({
        text1: "Error sending email",
        text2: error,
      });
    }
  }, [error]);

  return (
    <AuthWrapper>
      <View style={styles.MainContainer}>
        <AuthHeader
          title="Check your inbox"
          subtitle={`An email has been sent to ${user?.email}. Please click on the link to verify your email.`}
        />

        <CTA
          content="I have verified my email"
          onPress={() => {
            if (!user) return;

            user.reload();
            if (user.emailVerified) {
              replace("/home");
            } else {
              Toast.show({
                type: "error",
                text1: "Error",
                text2: "Please verify your email first",
              });
            }
          }}
          style={styles.Cta}
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
