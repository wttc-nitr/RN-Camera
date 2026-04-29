import { requestPermissionsAsync } from "expo-media-library";
import { Album, Asset, AssetField, Query } from "expo-media-library/next";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import * as MediaLibrary from 'expo-media-library'
import { ToastAndroid } from "react-native";
type AssetContext = {
  media: Asset[];
};
const AssetContext = createContext<AssetContext>({
  media: [],
});

export default function AssetProvider({ children }: PropsWithChildren) {
  const [media, setMedia] = useState<Asset[]>();
  async function getMedia() {
    const { status, canAskAgain, granted, expires } = await requestPermissionsAsync();
    // console.log("permission status: ", status);
    if (!granted) {
      ToastAndroid.show("allow permission", ToastAndroid.LONG)
      return;
    }

    const albumCamera = await Album.get("Camera");
    if (albumCamera) {
      const assets = await new Query().album(albumCamera).orderBy({ key: AssetField.MODIFICATION_TIME, ascending: false }).exe();
      setMedia(assets);
    }
  }

  useEffect(() => {
    getMedia();

    const subscription = MediaLibrary.addListener(() => {
      getMedia();
    })

    return () => {
      subscription.remove()
    }
  }, []);

  return <AssetContext.Provider value={{ media: media ?? []}}>{children}</AssetContext.Provider>;
}

export const useAssetContext = () => {
  const assetContext = useContext(AssetContext);

  if (!assetContext) throw new Error("context not available, wrap the components inside the context");

  return assetContext;
};
