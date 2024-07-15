import { SafeAreaView, ScrollView } from "react-native";

import { useAuth } from "@/hooks";
import { CTA, TextInput, Title } from "@/components";
import { Link } from "expo-router";

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
        {!user?.emailVerified && <Link href="/check-email">Check email</Link>}
        <CTA content="Sign out" type="danger" onPress={signOut} />
      </ScrollView>
    </SafeAreaView>
  );
}
