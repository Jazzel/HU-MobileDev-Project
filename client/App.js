import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./pages/Auth/Login";
import RegisterScreen from "./pages/Auth/Register";
import { Provider } from "react-redux";
import store from "./store";
import DashboardScreen from "./pages/Dashboard";
import SportsScreen from "./pages/Sports/Sports";
import TournamentsScreen from "./pages/Tournaments/Tournaments";
import SportsFormScreen from "./pages/Sports/SportsForm";
import TournamentsForm from "./pages/Tournaments/TournamentsForm";

// export const HOST = "http://192.168.0.104:5000/api";
export const HOST = "http://10.20.5.197:5000/api";

const Stack = createStackNavigator();

export const fixDate = (isoDate) => {
  const date = new Date(isoDate);

  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = date.toLocaleDateString(undefined, options);
  return formattedDate;
};

export const fixDataForInputField = (dbDate) => {
  const date = new Date(dbDate);

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const App = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: "Login", headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ title: "Register", headerShown: false }}
            />
            <Stack.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: "Dashboard" }}
            />
            <Stack.Screen
              name="Sports"
              component={SportsScreen}
              options={{ title: "Sports" }}
            />
            <Stack.Screen
              name="Tournaments"
              component={TournamentsScreen}
              options={{ title: "Tournaments" }}
            />
            <Stack.Screen
              name="SportsForm"
              component={SportsFormScreen}
              options={{ title: "SportsForm" }}
            />
            <Stack.Screen
              name="TournamentsForm"
              component={TournamentsForm}
              options={{ title: "TournamentsForm" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
};

export default App;
