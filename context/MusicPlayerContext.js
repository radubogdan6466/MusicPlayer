import React, { createContext, useState, useContext } from "react";
import { Audio } from "expo-av";

const MusicPlayerContext = createContext();

export const MusicPlayerProvider = ({ children }) => {
  const [sound, setSound] = useState(null);

  const playSound = async (uri) => {
    if (sound) {
      await sound.unloadAsync();
    }
    const { sound: newSound } = await Audio.Sound.createAsync({ uri });
    setSound(newSound);
    await newSound.playAsync();
  };

  const stopSound = async () => {
    if (sound) {
      await sound.stopAsync();
      await sound.unloadAsync();
      setSound(null);
    }
  };

  return (
    <MusicPlayerContext.Provider value={{ playSound, stopSound }}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export const useMusicPlayer = () => useContext(MusicPlayerContext);
