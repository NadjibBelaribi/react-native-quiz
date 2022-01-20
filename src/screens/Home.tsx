import React from "react";
import { Pressable, Box, Text, FlatList, Icon, Center } from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Categories } from "../utils";

export default function Home({ navigation }: any) {
  return (
    <Center flex={1} px="3" _light={{ bg: "warmGray.50" }}>
      <FlatList
        data={Categories}
        numColumns={3}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              navigation.push("Quizz", {
                category: item.id,
                name: item.name,
              })
            }
            key={item}
          >
            {({ isHovered, isFocused, isPressed }) => {
              return (
                <Box
                  alignItems="center"
                  bg={
                    isPressed
                      ? "gray.400"
                      : isHovered
                      ? "gray.300"
                      : "warmGray.50"
                  }
                  p="5"
                  rounded="8"
                  style={{
                    transform: [
                      {
                        scale: isPressed ? 0.96 : 1,
                      },
                    ],
                  }}
                >
                  <Icon
                    as={SimpleLineIcons}
                    name={item.icone}
                    color="primary.500"
                    _dark={{
                      color: "warmGray.50",
                    }}
                  />
                  <Text
                    bold
                    italic
                    fontSize="xs"
                    marginTop="15px"
                    width="80px"
                    textAlign="center"
                  >
                    {item.name}
                  </Text>
                </Box>
              );
            }}
          </Pressable>
        )}
        keyExtractor={(item) => item.name}
      />
    </Center>
  );
}
