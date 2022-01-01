import React, { useEffect } from "react";
import { Button, View, Center, Text, CircularProgress } from "native-base";
import { fontSize } from "styled-system";

export default function ({ navigation, route }: any) {
  //useEffect(
  //  () =>
  //    navigation.addListener("beforeRemove", (e) => {
  //      // Prevent default behavior of leaving the screen
  //      // e.preventDefault();
  //    }),
  //    [navigation]
  //    );

  const goHome = () => {
    navigation.navigate("Home");
  };

  return (
    <Center flex={1} px="3">
      <View>
        <CircularProgress
          mt={8}
          value={(route.params.score / route.params.length) * 100}
          size={150}
          color="red.900"
          thickness={10}
          _text={{ color: "green.900", fontSize: "30px"}}
        >
          {`${route.params.score} / ${route.params.length}`}
        </CircularProgress>
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
