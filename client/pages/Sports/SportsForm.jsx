import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import { addSport, updateSport, getSport } from "../../actions/sports";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useRoute } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";

const SportsFormScreen = ({ addSport, updateSport, navigation, getSport }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [sportsId, setPortsId] = useState(null);

  const route = useRoute();
  const { id } = route.params;

  const getData = async () => {
    try {
      if (id) {
        const response = await getSport(id);
        setName(response.data?.name);
        setDescription(response.data?.description);
        setPortsId(response.data?.id);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async () => {
    const response = await updateSport(sportsId, { name, description });
    if (response.status === 200) {
      (() => navigation.navigate("Sports"))();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Form Example</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter Sports Name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={(text) => setDescription(text)}
          placeholder="Enter Description"
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>
          {sportsId !== null ? "Edit" : "Add"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
  },
  submitButton: {
    backgroundColor: "#051139",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

SportsFormScreen.propTypes = {
  addSport: PropTypes.func.isRequired,
  updateSport: PropTypes.func.isRequired,
  getSport: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tournament: state.tournament,
});

export default connect(mapStateToProps, { addSport, updateSport, getSport })(
  SportsFormScreen
);
