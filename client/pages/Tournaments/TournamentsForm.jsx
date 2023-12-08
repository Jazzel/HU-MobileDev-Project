import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

import {
  addTournament,
  updateTournament,
  getTournament,
} from "../../actions/tournaments";
import { getSports } from "../../actions/sports";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useRoute } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import { fixDataForInputField } from "../../App";

const TournamentsFormScreen = ({
  addTournament,
  updateTournament,
  getTournament,
  navigation,
  getSports,
}) => {
  const [name, setName] = useState("Test");
  const [sport, setSport] = useState("Test");
  const [startDate, setStartDate] = useState(new Date().toISOString());
  const [endDate, setEndDate] = useState(new Date().toISOString());
  const [description, setDescription] = useState("Test");
  const [sportsId, setPortsId] = useState(null);

  const [sports, setSports] = useState([]);

  const route = useRoute();

  const { id } = route.params;
  const getData = async () => {
    try {
      const responseSports = await getSports();
      if (id) {
        console.log("Running");
        const response = await getTournament(id);
        setName(response.data?.name);
        setSport(response.data?.sport);
        setStartDate(response.data?.start_date);
        setEndDate(response.data?.end_date);
        setDescription(response.data?.description);
        setPortsId(response.data?.id);
      }
      setSports(responseSports.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFormSubmit = async () => {
    let response = await updateTournament(sportsId, {
      sportsId,
      name,
      sport,
      start_date: startDate,
      end_date: endDate,
      description,
    });
    if (response.status === 200) {
      (() => navigation.navigate("Tournaments"))();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tournament Form</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Name:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={(text) => setName(text)}
          placeholder="Enter Tournament Name"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Sport:</Text>
        <Picker
          selectedValue={sport}
          onValueChange={(itemValue) => setSport(itemValue)}
          style={styles.picker}
        >
          {sports.map((sport) => (
            <Picker.Item
              key={sport.id}
              label={sport.name}
              value={sport.id}
              style={styles.pickerItem}
            />
          ))}
        </Picker>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Start Date:</Text>
        <TextInput
          style={styles.input}
          value={startDate}
          onChangeText={(text) => setStartDate(text)}
          placeholder="Enter Start Date"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>End Date:</Text>
        <TextInput
          style={styles.input}
          value={endDate}
          onChangeText={(text) => setEndDate(text)}
          placeholder="Enter End Date"
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
        <Text style={styles.buttonText}>{id ? "Edit" : "Add"}</Text>
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
  picker: {
    borderWidth: 1,
    borderColor: "#ddd",
    height: 40,
    padding: 10,
    borderRadius: 5,
    color: "#000",
  },
  pickerItem: {
    color: "#000",
    fontSize: 16,
  },
  selectedValue: {
    marginTop: 20,
    fontSize: 18,
  },
});

TournamentsFormScreen.propTypes = {
  addTournament: PropTypes.func.isRequired,
  updateTournament: PropTypes.func.isRequired,
  getTournament: PropTypes.func.isRequired,
  getSports: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tournament: state.tournament,
});

export default connect(mapStateToProps, {
  addTournament,
  updateTournament,
  getTournament,
  getSports,
})(TournamentsFormScreen);
