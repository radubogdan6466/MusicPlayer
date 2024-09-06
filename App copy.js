import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import * as MediaLibrary from "expo-media-library"; // Pentru acces la fișierele media
import { Audio } from "expo-av"; // Pentru redarea audio

export default function App() {
  const [musicFiles, setMusicFiles] = useState([]); // Lista de fișiere audio
  const [permission, setPermission] = useState(null); // Permisiune pentru media
  const [sound, setSound] = useState(null); // Obiectul Sound pentru redare

  // Funcție pentru cererea permisiunii de acces la media
  useEffect(() => {
    const getPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermission(status === "granted");
    };

    // Funcție pentru obținerea fișierelor de muzică
    const getMusicFiles = async () => {
      if (permission) {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
          first: 100, // Numărul maxim de fișiere returnate
        });
        setMusicFiles(media.assets);
      }
    };

    getPermission(); // Cere permisiunea
    getMusicFiles(); // Obține fișierele
  }, [permission]);

  // Funcție pentru redarea fișierelor audio
  const playSound = async (uri) => {
    if (sound) {
      await sound.unloadAsync(); // Oprește și descarcă sunetul anterior
    }

    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => playSound(item.uri)}>
            <Text style={styles.itemText}>{item.filename}</Text>
          </TouchableOpacity>
        )}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 18,
    marginVertical: 10,
  },
});
