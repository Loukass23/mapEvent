import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from '../../constants/Colors';



const ClusterMarker = ({ count }) => (
    <View style={styles.container}>
        <View style={styles.bubble}>
            <Text style={styles.count}>{count}</Text>
        </View>
    </View>
);

export default ClusterMarker;

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignSelf: "flex-start"
    },
    bubble: {
        flex: 0,
        flexDirection: "row",
        alignSelf: "flex-start",
        backgroundColor: Colors.secondary,
        padding: 10,
        borderRadius: 15,
        borderColor: Colors.secondary,
        borderWidth: 1
    },
    count: {
        color: "#fff",
        fontSize: 13
    }
});
