
import React, { FC, useContext } from "react";
import { StyleSheet, Text, View, ScrollView, Slider, Button } from "react-native";
import MenuButton from "../components/navigation/MenuButton";
import { EventContext } from "../context/EventContext";
// import { Colors } from "react-native/Libraries/NewAppScreen";


interface Props {
    navigation: any
}
export const SettingsScreen: FC<Props> = ({ navigation }) => {
    const { handleSetRadius, radius } = useContext(EventContext)

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Settings</Text>
            <MenuButton navigation={navigation} />

            <ScrollView
                style={styles.scrollview}
                contentContainerStyle={styles.contentContainer}>
                {/* <View style={styles.welcomeContainer} >
              <CheckboxFormX
                iconColor={Colors.primary}
                style={{ width: '90%', height: 40 }}
                dataSource={mockData}
                itemShowKey="label"
                itemCheckedKey="RNchecked"
                iconSize={16}
                formHorizontal={true}
                labelHorizontal={false}
                onChecked={(item) => this._onSelect(item)}
              />
            </View> */}
                <View style={styles.welcomeContainer}>
                    <Text>Radius: {radius}m</Text>
                    <Slider
                        onValueChange={(radius) => handleSetRadius(radius)}
                        style={{ width: 200, height: 40 }}
                        value={radius}
                        step={50}
                        minimumValue={5}
                        maximumValue={10000}
                        minimumTrackTintColor="#000000"
                    // maximumTrackTintColor={Colors.primary}
                    />

                </View>
            </ScrollView>

            <View style={styles.footer}>
                <View style={styles.containerRow}  >
                    <Text >Not {'username'} ?</Text>

                    <Button
                        // style={styles.button3}
                        onPress={() => console.log('log out')}
                        title="LOG OUT"
                        // color={Colors.primary}
                        accessibilityLabel="Log Out"
                    />
                </View>
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: Colors.background,
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        margin: 10
    },

    scrollview: {
        marginTop: 1,
        flex: .8,
    },
    footer: {
        flex: .15,
        marginBottom: 5,
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 30,
    },
    containerRow: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    button3: {
        flex: .3,
        // backgroundColor: Colors.secondary,
        width: 50,

    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },
});