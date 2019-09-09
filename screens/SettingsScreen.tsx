
import React, { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import MenuButton from "../components/navigation/MenuButton";

interface Props {
    navigation: any
}
export const SettingsScreen: FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Details Screen</Text>
            <MenuButton navigation={navigation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});