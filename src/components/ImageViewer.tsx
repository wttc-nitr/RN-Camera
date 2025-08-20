import { Image } from "react-native";

export default function ImageViewer({ uri }: { uri: string }) {
  return (
    <Image source={{ uri: uri }} style={{ width: "100%", height: "100%" }} />
  );
}
