import React from 'react';
import { SafeAreaView, View, Image, ScrollView, AsyncStorage, Text} from 'react-native';
import { createStackNavigator, createAppContainer, createBottomTabNavigator, createDrawerNavigator, DrawerItems, createSwitchNavigator } from "react-navigation";
import News from "../Screens/News";
import NewsDetail from "../Components/NewsDetail";
import Ranking from "../Screens/Ranking";
import LeagueMatchs from "../Components/LeagueMatchs";
import Matchs from "../Screens/Matchs";
import MatchDetail from "../Components/MatchDetail";
import Settings from "../Screens/Settings";
import Login from '../Screens/Login'
import config from "../config"

import { FontAwesome } from '@expo/vector-icons';
import {WebBrowser} from "expo";

const options = {
    header: null
};

// Stack Navigator

const NewsStackNavigator = createStackNavigator({
    News : {
        screen: News,
        navigationOptions : options
    },

    NewsDetail : {
        screen: NewsDetail,
        navigationOptions : options
    }
});


const RankingStackNavigator = createStackNavigator({

    Ranking : {
        screen: Ranking,
        navigationOptions: options
    },

    LeagueMatchs : {
        screen: LeagueMatchs,
        navigationOptions: options
    },

    MatchDetail : {
        screen: MatchDetail,
        navigationOptions: options
    }
});

const MatchsStackNavigator = createStackNavigator({

    Matchs : {
        screen: Matchs,
        navigationOptions: options
    },

    MatchDetail : {
        screen: MatchDetail,
        navigationOptions: options
    }
});

const SettingsStackNavigator = createStackNavigator({

    Settings : {
        screen: Settings,
        navigationOptions: options
    },
});

// Tab Navigator

const TabNavigator = createBottomTabNavigator({

        News: {
            screen: NewsStackNavigator,
            navigationOptions: {
                title: 'News',
                tabBarIcon: ({tintColor}) => {
                    return <FontAwesome name="newspaper-o" size={20} color={tintColor} />
                }

            }
        },

        Ranking : {
            screen: RankingStackNavigator,
            navigationOptions: {
                title: 'Classement',
                tabBarIcon: ({tintColor}) => {
                    return <FontAwesome name="bar-chart" size={20} color={tintColor} />
                }
            }
        },

        Matchs : {
            screen: MatchsStackNavigator,
            navigationOptions: {
                title: 'Matchs',
                tabBarIcon: ({tintColor}) => {
                    return <FontAwesome name="futbol-o" size={20} color={tintColor} />
                }
            }
        },

        Settings : {
            screen: SettingsStackNavigator,
            navigationOptions: {
                title: 'Paramètres',
                tabBarIcon: ({tintColor}) => {
                    return <FontAwesome name="cog" size={20} color={tintColor} />
                }
            }
        }
    },

    {
        tabBarOptions: {
            activeBackgroundColor: 'white',
            inactiveBackgroundColor: '#0000',
            activeTintColor : config.primary_color ,
            inactiveTintColor : '#a0a0a0',
            showLabel: true,
            showIcon: true
        }
    }

);


// Drawer Navigator

const AvatarComponent = (props) => (
 <SafeAreaView style={{flex:1}}>
     <View style={{height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
         <Image source={require('../assets/avatar-default.jpg')} style={{height: 120, width: 120, borderRadius: 60}}/>
     </View>
     <ScrollView>
         <DrawerItems {...props}/>
     </ScrollView>
 </SafeAreaView>
);

const RegisterComponent = (props) => (
    <View onPress={() => console.log(AsyncStorage.getAllKeys())}>
        <Text>Inscription</Text>
    </View>
);

const LogoutComponent = (props) => (
    <View onPress={() => AsyncStorage.removeItem('JWT')}>
        <Text style={{color:'red'}}>Deconnexion</Text>
    </View>
);

const AuthenticateStack = createStackNavigator({ Home: NewsStackNavigator, Deconnexion: LogoutComponent });
const DisconnectesStack = createStackNavigator({ Connexion: LogoutComponent, Inscription: RegisterComponent });

const DrawerNavigator = createDrawerNavigator({
   Home:TabNavigator,
   Login: Login,
   Inscription: RegisterComponent,
   Logout: LogoutComponent,
}, {
        contentComponent: AvatarComponent
    });

export default createAppContainer(DrawerNavigator)