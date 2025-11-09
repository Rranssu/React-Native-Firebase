import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import styles from "./styles/users.style";

export default function Users({ navigation }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/display/students");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
              await fetch(`http://localhost:3000/modify/students/${id}`, {
                method: "DELETE",
              });
              setUsers(users.filter((user) => user.id !== id));
            } catch (err) {
              console.error("Error deleting user:", err);
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

              <View style={{ marginTop: 10 }}>
                <Button
                  title="Delete"
                  color="red"
                  onPress={() => handleDelete(user.id)}
                />
              </View>
            </View>
          ))}
        </ScrollView>
      )}

      <Button
        title="Add Student"
        onPress={() => navigation.navigate("Sign-Up")}
      />
    </View>
  );
}
