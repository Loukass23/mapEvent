import React, { FC } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { colors } from 'react-native-elements';

interface Props {
    navigation: any
}
const MenuDrawer: FC<Props> = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Event App</Text>
        </View>
    );
};

export default MenuDrawer
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "grey"

    },
    title: {
        color: 'white',
        fontSize: 20,
        textAlign: "center",
        margin: 10
    }
});