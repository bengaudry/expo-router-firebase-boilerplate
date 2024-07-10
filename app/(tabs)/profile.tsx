import { SafeAreaView, ScrollView } from "react-native";

import { useAuth } from "@/hooks";
import { CTA, TextInput, Title } from "@/components";

export default function ListPage() {
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
        <Title heading="screen">Profile</Title>
        <TextInput
          label="Email"
          readOnly
          value={user?.email ?? ""}
          style={{ marginBottom: 16 }}
        />
        <CTA content="Sign out" type="danger" onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}
