import React from "react";
import { Button, View, Center, FlatList } from "native-base";

const Categories = [
  "Linux",
  "Bash",
  "Php",
  "Docker",
  "HTML",
  "MySQL",
  "WordPress",
  "Laravel",
  "Kubernetes",
  "JavaScript",
  "DevOps",
];

export default function ({ navigation }: any) {
  return (
    <Center flex={1} px="3">
      <View>
        <FlatList
          data={Categories}
          renderItem={({ item }) => (
            <Button
              onPress={() => {
                navigation.push("Quizz", {
                  category: item,
                  limit: 3,
                  difficulty: "easy",
                });
              }}
              borderBottomWidth="1"
              _dark={{
                borderColor: "gray.600",
              }}
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              {item}
            </Button>
          )}
          keyExtractor={(item) => item}
        />
      </View>
    </Center>
  );
}
