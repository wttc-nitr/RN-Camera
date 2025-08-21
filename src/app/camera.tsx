import {
  CameraCapturedPicture,
  CameraMode,
  CameraType,
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  View,
  Button,
  Alert,
  ToastAndroid,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import path from "path";
import * as FileSystem from "expo-file-system";
import VideoPlayer from "../components/VideoPlayer";
import ImageViewer from "../components/ImageViewer";

export default function CameraScreen() {
  const [permissionCam, requestCameraPermission] = useCameraPermissions();
  const [permissionMic, requestMicPermission] = useMicrophonePermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const camera = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();
  const [isRecording, setIsRecording] = useState(false);
  const [video, setVideo] = useState<{ uri: string }>();
  const [mode, setMode] = useState<CameraMode>("picture");

  // request for camera permission
  useEffect(() => {
    // permission have been fetched & not granted & can ask again
    if (permissionCam && !permissionCam.granted) {
      if (permissionCam.canAskAgain) requestCameraPermission();
      else Alert.alert("allow camera permission");
    }

    if (permissionMic && !permissionMic.granted) {
      if (permissionMic.canAskAgain) requestMicPermission();
      else Alert.alert("allow mic permission");
    }
  }, [permissionCam, permissionMic]);

  const toggleCameraFacing = () => {
    setFacing((current) => (current === "back" ? "front" : "back"));
  };

  const onPress = () => {
    if (mode === "picture") takePicture();
    else {
      if (isRecording) camera.current?.stopRecording();
      else startRecording();
    }
  };

  const takePicture = async () => {
    const res = await camera.current?.takePictureAsync();
    // console.log(res);
    setPicture(res);
  };

  const startRecording = async () => {
    console.log("recording started");
    setIsRecording(true);
    const res = await camera.current?.recordAsync();
    setVideo(res);
    console.log(res);
    setIsRecording(false);
  };

  const saveFile = async (uri: string) => {
    const fileName = path.parse(uri).base;
    await FileSystem.copyAsync({
      from: uri,
      to: FileSystem.documentDirectory + fileName,
    });
    ToastAndroid.show("saved", ToastAndroid.SHORT);
    setPicture(undefined);
    setVideo(undefined);
    // router.back()
  };

  // if permission isn't granted, display a spinner
  if (!permissionCam?.granted) {
    return <ActivityIndicator />;
  }

  if (picture || video) {
    return (
      <View>
        {picture && <ImageViewer uri={picture.uri} />}
        {video && <VideoPlayer uri={video.uri} />}
        <View style={{ padding: 10, position: "absolute", top: 40, right: 20 }}>
          <Button
            title="Save"
            onPress={() => {
              const uri = picture?.uri || video?.uri;
              if (uri) saveFile(uri);
            }}
          />
        </View>
        <MaterialIcons
          name="close"
          size={35}
          color={"white"}
          style={{ position: "absolute", top: 50, left: 20 }}
          onPress={() => {
            setPicture(undefined);
            setVideo(undefined);
          }}
        />
      </View>
    );
  }

  return (
    <View>
      <CameraView
        ref={camera}
        style={styles.camera}
        facing={facing}
        mode={mode}
        mirror={facing === "front" ? true : false}
      />
      <MaterialIcons
        name="close"
        color={"white"}
        style={styles.close}
        size={30}
        onPress={() => router.back()}
      />
      <View style={styles.footer}>
        <MaterialCommunityIcons
          name={mode === "picture" ? "camera-outline" : "video-outline"}
          size={30}
          color="white"
          onPress={() => {
            setMode((x) => (x === "picture" ? "video" : "picture"));
          }}
        />

        <Pressable
          style={[
            styles.recordButton,
            { backgroundColor: isRecording ? "crimson" : "white" },
          ]}
          onPress={onPress}
        />
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
