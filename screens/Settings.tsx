import {
  Container,
  Button,
  Text,
  Left,
  Centered,
  TopCentered,
} from '../shared/styledComponents';
import { routes, colors, buttons, placeholders } from '../shared/constants';

import React, { FC, useContext } from "react";
import { StyleSheet, View, ScrollView, Slider, Dimensions } from "react-native";
import MenuButton from "../components/navigation/MenuButton";
import { EventContext } from "../context/EventContext";
import { AuthContext } from "../context/AuthContext";
// import { Colors } from "react-native/Libraries/NewAppScreen";
const { height, width } = Dimensions.get('window');
import { titles } from '../shared'

interface Props {
  navigation: any
}
export const Settings: FC<Props> = ({ navigation }) => {
  const { height, width } = Dimensions.get('window');
  const { handleSetRadius, radius } = useContext(EventContext)
  const { signOut, user } = useContext(AuthContext)

  return (
    <Container>
      <Centered>
        <Left>
          <MenuButton navigation={navigation} />
        </Left>
      </Centered>
      <Container>
        <TopCentered>
          <Centered>
            <Text>{titles.settings}</Text>
          </Centered>

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
          <Centered>
            <Text>Radius: {radius}m</Text>
            <Slider
              onValueChange={(radius) => handleSetRadius(radius)}
              style={styles.slider}
              value={radius}
              step={50}
              minimumValue={5}
              maximumValue={10000}
              minimumTrackTintColor="#000000"
            // maximumTrackTintColor={Colors.primary}
            />
          </Centered>
        </TopCentered>
      </Container>
    </Container >
  );
};
export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: Colors.background,
  },
  slider: {
    width: width * 0.9,
    height: 40
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