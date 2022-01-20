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
  AspectRatio,
  Image,
  Stack,
} from "native-base";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Animated } from "react-native";
import { escapeHtml } from "../utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../../config";

export default function ({ navigation, route }: any) {
  const [questionsLength, setQuestionsLength] = useState<number>(
    route.params.limit
  );
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
  const [level, setLevel] = useState("easy");

  const getQuestions = async () => {
    try {
      const amount = await AsyncStorage.getItem("amount");
      const level = await AsyncStorage.getItem("level");
      setLevel(JSON.parse(level));
      let url = `${config.API_URL}?amount=${amount}&category=${
        route.params.category
      }&difficulty=${JSON.parse(level)}&type=multiple`;
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
          <Box
            width="100%"
            bg="primary.50"
            borderWidth="4px"
            borderRadius="4px"
            borderColor="primary.500"
            _text={{
              fontSize: "md",
              fontWeight: "medium",
              color: "warmGray.50",
              letterSpacing: "lg",
            }}
            marginBottom="20px"
          >
            <Text bold italic fontSize="md" marginTop="5px" textAlign="center">
              {route.params.name}
            </Text>
            <Text bold italic fontSize="md" marginTop="5px" textAlign="center">
              mode : {level}
            </Text>
            <Text bold italic fontSize="md" marginTop="5px" textAlign="center">
              progress : {`${currentQuestionIndex} / ${questionsLength}`}
            </Text>
            <Progress
              value={(currentQuestionIndex * 100) / questionsLength}
              mx="4"
              size="md"
              marginTop="20px"
            />{" "}
          </Box>
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
            italic
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
      </>
    );
  };

  const goHome = () => {
    navigation.navigate("Welcome");
  };

  const renderNothing = () => {
    return (
      <Box
        maxW="100%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        marginTop="50px"
        borderWidth="1"
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            <Image
              source={require("../../assets/simpson.jpg")}
              alt="image"
              size={200}
              width="100%"
            />
          </AspectRatio>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1">
              Unsifficient API data
            </Heading>
          </Stack>
          <Text fontWeight="400">
            There is not enough questions in TriviaDB API for this category
          </Text>

          <Text fontWeight="400">
            Please try to change the number of questions or the category.
          </Text>
        </Stack>
        <Center>
          <Button
            onPress={goHome}
            borderBottomWidth="1"
            marginTop="20px"
            borderColor="coolGray.200"
            pl="4"
            pr="5"
            py="2"
          >
            Go Back
          </Button>
        </Center>
      </Box>
    );
  };
  return (
    <View>
      {isUp && questionsLength == 0 && renderNothing()}
      {isUp && questionsLength != 0 && renderQuestion()}
      {isUp && questionsLength != 0 && renderOptions()}
      {isUp && questionsLength != 0 && renderNextQuestion()}
    </View>
  );
}
