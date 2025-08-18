import { Link } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
export default function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, fontWeight: "600" }}>Hello World</Text>

      <Link href="/camera" asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color={"white"} />
        </Pressable>
      </Link>

      <Link href={"/image-1"}>go to image 1</Link>
      <Link href={"/image-2"}>go to image 2</Link>
      <Link href={"/image-3"}>go to image 3</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "royalblue",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
