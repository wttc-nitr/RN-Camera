import { Directory, Paths, File } from "expo-file-system";

export const loadMediaFiles = (): File[] => {
  if (!Paths.document) return [];

  const res = new Directory(Paths.document)
    .list()
    .filter(
      (item): item is File =>
        item instanceof File &&
        (item.type === "image/jpeg" || item.type === "video/mp4"),
    );

  return res;
};
