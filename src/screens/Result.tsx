import React, { useEffect } from "react";
import { Button, View, Center, Heading, CircularProgress } from "native-base";

export default function ({ navigation, route }: any) {
  const goHome = () => {
    navigation.navigate("Welcome");
  };

  return (
    <Center flex={1} px="3">
      <View>
        <Heading>
          Your score is : 
        </Heading>
        <CircularProgress
          marginBottom="20px"
          marginTop="20px"
          mt={8}
          value={(route.params.score / route.params.length) * 100}
          size={150}
          color="green.500"
          thickness={10}
          _text={{ color: "green.900", fontSize: "30px" }}
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
