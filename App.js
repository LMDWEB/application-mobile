import React from 'react';
import { } from 'react-native';
import Navigation from './Navigation/Navigation'
import { AppLoading } from 'expo';
import moment from "moment/moment";
import 'moment/locale/fr'
import {Linking} from "react-native";
import config from './config'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    //this.registerForPushNotifications();
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    });
    this.setState({ loading: false });
  }

  render() {

    moment.locale('fr');

    if (this.state.loading) {
      return (
          <AppLoading
              onFinish={() => this.setState({ loading: false })}
          />
      );
    }

    return (
        <Navigation/>
    );
  }
}
