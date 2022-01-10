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
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Animated } from "react-native";

function escapeHtml(text: String) {
  return text
    .replace(/&amp;/gi, "&")
    .replace(/&gt;/gi, ">")
    .replace(/&lt;/gi, "<")
    .replace(/&quot;/gi, '"')
    .replace(/&#039;/gi, "'");
}

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
  const [expireTimer, setExpireTimer] = useState(false);
  const [key, setKey] = useState(0);

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
      setKey((prevKey) => prevKey + 1);
      setExpireTimer(false);
    }
  };

  const validateAnswer = (option: any) => {
    setExpireTimer(true);
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
          <CountdownCircleTimer
            isPlaying={!expireTimer}
            onComplete={() => {
              setExpireTimer(true);
              handleNext();
              return [true, 1000];
            }}
            size={80}
            key={key}
            duration={30}
            colors="#ef4444"
          >
            {({ remainingTime, animatedColor }) => (
              <Animated.Text style={{ color: animatedColor }}>
                {remainingTime}
              </Animated.Text>
            )}
          </CountdownCircleTimer>
          <Heading
            fontSize="md"
            w="80%"
            marginTop="20px"
            justifyContent="center"
          >
            {escapeHtml(questions[currentQuestionIndex].question)}
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
                  isDisabled={disableSelection || expireTimer}
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
                  {escapeHtml(item)}
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
    return (
      <>
        <HStack>
          <Center flex={1} px="3">
            <Button
              onPress={handleNext}
              isDisabled={!showNextQuestion}
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
        <Box marginTop="10px">
          <Text
            bold
            fontSize="md"
            marginTop="5px"
            textAlign="center"
          >{`${currentQuestionIndex} / ${questionsLength}`}</Text>
          <Progress
            value={(currentQuestionIndex * 100) / questionsLength}
            mx="4"
            size="md"
            marginTop="20px"
          />
        </Box>
      </>
    );
  };

  return (
    <View>
      {isUp && renderQuestion()}
      {isUp && renderOptions()}
      {isUp && renderNextQuestion()}
    </View>
  );
}
