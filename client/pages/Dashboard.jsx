import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Card from "./../components/Card";
import LogoutCard from "../components/LogoutCard";
import { logout } from "../actions/auth";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const DashboardScreen = ({ logout, navigation }) => {
  const data = [
    {
      id: "1",
      icon: <Icon name="soccer-ball-o" color={"white"} size={100} />,
      label: "Sports",
      action: () => navigation.navigate("Sports"),
    },
    {
      id: "2",
      icon: <Icon name="trophy" color={"white"} size={100} />,
      label: "Tournaments",
      action: () => navigation.navigate("Tournaments"),
    },
  ];

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.heading}>DashboardScreen</Text>
      </View> */}
      <View style={styles.cards}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          horizontal={false}
          style={styles.list}
          renderItem={({ item }) => (
            <Card icon={item.icon} label={item.label} onPress={item.action} />
          )}
        />
      </View>

      <LogoutCard
        icon={<Icon name="sign-out" size={25} />}
        label="Logout"
        onPress={() => {
          logout();
          navigation.navigate("Login");
        }}
        style={styles.logoutButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  cards: {
    flex: 1,
    padding: 20,
  },
  list: {
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  },
  logoutButton: {
    width: "100%",
    alignSelf: "flex-end",
    marginTop: "auto",
    backgroundColor: "#FF3B30",
  },
});

DashboardScreen.propTypes = {
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { logout })(DashboardScreen);
