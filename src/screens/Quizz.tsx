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

export default function ({ navigation, route }: any) {
  const [questionsLength, setQuestionsLength] = useState(route.params.limit);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [score, setScore] = useState(0);
  const [correctOption, setCorrectOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [disableSelection, setDisableSelection] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isUp, setisUp] = useState(false);

  const getQuestions = async () => {
    try {
      const response = await fetch(
        `https://quizapi.io/api/v1/questions?apiKey=ttCsPaY6hL6nkzDOj5RmNbXD4s3CKPdWGpwLzmya&category=${route.params.category}&difficulty=${route.params.difficulty}&limit=${route.params.limit}`
      );
      const json = await response.json();
      setQuestions(json);
      setQuestionsLength(json.length);
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
    let index = Object.values(
      questions[currentQuestionIndex].correct_answers
    ).indexOf("true");
    if (index != -1) {
      let correctAnswer: any = Object.values(
        questions[currentQuestionIndex].answers
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
              data={Object.values(
                questions[currentQuestionIndex].answers
              ).filter((a) => a != null)}
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
