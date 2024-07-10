import { SafeAreaView, ScrollView, TouchableOpacity } from "react-native";

import { useAuth } from "@/hooks";
import { Text, Title } from "@/components";

export default function Home() {
  const { user, signOut } = useAuth();

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
        <Title heading="screen">Home</Title>
        <Text>Welcome back {user?.displayName} !</Text>
        <TouchableOpacity onPress={signOut}>
          <Text>Sign out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
