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
  Icon,
} from "native-base";

import {
  mdiBookOpenPageVariant,
  mdiSchool,
  mdiFilm,
  mdiMusicNoteEighth,
  mdiTheater,
  mdiTelevision,
  mdiControllerClassic,
  mdiCrowd,
  mdiNaturePeople,
  mdiDesktopClassic,
  mdiMathCos,
  mdiUfo,
  mdiBasketball,
  mdiEarth,
  mdiHistory,
  mdiGreenhouse,
  mdiBrush,
  mdiAccountStar,
  mdiPaw,
  mdiIdeogramCjk,
  mdiCarEstate,
  mdiRedhat,
  mdiHammerScrewdriver,
  mdiPanda,
} from "@mdi/js";

import { SimpleLineIcons } from "@expo/vector-icons";

const Categories = [
  { name: "General Knowledge", id: "9", icone: "graduation" },
  { name: "Books", id: "10", icone: "book-open" },
  { name: "Film", id: "11", icone: "film" },
  { name: "Music", id: "12", icone: "music-tone-alt" },
  { name: "Theatres", id: "13", icone: "puzzle" },
  { name: "Television", id: "14", icone: "social-youtube" },
  { name: "Video Games", id: "15", icone: "game-controller" },
  { name: "Board Games", id: "16", icone: "paper-plane" },
  { name: "Science & Nature", id: "17", icone: "chemistry" },
  { name: "Computers", id: "18", icone: "screen-tablet" },
  { name: "Mathematic", id: "19", icone: "chart" },
  { name: "Mythology", id: "20", icone: mdiUfo },
  { name: "Sports", id: "21", icone: "social-dribbble" },
  { name: "Geography", id: "22", icone: "globe-alt" },
  { name: "History", id: "23", icone: "shield" },
  { name: "Politics", id: "24", icone: "ghost" },
  { name: "Art", id: "25", icone: "magic-wand" },
  { name: "Celebrities", id: "26", icone: "star" },
  { name: "Animals", id: "27", icone: "symbol-male" },
  { name: "Japanese Anime & Manga", id: "31", icone: "rocket" },
  { name: "Vehicles", id: "28", icone: "social-steam" },
  { name: "Comics", id: "29", icone: "social-reddit" },
  { name: "Gadgets", id: "30", icone: "umbrella" },
  { name: "Cartoon", id: "32", icone: "social-github" },
];

export default function Home({ navigation }: any) {
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
      <Center marginBottom="50px">
        <FlatList
          data={Categories}
          numColumns={3}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                navigation.push("Quizz", {
                  category: item.id,
                  name: item.name,
                  limit: amount,
                  difficulty: level,
                })
              }
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
                    <Icon
                      as={SimpleLineIcons}
                      name={item.icone}
                      color="coolGray.800"
                      _dark={{
                        color: "warmGray.50",
                      }}
                    />
                    <Text
                      bold
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
          keyExtractor={(item) => item}
        />
      </Center>
    </Center>
  );
}
