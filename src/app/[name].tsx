import { router, Stack } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Alert, View, ToastAndroid } from "react-native";
import * as FileSystem from "expo-file-system";
import { MaterialIcons } from "@expo/vector-icons";
import { getMediaType } from "../utils/media";
import ImageViewer from "../components/ImageViewer";
import VideoPlayer from "../components/VideoPlayer";
import * as MediaLibrary from "expo-media-library";

export default function ImageScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const fullURI = FileSystem.documentDirectory + name;

  const onDelete = async () => {
    await FileSystem.deleteAsync(fullURI);
    ToastAndroid.show("Deleted", ToastAndroid.SHORT);
    router.back();
  };

  const type = getMediaType(fullURI);

  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();

  const onSave = async () => {
    if (permissionResponse?.status !== "granted") {
      if (permissionResponse?.canAskAgain) await requestPermission();
      else Alert.alert("allow storage permission");
    }

    const asset = await MediaLibrary.createAssetAsync(fullURI);
    ToastAndroid.show("Saved to phone storage", ToastAndroid.SHORT);
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {type === "image" && <ImageViewer uri={fullURI} />}
      {type === "video" && <VideoPlayer uri={fullURI} />}
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
                onPress={onSave}
              />
            </View>
          ),
        }}
      />
    </View>
  );
}
