import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, ScrollView } from "react-native";
import styles from "./styles/signup.style";

export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [age, setAge] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSignup = async () => {
    if (!firstName || !lastName || !course || !year || !age || !phoneNumber) {
      Alert.alert("Missing fields", "Please fill in all fields");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/students", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, course, year, age, phoneNumber }),
      });

      if (res.ok) {
        Alert.alert("Success", "User added successfully!");
        console.log("User added successfully");
        navigation.replace("Students");
      } else {
        Alert.alert("Failed", "Could not add user.");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Failed to connect to server.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register A Student</Text>

      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Course" value={course} onChangeText={setCourse} />
      <TextInput style={styles.input} placeholder="Year" keyboardType="numeric" value={year} onChangeText={setYear} />
      <TextInput style={styles.input} placeholder="Age" keyboardType="numeric" value={age} onChangeText={setAge} />
      <TextInput style={styles.input} placeholder="Phone Number" keyboardType="phone-pad" value={phoneNumber} onChangeText={setPhoneNumber} />
      <Button styles={styles.buttons} title="Add Student" onPress={handleSignup} />

      
    </ScrollView>
  );
}
