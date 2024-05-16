import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [proteinAmount, setProteinAmount] = useState(0);

  function AddAmount(amount) {
    setProteinAmount(proteinAmount + amount);
  }

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("proteinAmount", value);
    } catch (e) {
      // saving error
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("proteinAmount");
      if (value !== null) {
        setProteinAmount(value)
      }
    } catch (e) {
      // error reading value
    }
  };

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    storeData(proteinAmount)
  }, [proteinAmount])
  
  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFFFFF", fontSize: 24, margin: 25 }}>
        {proteinAmount} grams
      </Text>
      <Pressable style={styles.button} onPress={() => AddAmount(5)}>
        <Text style={{ color: "#FFFFFF" }}>Add 5</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => AddAmount(10)}>
        <Text style={{ color: "#FFFFFF" }}>Add 10</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => AddAmount(20)}>
        <Text style={{ color: "#FFFFFF" }}>Add 20</Text>
      </Pressable>
      <Pressable style={styles.button} onPress={() => AddAmount(25)}>
        <Text style={{ color: "#FFFFFF" }}>Add 25</Text>
      </Pressable>
      <Pressable style={styles.resetButton} onPress={() => setProteinAmount(0)}>
        <Text style={{ color: "#FFFFFF" }}>Reset</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#262626",
    alignItems: "center",
    justifyContent: "center",
  },
  resetButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginBottom: 5,
    backgroundColor: "#73003B",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    marginBottom: 5,
    backgroundColor: "black",
  },
});
