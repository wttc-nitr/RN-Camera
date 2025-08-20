import path from "path";
import * as FileSystem from "expo-file-system";

const imageExtensions = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".heic",
  ".heif",
  ".webp",
  ".avif",
]);

export type MediaType = "image" | "video";

export const getMediaType = (uri: string): MediaType => {
  const extension = path.extname(uri).toLowerCase();
  if (imageExtensions.has(extension)) return "image";
  return "video";
};

export type Media = {
  name: string;
  uri: string;
  type: MediaType;
};

export const loadMediaFiles = async (): Promise<Media[]> => {
  if (!FileSystem.documentDirectory) {
    return [];
  }

  const res = await FileSystem.readDirectoryAsync(FileSystem.documentDirectory);
  // console.log(res);
  return res
    .filter((file) =>
      /\.(jpg|jpeg|png|heic|heif|mp4|mov|3gp|mkv|webp|gif|avif)$/i.test(file),
    )
    .map((file) => ({
      name: file,
      uri: FileSystem.documentDirectory + file,
      type: getMediaType(file),
    }));
};
