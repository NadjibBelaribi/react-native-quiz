import React, { useState } from "react";
import {
  Text,
  View,
  Center,
  Box,
  FlatList,
  Progress,
  Button,
  HStack,
} from "native-base";

const QUESTIONS = [
  {
    id: 739,
    question: "How to dump pod logs (stdout) in Kubernetes?",
    description: null,
    answers: {
      answer_a: "kubectl log my-pod",
      answer_b: "kubectl pod logs my-pod",
      answer_c: "kubectl logs my-pod",
      answer_d: "kubectl pods logs my-pod",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
    correct_answers: {
      answer_a_correct: "false",
      answer_b_correct: "false",
      answer_c_correct: "true",
      answer_d_correct: "false",
      answer_e_correct: "false",
      answer_f_correct: "false",
    },
    correct_answer: "answer_a",
    explanation: null,
    tip: null,
    tags: [{ name: "Kubernetes" }],
    category: "Linux",
    difficulty: "Easy",
  },
  {
    id: 656,
    question:
      "Which filter can be applied on lines of text for arranging in ascending or descending order?",
    description: null,
    answers: {
      answer_a: "sort",
      answer_b: "arrange",
      answer_c: "collate",
      answer_d: "None of the above",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
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
    tags: [{ name: "BASH" }],
    category: "Linux",
    difficulty: "Easy",
  },
  {
    id: 690,
    question:
      "How can we list out all currently executing background processes?",
    description: null,
    answers: {
      answer_a: "ps -e",
      answer_b: "top",
      answer_c: "ps faux",
      answer_d: "proccess -aux",
      answer_e: null,
      answer_f: null,
    },
    multiple_correct_answers: "false",
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
    tags: [{ name: "BASH" }, { name: "Linux" }],
    category: "Linux",
    difficulty: "Easy",
  },
];

export default function ({ navigation, route }: any) {
  const [questionsLength, setQuestionsLength] = useState(QUESTIONS.length);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [correctOption, setCorrectOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [disableSelection, setDisableSelection] = useState(false);

  const handleNext = () => {
    if (currentQuestionIndex == questionsLength - 1) {
      setShowNextQuestion(false);
      navigation.navigate("Result", { score: score, length: questionsLength });
    } else {
      setDisableSelection(false);
      setSelectedOption("");
      setCorrectOption("");
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowNextQuestion(false);

    }
  };

  const validateAnswer = (option: any) => {
    let index = Object.values(
      QUESTIONS[currentQuestionIndex].correct_answers
    ).indexOf("true");
    console.log(index);
    if (index != -1) {
      let correctAnswer: any = Object.values(
        QUESTIONS[currentQuestionIndex].answers
      )[index];
      setCorrectOption(correctAnswer);
      setDisableSelection(true);
      setSelectedOption(option);

      if (option == correctAnswer) {
        setScore(score + 1);
      }
    }
    setShowNextQuestion(true);
  };

  const renderQuestion = () => {
    return (
      <HStack>
        <Center flex={1} px="3">
          <Text fontSize="md">{QUESTIONS[currentQuestionIndex].question}</Text>
        </Center>
      </HStack>
    );
  };
  const renderOptions = () => {
    return (
      <HStack>
        <Center flex={1} px="3">
          <Box w="90%">
            <FlatList
              data={Object.values(
                QUESTIONS[currentQuestionIndex].answers
              ).filter((a) => a != null)}
              renderItem={({ item }) => (
                <Button
                  onPress={() => validateAnswer(item)}
                  isDisabled={disableSelection}
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "gray.600",
                  }}
                  borderColor="coolGray.200"
                  backgroundColor={
                    item == correctOption
                      ? "green.600"
                      : item == selectedOption
                      ? "red.600"
                      : null
                  }
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
      </HStack>
    );
  };
  const renderNextQuestion = () => {
    if (showNextQuestion)
      return (
        <HStack>
          <Center flex={1} px="3">
            <Button
              onPress={handleNext}
              borderBottomWidth="1"
              _dark={{
                borderColor: "red.600",
              }}
              marginTop="20px"
              borderColor="coolGray.200"
              pl="4"
              pr="5"
              py="2"
            >
              Next
            </Button>
          </Center>
        </HStack>
      );
    return null;
  };

  return (
    <View>
      <HStack>
        <Center flex={1} px="3">
          <Text fontSize="md">
            {route.params.category}({route.params.limit})
          </Text>
        </Center>
      </HStack>
      <Progress value={(currentQuestionIndex * 100) / questionsLength} mx="4" />
      {renderQuestion()}
      {renderOptions()}
      {renderNextQuestion()}
    </View>
  );
}
