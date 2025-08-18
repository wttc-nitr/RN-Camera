import { Link } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Text, View } from "react-native";

export default function ImageScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Camera Screen</Text>
      <Link href={"/"}>go to Home</Link>
      <Text>Image details for: {name}</Text>
    </View>
  );
}
