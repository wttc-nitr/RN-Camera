import { Image } from "expo-image";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

// no header-title, top-right corner (in header), three dots
// no name -> show name in info

export default function ImageViewer({ assetID }: { assetID: string }) {
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <Image source={{ uri: assetID }} style={styles.image} contentFit="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  image: { width: "100%", height: "100%" },
});
