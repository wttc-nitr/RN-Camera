import { Link, useLocalSearchParams } from "expo-router";
import { Pressable, StyleSheet, ToastAndroid, View } from "react-native";
import PagerView from "react-native-pager-view";
import { useAssetContext } from "../store/MediaProvider";
import ImageViewer from "../components/ImageViewer";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Asset } from "expo-media-library/next";
import { shareAsync } from "expo-sharing";

export default function Pager() {
  const { assetID, index } = useLocalSearchParams<{ assetID: string; index: string }>();
  const { media } = useAssetContext();
  let assetIndex = index ? parseInt(index) : 0;
  const insets = useSafeAreaInsets();
  return (
    <View style={styles.container}>
      <PagerView style={{ flex: 1, backgroundColor: "red" }} initialPage={assetIndex} pageMargin={20}>
        {media.map((item) => (
          <ImageViewer key={item.id} assetID={item.id} />
        ))}
      </PagerView>
      <View style={[styles.info, { paddingBottom: insets.bottom }]}>
        <Pressable
          style={{ backgroundColor: "red" }}
          onPress={() => {
            alertDelete(assetID);
          }}
        >
          <MaterialCommunityIcons name="delete" size={50} color="black" />
        </Pressable>

        <Link href={{ pathname: "details", params: { assetID: assetID } }}>
          <MaterialCommunityIcons name="information-outline" size={50} color="black" />
        </Link>
        <Pressable
          onPress={async () => {
            const asset = new Asset(assetID);
            const uri = await asset.getUri();
            await shareAsync(uri);
          }}
        >
          <MaterialCommunityIcons name="share-variant" size={50} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    position: "relative",
  },
  info: {
    flex: 1,
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    height: 130,
    bottom: 0,
    opacity: 0.6,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});

async function alertDelete(assetID: string) {
  try {
    const asset = new Asset(assetID);
    await asset.delete();
    ToastAndroid.show("deleted", ToastAndroid.SHORT);
  } catch (error) {
    console.log(error);
  }
}
