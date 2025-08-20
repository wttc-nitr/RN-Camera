import { Link, useFocusEffect } from "expo-router";
import { FlatList, Image, Pressable, StyleSheet, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { useCallback, useState } from "react";
import { loadMediaFiles, Media } from "../utils/media";

export default function HomeScreen() {
  const [media, setMedia] = useState<Media[]>([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const files = await loadMediaFiles();
        setMedia(files);
      })();
    }, []),
  );

  console.log(JSON.stringify(media, null, 2));

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={media}
        renderItem={({ item }) => (
          <Link href={`/${item.name}`} asChild>
            <Pressable style={{ flex: 1, maxWidth: "33.33%" }}>
              {
                <Image
                  source={{ uri: item.uri }}
                  style={{ aspectRatio: 3 / 4 }}
                />
              }
            </Pressable>
          </Link>
        )}
        numColumns={3}
        contentContainerStyle={{ gap: 1 }}
        columnWrapperStyle={{ gap: 1 }}
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
    bottom: 20,
    right: 20,
  },
});
