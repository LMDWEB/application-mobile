import React from 'react'
import {View, ScrollView, ActivityIndicator, FlatList, NetInfo, TouchableOpacity, RefreshControl, StatusBar, Platform} from 'react-native'
import styles from '../Style/Style'
import {Container, Header, Title, Content, Left, Right, Body, Text, Separator, Button, Icon} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import config from '../config'
import Match from "../Components/Match";
import matchs from '../Api/Matchs'

class Matchs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matchsOnline: [],
            matchsEnded: [],
            matchsFuture: [],
            isOnline: true,
            isLoading : false,
            refreshing: false,
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: false});
        this._load();
    };

    _load () {

        this.setState({ isLoading: true});

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                this.setState({
                    matchOnline: matchs,
                    matchsEnded: matchs,
                    matchsFuture: matchs,
                    isLoading: false,
                    isOnline: true,
                    refreshing: false
                });
            } else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });
    }

    componentDidMount() {

        this._navListener = this.props.navigation.addListener('didFocus', () => {
            (Platform.OS === 'android') ? StatusBar.setTranslucent(false) : null;
            (Platform.OS === 'android') ? StatusBar.setBackgroundColor(config.primary_color) : null;
        });

        this._load()
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }
    }

    _displayOffline () {

        if (!this.state.isOnline && !this.state.isLoading) {
            return (
                <View style={styles.offline_container}>
                    <Text style={styles.offline_text}>Vous êtes hors connexion</Text>
                    <FontAwesome  name='signal' size={70} color={'grey'} />
                    <TouchableOpacity style={styles.offline_button} onPress={() => this._load()}>
                        <Text>Recharger</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    _displayDetail = (id) => {
        this.props.navigation.push('MatchDetail', { id: id })
    };

    _displayMatchs () {
        if (this.state.isOnline && !this.state.isLoading) {
            return (
                <ScrollView refreshControl={<RefreshControl style={{backgroundColor: 'transparent'}} refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
                    <View style={styles.main_container}>
                        <Text style={styles.title}>Match en cours</Text>
                        <FlatList
                            data={matchs.slice(0,4)}
                            keyExtractor={(item) => item.fixture_id}
                            renderItem={({item}) => <Match data={item} displayDetail={this._displayDetail} ></Match>}
                        />
                        <Text style={styles.title}>Match terminé</Text>
                        <FlatList
                            data={matchs.slice(2,5)}
                            keyExtractor={(item) => item.fixture_id}
                            renderItem={({item}) => <Match data={item} displayDetail={this._displayDetail} ></Match>}
                        />
                        <Text style={styles.title}>Match à venir</Text>
                        <FlatList
                            data={matchs.slice(2,6)}
                            keyExtractor={(item) => item.fixture_id}
                            renderItem={({item}) => <Match data={item} displayDetail={this._displayDetail} ></Match>}
                        />
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: config.primary_color }}>
                    <Left>
                        <Button transparent>
                            <Icon style={{color:'white',marginLeft: 10}} name='menu' onPress={ () => this.props.navigation.openDrawer()} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'white'}}>Matchs</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <Content contentContainerStyle={{flex: 1}}>
                        {this._displayLoading()}
                        {this._displayOffline()}
                        {this._displayMatchs()}
                    </Content>
                </View>
            </Container>
        )
    }
}

export default Matchs
