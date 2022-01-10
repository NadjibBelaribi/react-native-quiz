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
import Icon from "@mdi/react";
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

const Categories = [
  { name: "General Knowledge", id: "9", icone: mdiSchool },
  { name: "Books", id: "10", icone: mdiBookOpenPageVariant },
  { name: "Film", id: "11", icone: mdiFilm },
  { name: "Music", id: "12", icone: mdiMusicNoteEighth },
  { name: "Theatres", id: "13", icone: mdiTheater },
  { name: "Television", id: "14", icone: mdiTelevision },
  { name: "Video Games", id: "15", icone: mdiControllerClassic },
  { name: "Board Games", id: "16", icone: mdiCrowd },
  { name: "Science & Nature", id: "17", icone: mdiNaturePeople },
  { name: "Computers", id: "18", icone: mdiDesktopClassic },
  { name: "Mathematic", id: "19", icone: mdiMathCos },
  { name: "Mythology", id: "20", icone: mdiUfo },
  { name: "Sports", id: "21", icone: mdiBasketball },
  { name: "Geography", id: "22", icone: mdiEarth },
  { name: "History", id: "23", icone: mdiHistory },
  { name: "Politics", id: "24", icone: mdiGreenhouse },
  { name: "Art", id: "25", icone: mdiBrush },
  { name: "Celebrities", id: "26", icone: mdiAccountStar },
  { name: "Animals", id: "27", icone: mdiPaw },
  { name: "Japanese Anime & Manga", id: "31", icone: mdiIdeogramCjk },
  { name: "Vehicles", id: "28", icone: mdiCarEstate },
  { name: "Comics", id: "29", icone: mdiRedhat },
  { name: "Gadgets", id: "30", icone: mdiHammerScrewdriver },
  { name: "Cartoon", id: "32", icone: mdiPanda },
];

export default function Home ({ navigation }: any) {
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
                    <View>
                      <Icon
                        path={item.icone}
                        title="Dog"
                        color="#dd0"
                        size={2}
                      />
                    </View>

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
