import { Text, View } from "react-native";

import AppLoading from "expo-app-loading";
import React from "react";
import { StatusBar } from "expo-status-bar";
import Todos from "./pages/Todos";
import styles from "./theme/styles";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    Obviously: require("./assets/fonts/ObviouslyDemo-Wide.otf"),
  });

  if (!loaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Todos />
      <StatusBar style="auto" />
    </View>
  );
}
