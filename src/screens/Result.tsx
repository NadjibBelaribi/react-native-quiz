import React, { EffectCallback, useEffect } from "react";
import { Button, View, Center, Text } from "native-base";

export default function ({ navigation, route }: any) {
  useEffect(
    () =>
      navigation.addListener("beforeRemove", (e) => {
        // Prevent default behavior of leaving the screen
        // e.preventDefault();
      }),
    [navigation]
  );

  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <Center flex={1} px="3">
      <View>
        <Text>
          {" "}
          Reults is {route.params.score} / {route.params.length}
        </Text>
        <Button
          onPress={goHome}
          borderBottomWidth="1"
          _dark={{
            borderColor: "red.600",
          }}
          marginTop="20px"
          borderColor="coolGray.200"
          pl="4"
          pr="5"
          py="2"
        >
          Home
        </Button>
      </View>
    </Center>
  );
}
