import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, Button, Text } from "react-native-paper";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import { setAlert } from "../../actions/alert";

const LoginScreen = ({ navigation, login, setAlert, isAuthenticated }) => {
  const [email, setEmail] = useState("jazzelmehmood5@gmail.com");
  const [password, setPassword] = useState("Mpower1234");

  const handleLogin = async () => {
    const response = await login(email, password);

    if (response.status === 200) {
      navigation.navigate("Dashboard");
    }
    console.log("Logging in with:", email, password);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Sports Pulse</Text>
          <Text style={styles.subheading}>Login</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            label="Email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: "white" } }}
          />
          <TextInput
            label="Password"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: "white" } }}
          />
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.registerLink}>New here ? Register.</Text>
          </TouchableOpacity>
          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            labelStyle={{ color: "white" }}
          >
            Login
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  heading: {
    fontSize: 36,
    color: "white",
    fontWeight: "bold",
  },
  subheading: {
    fontSize: 24,
    color: "white",
  },
  formContainer: {
    width: "80%",
    maxWidth: 400,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 20,
    borderRadius: 10,
  },
  input: {
    marginVertical: 10,
    backgroundColor: "transparent",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#051139",
  },
});

LoginScreen.propTypes = {
  login: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login, setAlert })(LoginScreen);
