import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import styles from "./styles/users.style";

export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/students");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <View style={styles.container}>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <ScrollView>
          {users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <Text style={styles.name}>
                {user.firstName} {user.lastName}
              </Text>
              <Text>
                {user.course} - Year {user.year}
              </Text>
              <Text>Age: {user.age}</Text>
              <Text>Phone: {user.phoneNumber}</Text>
            </View>
          ))}
        </ScrollView>
      )}

      <Button title="Add Student" onPress={() => navigation.navigate("Sign-Up")} />
    </View>
  );
}
