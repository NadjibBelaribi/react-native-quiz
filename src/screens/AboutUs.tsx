import React, { useState } from "react";

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

export default function AboutUs(props) {
  return (
    <Box
      maxW="100%"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
    >
      <Box></Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading size="md" ml="-1">
            SmarDumb
          </Heading>
          <Text
            fontSize="xs"
            _light={{
              color: "violet.500",
            }}
            _dark={{
              color: "violet.400",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
          >
            By Open Trivia DB .
          </Text>
        </Stack>
        <Text fontWeight="400">
          This is an quizz application realized by two students for a pedagogic
          project at the University Of Strasbourg.
        </Text>
        <Text fontWeight="400">
          It contains 24 categories whith hundreds of randomised questions by a
          free API of Open Trivia DB
        </Text>
      </Stack>
    </Box>
  );
}
