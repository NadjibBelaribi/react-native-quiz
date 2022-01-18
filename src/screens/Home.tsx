import React, { useState } from "react";
import {
  Button,
  View,
  Pressable,
  Image,
  Divider,
  Box,
  Text,
  FlatList,
  Select,
  HStack,
  CheckIcon,
  Icon,
  FormControl,
  useColorModeValue,
  Center,
} from "native-base";
import { SimpleLineIcons } from "@expo/vector-icons";
import { Categories } from "../utils";

export default function Home({ navigation }: any) {
  const [level, setLevel] = useState("easy");
  const [amount, setAmount] = useState(5);
  return (
    <Center
      flex={1}
      px="3"
      _dark={{ bg: "coolGray.800" }}
      _light={{ bg: "warmGray.50" }}
    >
      <View marginTop="5px" marginBottom="5px">
        <Center>
          <HStack space={2}>
            <Text fontSize="lg" marginTop="15px">
              Level
            </Text>
            <Select
              selectedValue={level}
              minWidth="80%"
              accessibilityLabel="Choose Difficulty"
              placeholder="Choose Difficulty"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={(itemValue) => setLevel(itemValue)}
              mt={3}
            >
              <Select.Item label="Easy" value="easy" />
              <Select.Item label="Medium" value="medium" />
              <Select.Item label="Hard" value="hard" />
            </Select>
          </HStack>
          <HStack space={2}>
            <Text fontSize="lg" marginTop="12px">
              Number
            </Text>
            <Select
              selectedValue={amount.toString()}
              minWidth="80%"
              accessibilityLabel="Number of questions"
              placeholder="Number of questions"
              _selectedItem={{
                bg: "teal.600",
                endIcon: <CheckIcon size="5" />,
              }}
              onValueChange={(itemValue) => setAmount(parseInt(itemValue))}
            >
              <Select.Item label="5 questions " value="5" />
              <Select.Item label="10 questions " value="10" />
            </Select>
          </HStack>
        </Center>
      </View>
      <Divider thickness="4"></Divider>
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
