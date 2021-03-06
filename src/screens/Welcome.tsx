import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { SimpleLineIcons } from "@expo/vector-icons";
import Home from "./Home";
import Settings from "./Settings";
import AboutUs from "./AboutUs";
import {
  Box,
  Pressable,
  VStack,
  Text,
  HStack,
  Divider,
  Icon,
} from "native-base";

const Drawer = createDrawerNavigator();

const getIcon = (screenName: string) => {
  switch (screenName) {
    case "Quiz":
      return "home";
    case "Settings":
      return "settings";
    case "About":
      return "support";
    default:
      return "tag";
  }
};

function ToggleBar(props: any) {
  return (
    <DrawerContentScrollView {...props} safeArea>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            Quizz !
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            How smart you really are ?
          </Text>
        </Box>
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {props.state.routeNames.map((name, index) => (
              <Pressable
                px="5"
                py="3"
                key={index}
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={(event) => {
                  props.navigation.navigate(name);
                }}
              >
                <HStack space="7" alignItems="center">
                  <Icon
                    color={
                      index === props.state.index ? "primary.500" : "gray.500"
                    }
                    size="5"
                    as={<SimpleLineIcons name={getIcon(name)} />}
                  />
                  <Text
                    fontWeight="500"
                    color={
                      index === props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {name}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
}
export default function Welcome() {
  return (
    <Box flex={1}>
      <Drawer.Navigator drawerContent={(props) => <ToggleBar {...props} />}>
        <Drawer.Screen name="Quiz" component={Home} />
        <Drawer.Screen name="Settings" component={Settings} />
        <Drawer.Screen name="About" component={AboutUs} />
      </Drawer.Navigator>
    </Box>
  );
}
