import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as MediaLibrary from "expo-media-library";
import MusicInfo from "expo-music-info-2";

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
            const musicInfo = await MusicInfo.getMusicInfoAsync(item.uri, {
              title: true,
              artist: true,
              album: true,
              genre: true,
              picture: true,
            });

            return {
              ...item,
              ...musicInfo, // Adaugă informațiile despre muzică
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
            <View style={styles.itemContainer}>
              {item.picture && item.picture.pictureData ? (
                <Image
                  source={{ uri: item.picture.pictureData }}
                  style={styles.itemImage}
                />
              ) : (
                <View style={styles.itemImage} />
              )}
              <View style={styles.itemDetails}>
                <Text style={styles.itemTitle}>
                  {item.title || item.filename}
                </Text>
                <Text style={styles.itemArtist}>
                  {item.artist || "Unknown artist"}
                </Text>
                {/* <Text style={styles.itemAlbum}>
                  {item.album || "Unknown album"}
                </Text>
                <Text style={styles.itemGenre}>
                  {item.genre || "Unknown genre"}
                </Text> */}
              </View>
            </View>
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: "#ccc",
  },
  itemDetails: {
    marginLeft: 10,
  },
  itemTitle: {
    fontSize: 18,
    // fontWeight: "bold",
  },
  itemArtist: {
    fontSize: 16,
    color: "gray",
  },
  itemAlbum: {
    fontSize: 14,
    color: "gray",
  },
  itemGenre: {
    fontSize: 14,
    color: "gray",
  },
});

export default MusicListScreen;
