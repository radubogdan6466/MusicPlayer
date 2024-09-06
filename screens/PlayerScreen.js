import React, { useEffect, useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useMusicPlayer } from "../context/MusicPlayerContext"; // Asigură-te că calea este corectă
import NowPlayingCard from "../components/NowPlayingCard"; // Asigură-te că calea este corectă

const PlayerScreen = ({ route, navigation }) => {
  const { uri, filename, artist } = route.params;
  const { playSound, stopSound } = useMusicPlayer(); // Folosește contextul pentru a accesa funcțiile
  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    const play = async () => {
      setCurrentSong({ uri, filename, artist });
      await playSound(uri);
    };

    play();

    return () => {
      stopSound();
    };
  }, [uri]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Redare melodie</Text>
      <Button title="Înapoi la listă" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default PlayerScreen;
