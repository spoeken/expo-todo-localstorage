import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import styles from "../theme/styles";

const STORAGE_KEY = "@todos";

const Todos = () => {
  const [todoList, setTodoList] = useState({});
  const [inputText, setInputText] = useState(null);

  // 1. Lese local storage og bruke den om den ikke er null

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        console.log("jsonValue from store", jsonValue);
        if (jsonValue != null) {
          const parsedJson = JSON.parse(jsonValue);
          setTodoList(parsedJson);
        }
      } catch (e) {
        // error reading value
      }
    };
    getData();
  }, []);

  useEffect(() => {
    console.log("changed");
    const storeData = async (value) => {
      try {
        const jsonValue = JSON.stringify(value);
        console.log("jsonValue", jsonValue);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } catch (e) {
        // saving error
        console.log("ERROR: Could not store in localstorage");
      }
    };
    storeData(todoList);
  }, [todoList]);

  // 2. Skrive til localstorage
  const handleAddTodo = () => {
    if (inputText) {
      const todo = { text: inputText, checked: false };

      setInputText("");
      setTodoList((prevState) => {
        // Create unique id
        const uid = Date.now();
        const newState = prevState;
        newState[uid] = todo;

        return newState;
      });
    }
  };

  // 3. Slette

  return (
    <ScrollView style={[{ flex: 1, marginTop: Constants.statusBarHeight }]}>
      <View
        style={{
          justifyContent: "center",
          alignSelf: "stretch",
        }}
      >
        <TextInput
          onChangeText={(text) => {
            setInputText(text);
          }}
          onSubmitEditing={handleAddTodo}
          value={inputText}
          style={[styles.textInput, { width: 400 }]}
        />
      </View>
      {Object.keys(todoList).map((key) => {
        const item = todoList[key];

        return <Text key={key}>{item.text}</Text>;
      })}

      <TouchableOpacity
        onPress={() => {
          const getData = async () => {
            try {
              const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
              console.log("jsonValue from store", jsonValue);
              if (jsonValue != null) {
                const parsedJson = JSON.parse(jsonValue);
                // setTodoList(parsedJson);
              }
            } catch (e) {
              // error reading value
            }
          };
          getData();
        }}
      >
        <Text>PRESS ME</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Todos;
