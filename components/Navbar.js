import React from "react";
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

const DATA = [
  { id: "1", title: "All songs" },
  { id: "2", title: "Playlists" },
  { id: "3", title: "Folders" },
];

const Navbar = ({ setSelectedScreen }) => {
  const handlePress = (screen) => {
    setSelectedScreen(screen);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handlePress(item.title)}
      style={styles.item}
    >
      <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute", // Pozitionare fixa la partea de sus
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    zIndex: 1, // Asigură-te că este peste alte componente
    paddingVertical: 10,
  },
  item: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 16,
    color: "black",
  },
});

export default Navbar;
