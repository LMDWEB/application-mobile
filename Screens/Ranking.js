import React from 'react'
import {
    View,
    ScrollView,
    ActivityIndicator,
    FlatList,
    NetInfo,
    TouchableOpacity,
    RefreshControl,
    StatusBar,
    Platform,
} from 'react-native'
import styles from '../Style/Style'
import {Container, Header, Title, Content, Left, Right, Body, Text} from 'native-base';
import League from "../Components/League"
import {getLeagues} from "../Api/Lmdfoot"
import { FontAwesome } from '@expo/vector-icons';
import config from '../config'

class Ranking extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            leagues : [],
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
                getLeagues(config.admin_jwt).then(data => {
                    this.setState({
                        leagues : data,
                        isLoading: false,
                        isOnline: true,
                        refreshing: false
                    });
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
        this.props.navigation.navigate('LeagueDetail', { id: id })
    };

    _displayLeagues () {
        if (this.state.isOnline && !this.state.isLoading) {
            return (
                <ScrollView refreshControl={<RefreshControl style={{backgroundColor: 'transparent'}} refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
                    <View style={styles.main_container}>
                        <Text style={styles.title}>Compétitions</Text>
                        <FlatList
                            data={this.state.leagues}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <League data={item} displayDetail={this._displayDetail}></League>}
                        />
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <Container style={{backgroundColor:'#F6F6F6'}}>
                <Header style={{ backgroundColor: config.primary_color }}>
                    <Left/>
                    <Body>
                        <Title style={{color:'white'}}>Classement</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <Content contentContainerStyle={{flex: 1}}>
                        {this._displayLoading()}
                        {this._displayOffline()}
                        {this._displayLeagues()}
                    </Content>
                </View>
            </Container>
        )
    }
}

export default Ranking
