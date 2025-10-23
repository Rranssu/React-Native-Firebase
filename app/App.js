import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignupScreen from "./screens/signup";
import UsersListScreen from "./screens/users";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Sign-Up">
        <Stack.Screen name="Sign-Up" component={SignupScreen} />
        <Stack.Screen name="StudentS" component={UsersListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}