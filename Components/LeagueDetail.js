import React from 'react'
import {
    View,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    FlatList,
    NetInfo,
    StatusBar,
    Platform,
} from 'react-native'
import { Container, Content, Text, Header, Icon,Picker,Item,Form,Left,Right,Button,Body,Title } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Match from '../Components/Match'
import details from '../Style/Detail'
import styles from '../Style/Style'
import config from '../config';
import {getLeaguesDetail, getLeaguesGames} from "../Api/Lmdfoot";

class LeagueDetail extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            league : undefined,
            games : [],
            round: 1,
            isLoading : true,
            isOnline: false
        };
    }

    _handleSelect(round) {

        const { id } = this.props.navigation.state.params;

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                getLeaguesGames(id , round, config.admin_jwt).then(data => {
                    this.setState({
                        round: round,
                        games: data,
                        isLoading: false,
                        isOnline: true
                    });
                });
            } else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });

    }

    _load () {

        const { id } = this.props.navigation.state.params;

        this.setState({ isLoading: true });

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                Promise.all([
                    getLeaguesDetail(id , config.admin_jwt),
                    getLeaguesGames(id , 1, config.admin_jwt),
                ]).then(([league, games]) => {
                    this.setState({
                        league: league,
                        games: games,
                        isLoading: false,
                        isOnline: true
                    });
                }).catch(error => {
                    console.log(error)
                });
            } else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            (Platform.OS === 'android') ? StatusBar.setTranslucent(true) : null;
            (Platform.OS === 'android') ? StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.3)') : null;
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

    _displayNoResults () {
        return (
            <View style={details.no_result_container}>
                <Text style={details.no_result_text}>Aucun resultat trouvé</Text>
            </View>
        );
    };

    _displayMatchs() {

        const { league, games } = this.state;

        let a = [];

        for (var i=1; i <= 38; i++)
            a.push(i);

        let journeys = a.map(function(value, key){
            return (
                <Picker.Item key={value} label={"Journée " + value} value={value} />
            );
        });

        if (league != undefined > 0 && this.state.isOnline) {

            return (
                <Container>
                    <ScrollView>
                        <Content style={styles.container}>
                            <View>
                                <TouchableOpacity style={details.back} onPress={() => this.props.navigation.goBack()}>
                                    <FontAwesome name="arrow-left" size={20} color='white' />
                                </TouchableOpacity>
                                <Text style={details.title}> {league.name}</Text>
                                <Text style={details.year}> {league.season} </Text>
                                <Text style={details.time}> {league.country} </Text>
                                <View style={details.hero_overflow} />
                                <Image style={details.hero} source={ (league.logo) ? { uri: league.logo} : require('../Images/default.png') } />
                            </View>
                            <View style={{flex:1, backgroundColor: config.background_color}}>
                                <Form>
                                    <Item picker>
                                        <Picker
                                            mode="dropdown"
                                            iosIcon={<Icon name="arrow-down" />}
                                            style={{ width: undefined,backgroundColor:'white'}}
                                            headerBackButtonText="Retour"
                                            placeholder="Selectionner la journeé"
                                            placeholderStyle={{ color: "black" }}
                                            placeholderIconColor="#007aff"
                                            selectedValue={this.state.round}
                                            onValueChange={this._handleSelect.bind(this)}
                                            renderHeader={backAction =>
                                                <Header>
                                                    <Left>
                                                        <Button transparent onPress={backAction}>
                                                            <Icon name="arrow-back" style={{ color: "#0960FF" }} />
                                                        </Button>
                                                    </Left>
                                                    <Body style={{ flex: 3 }}>
                                                        <Title style={{ color: "#0960FF" }}>Selection une journée</Title>
                                                    </Body>
                                                    <Right />
                                                </Header>}
                                        >
                                        {journeys}
                                        </Picker>
                                    </Item>
                                </Form>
                                <Text style={styles.title}>Matchs</Text>
                                <View style={{paddingHorizontal: 10}}>
                                    <ScrollView>
                                        <FlatList
                                            data={games}
                                            keyExtractor={(item) => item.id.toString()}
                                            renderItem={({item}) => <Match data={item} displayDetail={this._displayDetail} ></Match>}
                                            ListEmptyComponent={this._displayNoResults}
                                        />
                                    </ScrollView>
                                </View>
                            </View>
                        </Content>
                    </ScrollView>
                </Container>
            )
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'rgba(0, 0, 0,' + ( (this.state.modalVisible) ? ' 1.0)' : ' 0.3)' )} />
                {this._displayLoading()}
                {this._displayMatchs()}
                {this._displayOffline()}
            </View>
        )
    }
}

export default LeagueDetail
