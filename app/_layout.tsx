import { Stack } from "expo-router";

export default function StackLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
        animation: "ios",
        animationDuration: 300,
        contentStyle: {
          backgroundColor: "#ffffff",
        },
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="(auth)/signin"
        options={{
          headerShown: true,
          title: "Sign in",
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
        }}
      />
      <Stack.Screen
        name="(auth)/register"
        options={{
          headerShown: true,
          title: "Register",
          headerBackButtonMenuEnabled: true,
          headerStyle: {
            backgroundColor: "white",
          },
          headerTintColor: "black",
        }}
      />
    </Stack>
  );
}
