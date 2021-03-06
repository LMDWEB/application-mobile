import React from 'react';
import { createStackNavigator, createAppContainer, createBottomTabNavigator} from "react-navigation";
import News from "../Screens/News";
import NewsDetail from "../Components/NewsDetail";
import Ranking from "../Screens/Ranking";
import LeagueDetail from "../Components/LeagueDetail";
import Matchs from "../Screens/Matchs";
import MatchDetail from "../Components/MatchDetail";
import Settings from "../Screens/Settings";
import Login from '../Screens/Login'
import Account from '../Screens/Account'
import config from "../config"

import { FontAwesome } from '@expo/vector-icons';

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
    },

    Account : {
        screen: Account,
        navigationOptions : options
    }
});


const RankingStackNavigator = createStackNavigator({

    Ranking : {
        screen: Ranking,
        navigationOptions: options
    },

    LeagueDetail : {
        screen: LeagueDetail,
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
    },
    Login : {
        screen: Login,
        navigationOptions: options
    }
});

const SettingsStackNavigator = createStackNavigator({

    Settings : {
        screen: Settings,
        navigationOptions: options
    },

    Login : {
        screen: Login,
        navigationOptions: options
    },

    Account:{
        screen: Account,
        navigationOptions: options
    }
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

export default createAppContainer(TabNavigator)
