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

export default function Settings(props: any) {
    return (
      <Center>
        <Text mt="12" fontSize="18">
          This is {props.route.name} page.
        </Text>
        <VStack width="90%" mx="3">
          <FormControl>
            <FormControl.Label _text={{ bold: true }}>Level</FormControl.Label>
            <Input
              placeholder="easy"
              //   onChangeText={(value) => setData({ ...formData, name: value })}
            />
          </FormControl>
  
          <FormControl>
            <FormControl.Label _text={{ bold: true }}>NUmber of questions</FormControl.Label>
            <Input
              placeholder="5"
              //   onChangeText={(value) => setData({ ...formData, name: value })}
            />
          </FormControl>
  
          <Button /*onPress={} */ mt="5" colorScheme="cyan">
            Submit
          </Button>
        </VStack>
      </Center>
    );
  }