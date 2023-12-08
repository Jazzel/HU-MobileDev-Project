import React, { useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TextInput, Button, Text } from "react-native-paper";

import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const RegisterScreen = ({ navigation, register }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    const response = await register(name, email, password, "admin");
    console.log(response);

    if (response.status === 200) {
      navigation.navigate("Dashboard");
    }
    console.log("Registering in with:", email, password);
  };

  return (
    <ImageBackground
      source={require("../../assets/background.jpg")}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.heading}>Sports Pulse</Text>
          <Text style={styles.subheading}>Register</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={(text) => setName(text)}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: "white" } }}
          />
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
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.registerLink}>Already a user ? Login.</Text>
          </TouchableOpacity>
          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            labelStyle={{ color: "white" }}
          >
            Register
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

RegisterScreen.propTypes = {
  register: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { register })(RegisterScreen);
