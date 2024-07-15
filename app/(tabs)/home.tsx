import {
  SafeAreaView,
  ScrollView,
  useColorScheme,
} from "react-native";

import { useAuth } from "@/hooks";
import { Text, Title } from "@/components";

export default function Home() {
  const { user } = useAuth();

  return (
    <SafeAreaView>
      <ScrollView
        style={{ height: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          paddingVertical: 32,
        }}
      >
        <Title heading="screen" style={{ marginBottom: 0 }}>
          Home
        </Title>
        <Title heading="subtitle">Welcome back {user?.displayName} !</Title>
        <Text>Color scheme : {useColorScheme()}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
