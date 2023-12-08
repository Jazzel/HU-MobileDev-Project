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
import { getTournaments, deleteTournament } from "../../actions/tournaments";

const TournamentsScreen = ({ getTournaments, deleteTournament }) => {
  const navigation = useNavigation();

  const [tournaments, setTournaments] = useState([]);

  const getData = async () => {
    try {
      const response = await getTournaments();
      setTournaments(response.data);
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
              const response = await deleteTournament(id);
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

  const handleTournamentFormNavigation = (id = 0) => {
    (() => navigation.navigate("TournamentsForm", { id }))();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Tournaments Listing</Text>

      <FlatList
        data={tournaments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.column}>{item.id}</Text>
            <Text style={styles.column}>{item.name}</Text>
            <View style={styles.actionsContainer}>
              <TouchableOpacity
                onPress={() => handleTournamentFormNavigation(item.id)}
              >
                <Icon
                  name="eye"
                  size={20}
                  color="blue"
                  style={styles.actionIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleTournamentFormNavigation(item.id)}
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
        onPress={() => handleTournamentFormNavigation(0)}
      >
        <Text style={styles.addButtonLabel}>Add Tournament</Text>
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

TournamentsScreen.propTypes = {
  getTournaments: PropTypes.func.isRequired,
  deleteTournament: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  tournaments: state.tournaments,
});

export default connect(mapStateToProps, { getTournaments, deleteTournament })(
  TournamentsScreen
);
