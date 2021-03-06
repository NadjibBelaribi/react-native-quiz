import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Quizz from "../screens/Quizz";
import Result from "../screens/Result";
import Welcome from "../screens/Welcome";

const MainStack = createStackNavigator();

const Main = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: true,
      }}
    >
      <MainStack.Screen name="Welcome" component={Welcome} />
      <MainStack.Screen name="Quizz !" component={Quizz} />
      <MainStack.Screen name="Home" component={Home} />
      <MainStack.Screen
        name="Quizz"
        component={Quizz}
        options={({ route, navigation }) => ({
          title: route.params.name,
        })}
      />
      <MainStack.Screen name="Result" component={Result} />
    </MainStack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <Main />
    </NavigationContainer>
  );
};
