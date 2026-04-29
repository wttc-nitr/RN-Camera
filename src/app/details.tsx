import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { Asset, AssetInfo } from "expo-media-library/next";
import { useCallback, useState } from "react";

export default function Details() {
  const insets = useSafeAreaInsets();
  const { assetID } = useLocalSearchParams<{ assetID: string }>();
  const [assetInfo, setAssetInfo] = useState<AssetInfo>()

  const asset = new Asset(assetID);
  useFocusEffect(
    useCallback(() => {
      (
        async function () {
          const info = await asset.getInfo();
          setAssetInfo(info);
        }
      )()
    }, [asset])
  )

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "red"}}>
      <View style={{flex: 1, backgroundColor: "white", paddingTop:  insets.top, paddingBottom: insets.bottom, justifyContent: 'center', alignItems: 'center'}}>
        <Text selectable>Name : {assetInfo?.filename}</Text>
        {/*<Text>Size: { readableSize(assetInfo.)} </Text>*/}
        <Text>Path: {assetInfo?.uri}</Text>
        <Text>Resolution: {assetInfo?.height} x { assetInfo?.width } = {getMegaPixels(assetInfo?.width, assetInfo?.height, 1)} MP</Text>
        <Text>Mime type: {assetInfo?.mediaType}</Text>
        <Text>created: {timestampToDate(assetInfo?.creationTime as number)}</Text>
        <Text>last modified: {timestampToDate(assetInfo?.modificationTime as number)} </Text>
      </View>
    </SafeAreaView>
  );
}

export function timestampToDate(timestamp: number | undefined): String {
  if (!timestamp)
    return "";
  const date = new Date(timestamp);
  return date.toLocaleString('en-us', {
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function getMegaPixels(imgWidth: number | undefined, imgHeight: number | undefined, imgScale: number) {
  if (!imgWidth || !imgHeight)
    return 0;

  const mp = imgWidth * imgScale * imgHeight * imgScale / 1_000_000;
  const difference = Math.abs(mp - Math.ceil(mp))

  return difference > 0.15 ? mp.toFixed(2) : Math.ceil(mp);
}
