import React from "react";
import { View, Text, StyleSheet } from "react-native";

const NowPlayingCard = ({ currentSong }) => {
  // Funcție pentru a converti durata din secunde în format MM:SS
  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.songTitle}>
        {currentSong?.filename || "No song playing"}
      </Text>
      <Text style={styles.songArtist}>
        {currentSong?.artist || "Unknown artist"}
      </Text>
      {currentSong?.duration && (
        <Text style={styles.songDuration}>
          {formatDuration(currentSong.duration)}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  songArtist: {
    fontSize: 14,
    color: "#555",
  },
  songDuration: {
    fontSize: 12,
    color: "#888",
  },
});

export default NowPlayingCard;
