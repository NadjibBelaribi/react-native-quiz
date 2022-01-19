import React, { useState, useEffect } from "react";

import {
  NativeBaseProvider,
  Button,
  Box,
  CheckIcon,
  HamburgerIcon,
  Pressable,
  Heading,
  View,
  Select,
  FormControl,
  Input,
  VStack,
  Text,
  Center,
  HStack,
  Divider,
  Icon,
  Stack,
  Image,
  AspectRatio,
} from "native-base";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings(props: any) {
  const [amount, setAmount] = useState("");
  const [level, setLevel] = useState("");

  const storeLevel = async (lev: string) => {
    try {
      setLevel(lev);
      const levelJson = JSON.stringify(lev);
      await AsyncStorage.setItem("level", levelJson);
    } catch (e) {
      // saving error
    }
  };

  const storeAmount = async (lim: number) => {
    try {
      setAmount(lim.toString());
      const amountJson = JSON.stringify(lim);
      await AsyncStorage.setItem("amount", amountJson);
    } catch (e) {
      // saving error
    }
  };

  const getLevel = async () => {
    try {
      const value = await AsyncStorage.getItem("level");
      setLevel(JSON.parse(value));
      return value;
    } catch (e) {}
  };
  const getAmount = async () => {
    try {
      const value = await AsyncStorage.getItem("amount");
      setAmount(value);

      return value;
    } catch (e) {}
  };

  useEffect(() => {
    getLevel();
    getAmount();
  }, []);

  return (
    <Center>
      <Heading mt="12" fontSize="24" marginBottom="20px" italic>
        What do you prefer ?
      </Heading>
      <VStack width="90%" mx="3" space={10}>
        <FormControl>
          <FormControl.Label _text={{ bold: true, fontSize: "xl" }}>
            Level
          </FormControl.Label>
          <Select
            selectedValue={level}
            minWidth="80%"
            placeholder="Choose Difficulty"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => storeLevel(itemValue)}
            mt={3}
          >
            <Select.Item label="Easy" value="easy" />
            <Select.Item label="Medium" value="medium" />
            <Select.Item label="Hard" value="hard" />
          </Select>
        </FormControl>

        <FormControl>
          <FormControl.Label _text={{ bold: true, fontSize: "xl" }}>
            Number of questions
          </FormControl.Label>
          <Select
            selectedValue={amount}
            minWidth="80%"
            placeholder="Number of questions"
            _selectedItem={{
              bg: "teal.600",
              endIcon: <CheckIcon size="5" />,
            }}
            onValueChange={(itemValue) => storeAmount(parseInt(itemValue))}
          >
            <Select.Item label="5 " value="5" />
            <Select.Item label="10 " value="10" />
          </Select>
        </FormControl>
      </VStack>
    </Center>
  );
}
