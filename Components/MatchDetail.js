import React from 'react'
import {
    View,
    ActivityIndicator,
    ScrollView,
    Image,
    TouchableOpacity,
    NetInfo,
    StatusBar,
    Platform,
    AsyncStorage
} from 'react-native'
import { Container, Content, Text, Tabs, Tab} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import details from '../Style/Detail'
import styles from '../Style/Style'
import config from '../config'
import {getMatch} from '../Api/Lmdfoot'
import TabComment from '../Tabs/TabComments';
import TabScore from '../Tabs/TabScore';
import moment from "moment/moment";

class MatchDetail extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            match : undefined,
            isLoading : true,
            isOnline: false,
            isConnected:false
        };
    }

    _load () {

        const { id } = this.props.navigation.state.params;

        this.setState({ isLoading: true });

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                getMatch(id , config.admin_jwt).then(data => {
                    this.setState({
                        match: data,
                        isLoading: false,
                        isOnline: true
                    });
                });
            } else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('JWT');
            if (value !== null) {
                this.setState({ isConnected: true})
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            (Platform.OS === 'android') ? StatusBar.setTranslucent(true) : null;
            (Platform.OS === 'android') ? StatusBar.setBackgroundColor('rgba(0, 0, 0, 0.3)') : null;
            this._retrieveData();
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

    _displayMatch() {

        const { match } = this.state;

        if (match != undefined && this.state.isOnline) {

            return (
                <Container style={{backgroundColor:'#F6F6F6'}}>
                    <ScrollView>
                        <Content style={styles.container}>
                            <View>
                                <TouchableOpacity style={details.back} onPress={() => this.props.navigation.goBack()}>
                                    <FontAwesome name="arrow-left" size={20} color='white' />
                                </TouchableOpacity>
                                <Text style={details.title}> {match.homeTeam.name} {match.goalsHomeTeam} - {match.goalsAwayTeam} {match.awayTeam.name} </Text>
                                <Text style={details.year}> {moment(match.eventBegin).format('DD MMMM YYYY à HH:mm')} </Text>
                                <Text style={details.time}> {match.league.name} </Text>
                                <View style={details.hero_overflow} />
                                <Image style={details.hero} source={ require('../Images/stadium.jpg') } />
                            </View>
                            <View>
                                <Tabs>
                                    <Tab heading="Commentaires">
                                        <TabComment match_id={match.id} comments={match.comments} connected={this.state.isConnected} />
                                    </Tab>
                                    <Tab heading="Scores">
                                        <TabScore match={match} connected={this.state.isConnected} />
                                    </Tab>
                                </Tabs>
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
                {this._displayMatch()}
                {this._displayOffline()}
            </View>
        )
    }
}

export default MatchDetail
