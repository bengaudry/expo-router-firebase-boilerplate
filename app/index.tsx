import { SafeAreaView, StyleSheet, View } from "react-native";
import { Link, Redirect, useRouter } from "expo-router";

import APP_INFO from "@/constants/appInfo";
import { useAuth } from "@/hooks";
import { AuthHeader, CTA, Text } from "@/components";

export default () => {
  const { user, loading } = useAuth();
  const { push } = useRouter();

  if (user && !loading) return <Redirect href="/home" />;

  return (
    <SafeAreaView>
      <View style={styles.MainContainer}>
        <AuthHeader
          title={`Welcome to ${APP_INFO.name}`}
          subtitle="Let's get you started !"
        />
        <View>
          <CTA
            content="Create my account"
            onPress={() => push("/(auth)/register")}
          />
          <Text style={styles.Subtitle} secondary>
            Already have an account ?{" "}
            <Link href="/(auth)/signin">
              <Text>Sign in</Text>
            </Link>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
    paddingTop: 64,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  Subtitle: { fontWeight: "500", textAlign: "center", marginTop: 16 },
});
