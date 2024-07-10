import { PropsWithChildren } from "react";
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAuth, useColors } from "@/hooks";
import { Text, Title } from ".";

export function AuthHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <View style={{ paddingTop: 64 }}>
      <Image
        style={styles.Icon}
        source={require("../res/icon.png")}
        width={55}
        height={55}
        resizeMode="cover"
      />

      <Title>{title}</Title>
      <Title heading="subtitle">{subtitle}</Title>
    </View>
  );
}

export function AuthFooter({
  redirectUri,
}: {
  redirectUri: "signin" | "register";
}) {
  const { border, subtleBackground } = useColors();

  const texts =
    redirectUri === "register"
      ? {
          desc: "Don't have an account?",
          link: "Register",
        }
      : {
          desc: "Already have an account?",
          link: "Sign in",
        };

  return (
    <View
      style={[
        { backgroundColor: subtleBackground, borderColor: border },
        styles.Footer,
      ]}
    >
      <Text style={[styles.NoAccountPrompt]} secondary>
        {texts.desc}{" "}
        <Link replace href={`/${redirectUri}`}>
          <Text>{texts.link}</Text>
        </Link>
      </Text>
    </View>
  );
}

export function AuthWrapper({ children }: PropsWithChildren) {
  const { loading } = useAuth();

  return (
    <SafeAreaView
      edges={{
        top: "off",
        left: "additive",
        right: "additive",
        bottom: "off",
      }}
    >
      <StatusBar style="dark" />
      <View style={{ height: "100%" }}>
        <ScrollView
          style={{ height: "100%" }}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <KeyboardAvoidingView
            contentContainerStyle={styles.KeyboardAvoidingView}
            behavior="position"
          >
            {children}
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Icon: {
    borderRadius: 12,
    width: 55,
    height: 55,
    marginHorizontal: "auto",
    marginBottom: 16,
  },

  NoAccountPrompt: {
    fontWeight: "500",
    textAlign: "center",
  },
  Footer: {
    padding: 24,
    paddingBottom: 64,
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    width: "100%",
  },
  KeyboardAvoidingView: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
});
