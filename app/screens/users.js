import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from "react-native";

export default function UsersListScreen({ navigation }) {
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
      <Text style={styles.title}>Student Lists</Text>
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
      <Button
        title="Sign Out"
        onPress={() => navigation.navigate("Signup")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  userCard: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  name: { fontSize: 18, fontWeight: "600" },
});