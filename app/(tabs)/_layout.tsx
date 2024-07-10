import { Redirect, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { useAuth } from "@/hooks";

export default function TabsLayout() {
  const { user, loading } = useAuth();

  if (!user && !loading) return <Redirect href="/" />;

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, ...props }) => (
            <Ionicons name={focused ? "home" : "home-outline"} {...props} />
          ),
          
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, ...props }) => (
            <Ionicons name={focused ? "person" : "person-outline"} {...props} />
          ),
          
        }}
      />
    </Tabs>
  );
}
