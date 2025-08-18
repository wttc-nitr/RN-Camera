import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function CameraScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Camera Screen</Text>
      <Link href={"/"}>go to Home</Link>
    </View>
  );
}
