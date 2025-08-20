import { router, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Image, View } from "react-native";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";

export default function ImageScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const fullURI = FileSystem.documentDirectory + name;
  const onDelete = async () => {
    await FileSystem.deleteAsync(fullURI);
    router.back();
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        source={{ uri: fullURI }}
        style={{ width: "100%", height: "100%" }}
      />
      <Stack.Screen
        options={{
          title: "Media",
          headerRight: () => (
            <View style={{ flexDirection: "row", gap: 5 }}>
              <MaterialIcons
                name="delete"
                size={26}
                color={"crimson"}
                onPress={onDelete}
              />
              <MaterialIcons
                name="save"
                size={26}
                color={"dimgray"}
                onPress={() => {}}
              />
            </View>
          ),
        }}
      />
    </View>
  );
}
