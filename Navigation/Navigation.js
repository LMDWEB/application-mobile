import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Home from "../Screens/Home";
import News from "../Screens/News";
import NewsDetail from "../Components/NewsDetail";
import Ranking from "../Screens/Ranking";
import Matchs from "../Screens/Matchs";
import Settings from "../Screens/Settings";
import config from "../config"

import { FontAwesome } from '@expo/vector-icons';

const options = {
    header: null
};

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
});

const MatchsStackNavigator = createStackNavigator({

    Matchs : {
        screen: Matchs,
        navigationOptions: options
    },
});

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
