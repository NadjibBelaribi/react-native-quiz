import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Center,
  Box,
  FlatList,
  Progress,
  Heading,
  Button,
  HStack,
} from "native-base";

const QUESTIONS = {
  response_code: 0,
  results: [
    {
      category: "Art",
      type: "multiple",
      difficulty: "hard",
      question:
        "What year did Albrecht D&uuml;rer create the painting &quot;The Young Hare&quot;?",
      correct_answer: "1502",
      incorrect_answers: ["1702", "1402", "1602"],
    },
    {
      category: "Art",
      type: "multiple",
      difficulty: "easy",
      question: "Who painted The Starry Night?",
      correct_answer: "Vincent van Gogh",
      incorrect_answers: ["Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    },
  ],
};

export default function ({ navigation, route }: any) {
  const [questionsLength, setQuestionsLength] = useState(route.params.limit);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [correctOption, setCorrectOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [disableSelection, setDisableSelection] = useState(false);
  const [questions, setQuestions] = useState<Object[]>([]);
  const [isUp, setisUp] = useState(false);

  const getQuestions = async () => {
    try {
      let url = `https://opentdb.com/api.php?amount=${route.params.limit}&category=${route.params.category}&difficulty=${route.params.difficulty}&type=multiple`;
      console.log(url);
      const response = await fetch(url);
      let quests = await response.json();
      quests = quests.results;
      quests.forEach((element: any) => {
        element.incorrect_answers = element.correct_answer
          .split("  ")
          .concat(element.incorrect_answers)
          .sort(() => 0.5 - Math.random());
      });
      setQuestions(quests);
      setQuestionsLength(quests.length);
      setisUp(true);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

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
    setCorrectOption(questions[currentQuestionIndex].correct_answer);
    setDisableSelection(true);
    setSelectedOption(option);

    if (option == questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    setShowNextQuestion(true);
  };

  const renderQuestion = () => {
    return (
      <HStack marginTop="20px">
        <Center flex={1} px="3">
          <Heading fontSize="sm" w="80%">
            {questions[currentQuestionIndex].question}
          </Heading>
        </Center>
      </HStack>
    );
  };
  const renderOptions = () => {
    return (
      <HStack marginTop="20px">
        <Center flex={1} px="3">
          <Box w="90%">
            <FlatList
              data={questions[currentQuestionIndex].incorrect_answers}
              renderItem={({ item }) => (
                <Button
                  onPress={() => validateAnswer(item)}
                  isDisabled={disableSelection}
                  borderBottomWidth="1"
                  marginBottom="10px"
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
      <Progress
        value={(currentQuestionIndex * 100) / questionsLength}
        mx="4"
        marginTop="20px"
      />
      {isUp && renderQuestion()}
      {isUp && renderOptions()}
      {isUp && renderNextQuestion()}
    </View>
  );
}
