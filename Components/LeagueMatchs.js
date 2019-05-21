import React from 'react'
import {View, ActivityIndicator, ScrollView, Image, ImageBackground, Share, Alert, TouchableOpacity, Linking, FlatList, NetInfo, StatusBar, Modal, Platform} from 'react-native'
import { Container, Content, Text, Badge, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Match from '../Components/Match'
import moment from 'moment'
import details from '../Style/Detail'
import styles from '../Style/Style'
import config from '../config';
import matchs from '../Api/Matchs'

class LeagueMatchs extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            matchs : [],
            isLoading : true,
            isOnline: false
        };
    }

    _load () {

        const { id } = this.props.navigation.state.params;

        this.setState({ isLoading: true });

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                this.setState({
                    matchs: matchs,
                    isLoading: false,
                    isOnline: true
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

        const { matchs } = this.state;
        const movie = {};

        if (matchs.length > 0 && this.state.isOnline) {

            return (
                <Container>
                    <ScrollView>
                        <Content style={styles.container}>
                            <View>
                                <TouchableOpacity style={details.back} onPress={() => this.props.navigation.goBack()}>
                                    <FontAwesome name="arrow-left" size={20} color='white' />
                                </TouchableOpacity>
                                <Text style={details.title}> Ligue 1</Text>
                                <Text style={details.year}> 2019 </Text>
                                <Text style={details.time}> 20 equipes </Text>
                                <View style={details.hero_overflow} />
                                <Image style={details.hero} source={ (movie.backdrop_path) ? { uri: movie.backdrop_path} : require('../Images/default.png') } />
                            </View>
                            <View style={{flex:1, backgroundColor: config.background_color}}>
                                <Text style={styles.title}>Matchs</Text>
                                <View style={{alignItems: 'center'}}>
                                    <ScrollView>
                                        <FlatList
                                            data={matchs}
                                            keyExtractor={(item) => item.fixture_id}
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

export default LeagueMatchs
