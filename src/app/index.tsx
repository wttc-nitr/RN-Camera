import { Link } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { useAssetContext } from "../store/MediaProvider";

export default function HomeScreen() {
  const { media } = useAssetContext();
  // Focus on -> fix in camera, then UI, then optimize performance (like lazy loading)
  //
  // if it works, let it work and don't try to over-optimize

  return (
    <View style={[styles.container]}>
      <StatusBar style="auto" />
      <FlatList
        data={media}
        renderItem={({ item, index }) => (
          <Link href={{ pathname: "/pager", params: { assetID: item.id, index: index } }} asChild>
            <Pressable style={{ flex: 1, maxWidth: "33.33%" }} onPressIn={() => Image.prefetch(item.id, "memory")}>
              <Image
                source={{ uri: item.id }}
                style={{
                  backgroundColor: "blue",
                  width: "100%",
                  height: 150,
                }}
                contentFit="cover"
              />
            </Pressable>
          </Link>
        )}
        numColumns={3}
        contentContainerStyle={{ gap: 1 }}
        columnWrapperStyle={{ gap: 1 }}
        keyExtractor={(item) => item.id}
      />
      <Link href="/camera" asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color={"white"} />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: "royalblue",
    padding: 15,
    borderRadius: 50,
    position: "absolute",
    bottom: 60,
    right: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
