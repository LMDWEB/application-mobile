import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Home from "../Screens/Home";
import Settings from "../Screens/Settings";
import config from "../config"

import { FontAwesome } from '@expo/vector-icons';

const options = {
    header: null
};

const HomeStackNavigator = createStackNavigator({
    Home : {
        screen: Home,
        navigationOptions : options
    }
});


const SettingsStackNavigator = createStackNavigator({

    Settings : {
        screen: Settings,
        navigationOptions: options
    },
});

const TabNavigator = createBottomTabNavigator({

        Home: {
            screen: HomeStackNavigator,
            navigationOptions: {
                title: 'Accueil',
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
                    return <FontAwesome name="futbol-o" size={20} color={tintColor} />
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

export default createAppContainer(TabNavigator)
