import React, { useEffect } from "react";
import Navigator from "./src/navigation/Navigator";
import { NativeBaseProvider, Center } from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const storeSettings = async (lev: string, lim: number) => {
    try {
      const levelJson = JSON.stringify(lev);
      await AsyncStorage.setItem("level", levelJson);
      const amountJson = JSON.stringify(lim);
      await AsyncStorage.setItem("amount", amountJson);
    } catch (e) {
      // saving error
    }
  };

  useEffect(() => {
    storeSettings("easy", 5);
  }, []);

  return (
    <NativeBaseProvider>
      <Navigator />
    </NativeBaseProvider>
  );
}
