import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";

const Card = ({ icon, label, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.iconContainer}>{icon}</View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 200,
    backgroundColor: "#051139",
    borderRadius: 10,
    margin: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

export default Card;
