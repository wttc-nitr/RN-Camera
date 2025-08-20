import {
  CameraCapturedPicture,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  View,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import path from "path";
import * as FileSystem from "expo-file-system";

export default function CameraScreen() {
  const [permission, requestCameraPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  // request for camera permission
  useEffect(() => {
    // permission have been fetched & not granted & can ask again
    if (permission && !permission.granted && permission.canAskAgain) {
      requestCameraPermission();
    }
  }, [permission]);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const takePicture = async () => {
    const res = await camera.current?.takePictureAsync();
    console.log(res);
    setPicture(res);
  };

  const saveFile = async (uri: string) => {
    const fileName = path.parse(uri).base;
    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + fileName,
    });
    setPicture(undefined);
    // router.back()
  };

  // if permission isn't granted, display a spinner
  if (!permission?.granted) {
    return <ActivityIndicator />;
  }

  if (picture) {
    return (
      <View>
        <Image
          source={{ uri: picture.uri }}
          style={{ width: "100%", height: "100%" }}
        />
        <View style={{ padding: 10, position: "absolute", top: 40, right: 20 }}>
          <Button title="Save" onPress={() => saveFile(picture.uri)} />
        </View>
        <MaterialIcons
          name="close"
          size={35}
          color={"white"}
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => {
            setPicture(undefined);
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <CameraView ref={camera} style={styles.camera} facing={facing} />
      <MaterialIcons
        name="close"
        color={"white"}
        style={styles.close}
        size={30}
        onPress={() => router.back()}
      />
      <View style={styles.footer}>
        <View />
        <Pressable style={styles.recordButton} onPress={takePicture} />
        <MaterialIcons
          name="flip-camera-android"
          size={24}
          color={"white"}
          onPress={toggleCameraFacing}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: "100%",
    height: "100%",
  },
  close: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "#FFFFFF40",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginTop: "auto",
    padding: 20,
    paddingBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#00000050",
  },
  recordButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "white",
  },
});
