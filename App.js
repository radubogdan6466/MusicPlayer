import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import MusicListScreen from "./screens/MusicListScreen";
import PlayerScreen from "./screens/PlayerScreen";
import { MusicPlayerProvider } from "./context/MusicPlayerContext"; // Asigură-te că calea este corectă

const Stack = createStackNavigator();

export default function App() {
  return (
    <MusicPlayerProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="MusicList" component={MusicListScreen} />
          <Stack.Screen name="Player" component={PlayerScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </MusicPlayerProvider>
  );
}
