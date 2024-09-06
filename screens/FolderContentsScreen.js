import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const FolderContentsScreen = ({ route }) => {
  const { folder } = route.params; // Primim fișierele din folder

  return (
    <View style={styles.container}>
      <FlatList
        data={folder}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View>
            <Text style={styles.itemText}>{item.filename}</Text>
            {/* Afișăm numele fișierului */}
          </View>
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

export default FolderContentsScreen;
