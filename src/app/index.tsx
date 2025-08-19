import { Link, useFocusEffect } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";
import { useCallback, useEffect, useState } from "react";

type Media = {
  name: string;
  uri: string;
};

export default function HomeScreen() {
  const [media, setMedia] = useState<Media[]>([]);
  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }

    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory,
    );
    // console.log(res);
    setMedia(
      res
        .filter((file) =>
          /\.(jpg|jpeg|png|heic|heif|mp4|mov|3gp|mkv|webp|gif|avif)$/i.test(
            file,
          ),
        )
        .map((file) => ({
          name: file,
          uri: FileSystem.documentDirectory + file,
        })),
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadFiles();
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
              <Image
                source={{ uri: item.uri }}
                style={{ aspectRatio: 3 / 4 }}
              />
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
