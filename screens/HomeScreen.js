import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import Navbar from "../components/Navbar";
import NowPlayingCard from "../components/NowPlayingCard";
import MusicListScreen from "./MusicListScreen";
import { useMusicPlayer } from "../context/MusicPlayerContext"; // Asigură-te că calea este corectă

const HomeScreen = () => {
  const [selectedScreen, setSelectedScreen] = useState("All songs");
  const [currentSong, setCurrentSong] = useState(null);
  const { playSound } = useMusicPlayer(); // Accesăm funcția de redare din context

  const handleSongSelect = async (song) => {
    setCurrentSong(song);
    await playSound(song.uri); // Apelăm funcția pentru a reda melodia selectată
  };

  const renderContent = () => {
    switch (selectedScreen) {
      case "All songs":
        return <MusicListScreen onSongSelect={handleSongSelect} />;
      default:
        return <Text>Select a screen from the navbar</Text>;
    }
  };

  return (
    <View style={styles.container}>
      <Navbar setSelectedScreen={setSelectedScreen} />
      <View style={styles.contentContainer}>{renderContent()}</View>
      {currentSong && <NowPlayingCard currentSong={currentSong} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingTop: 60, // Asigură-te că conținutul este afișat sub Navbar
  },
});

export default HomeScreen;
