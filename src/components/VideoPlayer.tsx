import { useVideoPlayer, VideoView } from "expo-video";

export default function VideoPlayer({ uri }: { uri: string }) {
  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    player.play;
    player.showNowPlayingNotification = true;
  });

  return (
    <VideoView
      player={player}
      style={{ width: "100%", height: "100%" }}
      contentFit="cover"
    />
  );
}
