import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import AssetProvider from "../store/MediaProvider";

export default function RootLayout() {
  return (
    <AssetProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerTintColor: "black", headerTitleAlign: "center" }}>
          <Stack.Screen name="index" options={{ title: "Gallery", headerStyle: { backgroundColor: "orange" } }} />
          <Stack.Screen name="camera" options={{ headerShown: false }} />
          <Stack.Screen
            name="details"
            options={{
              title: "Details",
              headerShown: true,
              presentation: "formSheet",
              sheetAllowedDetents: [0.4],
              sheetCornerRadius: 50,
              headerStyle: {
                backgroundColor: "white",
              },
            }}
          />
          <Stack.Screen name="pager" options={{ title: "Pager" }} />
        </Stack>
      </SafeAreaProvider>
    </AssetProvider>
  );
}
