import React from "react";
import {
  Text,
  View,
  Center,
  Box,
  FlatList,
  Progress,
  Button,
} from "native-base";

const Question = [
  {
    id: 8,
    question: "When do we use the GREP command",
    description: null,
    answers: {
      answer_a: "When we want to search for a string",
      answer_b: "To find a file",
      answer_c: "To find a directory",
      answer_d: "To show all directories which have the string in their name",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "true",
    correct_answers: {
      answer_a_correct: "true",
      answer_b_correct: "false",
      answer_c_correct: "false",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: "answer_a",
    explanation: null,
    tip: null,
    tags: [{ name: "Linux" }, { name: "BASH" }],
    category: "Linux",
    difficulty: "Easy",
  },
];

export default function ({ navigation, route }: any) {
  return (
    <View>
      <Text fontSize="md">
        {route.params.category}-{route.params.limit} questions{" "}
      </Text>
      <Progress value={45} mx="4" />
      <Center flex={1} px="3">
        <Box w="90%">
          <Text fontSize="md">{Question[0].question}</Text>
          <FlatList
            data={Object.values(Question[0].answers).filter((a) => a != null)}
            renderItem={({ item }) => (
              <Button
                onPress={() => {}}
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
        </Box>
      </Center>
    </View>
  );
}
