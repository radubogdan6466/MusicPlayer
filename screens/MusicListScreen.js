import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import * as MediaLibrary from "expo-media-library";

const MusicListScreen = ({ onSongSelect }) => {
  const [musicFiles, setMusicFiles] = useState([]);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    const getPermission = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      setPermission(status === "granted");
    };

    const getMusicFiles = async () => {
      if (permission) {
        const media = await MediaLibrary.getAssetsAsync({
          mediaType: "audio",
          first: 100, // Poți crește numărul dacă vrei să obții mai multe fișiere
        });

        // Obținere detalii suplimentare pentru fiecare fișier
        const filesWithDetails = await Promise.all(
          media.assets.map(async (item) => {
            const details = await MediaLibrary.getAssetInfoAsync(item.id);
            return {
              ...item,
              ...details, // Combina toate detaliile disponibile
            };
          })
        );
        setMusicFiles(filesWithDetails);
      }
    };

    getPermission();
    getMusicFiles();
  }, [permission]);

  return (
    <View style={styles.container}>
      <FlatList
        data={musicFiles}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSongSelect(item)}>
            <Text style={styles.itemText}>
              {item.filename} - {item.artist || "no data"}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  itemText: {
    fontSize: 18,
    marginVertical: 10,
  },
});

export default MusicListScreen;
