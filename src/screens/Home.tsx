import React, { useState } from "react";
import {
  Button,
  View,
  Pressable,
  Image,
  Center,
  Divider,
  Box,
  Text,
  FlatList,
  Select,
  HStack,
  CheckIcon,
} from "native-base";

const Categories = {
  "General Knowledge": "9",
  Books: "10",
  Film: "11",
  Music: "12",
  Theatres: "13",
  Television: "14",
  "Video Games": "15",
  "Board Games": "16",
  "Science & Nature": "17",
  Computers: "18",
  Mathematics: "19",
  Mythology: "20",
  Sports: "21",
  Geography: "22",
  History: "23",
  Politics: "24",
  Art: "25",
  Celebrities: "26",
  Animals: "27",
  Vehicles: "28",
  Comics: "29",
  Gadgets: "30",
  "Japanese Anime & Manga": "31",
  Cartoon: "32",
  "Any Category": "any",
};

export default function ({ navigation }: any) {
  const [level, setLevel] = useState("easy");
  const [amount, setAmount] = useState(5);
  return (
    <Center flex={1} px="3">
      <HStack marginTop="50px">
        <Select
          selectedValue={level}
          minWidth="200"
          accessibilityLabel="Choose Difficulty"
          placeholder="Choose Difficulty"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setLevel(itemValue)}
        >
          <Select.Item label="Easy" value="easy" />
          <Select.Item label="Medium" value="medium" />
          <Select.Item label="Hard" value="hard" />
        </Select>

        <Select
          selectedValue={amount.toString()}
          minWidth="200"
          accessibilityLabel="Number of questions"
          placeholder="Number of questions"
          _selectedItem={{
            bg: "teal.600",
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={(itemValue) => setAmount(parseInt(itemValue))}
        >
          <Select.Item label="5" value="5" />
          <Select.Item label="10" value="10" />
          <Select.Item label="15" value="15" />
          <Select.Item label="20" value="20" />
        </Select>
      </HStack>
      <Divider></Divider>
      <Center>
        <FlatList
          data={Object.keys(Categories)}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.push("Quizz", {
                  category: Categories[item],
                  name : item,
                  limit: amount,
                  difficulty: level,
                })
              }
            >
              {({ isHovered, isFocused, isPressed }) => {
                return (
                  <Box
                    bg={
                      isPressed
                        ? "gray.400"
                        : isHovered
                        ? "gray.300"
                        : "gray.100"
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
                    <Image
                      size={70}
                      resizeMode={"contain"}
                      borderRadius={100}
                      source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg",
                      }}
                      alt="Category"
                    />
                    <Center>
                      <Text bold marginTop="10px" pl="4" pr="5" py="2">
                        {item}
                      </Text>
                    </Center>
                  </Box>
                );
              }}
            </Pressable>
          )}
          keyExtractor={(item) => item}
        />
      </Center>
    </Center>
  );
}
