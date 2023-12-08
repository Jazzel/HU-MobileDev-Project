import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const LogoutCard = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.logoutCard} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutCard: {
    backgroundColor: "white",
    padding: 15,
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default LogoutCard;
