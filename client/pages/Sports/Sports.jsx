import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSports, deleteSport } from "../../actions/sports";

const SportsScreen = ({ getSports, deleteSport }) => {
  const navigation = useNavigation();

  const [sports, setSports] = useState([]);

  const getData = async () => {
    try {
      const response = await getSports();
      setSports(response.data);
    } catch (err) {
      alert(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, [navigation])
  );

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = async (id) => {
    try {
      Alert.alert(
        "Confirmation",
        "Are you sure you want to delete?",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "OK",
            onPress: async () => {
              const response = await deleteSport(id);
              if (response.status === 200) {
                getData();
              }
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      const errors = error.response.data;
      setAlert(errors.msg, "danger");
    }
  };

  const handleSportFormNavigation = (id = 0) => {
    (() => navigation.navigate("SportsForm", { id }))();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Sports Listing</Text>

      <FlatList
        data={sports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.id}</Text>
            <Text style={styles.column}>{item.name}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={() => handleSportFormNavigation(item.id)}
              >
                <Icon
                  name="eye"
                  size={20}
                  color="blue"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleSportFormNavigation(item.id)}
              >
                <Icon
                  name="edit"
                  size={20}
                  color="green"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Icon
                  name="trash"
                  size={20}
                  color="red"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleSportFormNavigation(0)}
      >
        <Text style={styles.addButtonLabel}>Add Sport</Text>
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  column: {
    flex: 1,
  },
  actionsContainer: {
    flexDirection: "row",
  },
  actionIcon: {
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: "#051139",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  addButtonLabel: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

SportsScreen.propTypes = {
  getSports: PropTypes.func.isRequired,
  deleteSport: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  sports: state.sports,
});

export default connect(mapStateToProps, { getSports, deleteSport })(
  SportsScreen
);
