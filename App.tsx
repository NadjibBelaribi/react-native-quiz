import React from "react";
import Navigator from "./src/navigation/Navigator";
import { NativeBaseProvider, Center } from "native-base";
export default function App() {
  return (
    <NativeBaseProvider>
        <Navigator />
     </NativeBaseProvider>
  );
}
