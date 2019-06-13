import React from 'react'
import {View, ActivityIndicator, ScrollView, Image, TouchableOpacity, NetInfo, StatusBar, Platform, FlatList} from 'react-native'
import { Container, Content, Text, Badge, Icon, Button, Card, CardItem, Body } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Match from '../Components/Match'
import Player from '../Components/Player'
import details from '../Style/Detail'
import styles from '../Style/Style'
import {getNewsDetail, getImageFromApi} from '../Api/News'
import moment from "moment/moment";

class NewsDetail extends React.Component {

    constructor(props) {

        super(props);

        this.state = {
            news : undefined,
            isLoading : true,
            isOnline: false,
            expandOverview: false
        };
    }

    _load () {

        const { id } = this.props.navigation.state.params;

        this.setState({ isLoading: true });

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                getNewsDetail(id).then(data => {
                    this.setState({
                        news: data,
                        isLoading: false,
                        isOnline: true,
                    });
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

    _displayResume() {

        const { news } = this.state;

        if (news.content) {
            return (
                <View style={details.info_container}>
                        <TouchableOpacity onPress={() => this.setState({expandOverview:!this.state.expandOverview})}>
                            <Text numberOfLines={(this.state.expandOverview) ? null : 6} style={details.description}>
                                {news.content}
                            </Text>
                        </TouchableOpacity>
                </View>
            )
        }
    }

    _displayPlayers () {

        const { news } = this.state;

        if (news.players.length == 0) {
            return (
                <Text style={{textAlign: 'center',fontWeight: 'bold', marginTop:10}}>Aucun joueurs</Text>
            )
        }

        else if (news.players.length == 1) {
            return (
                <TouchableOpacity onPress={() => console.log("") }>
                    <Card style={{marginRight:10}}>
                        <CardItem cardBody>
                            <Image source={ (news.players[0].image) ? { uri: getImageFromApi(news.players[0].image) } : require('../Images/player-default.png') } style={{height: 200, width: null, flex: 1, resizeMode: 'cover'}}/>
                        </CardItem>
                        <CardItem>
                            <Body style={{alignItems: 'center'}}>
                                <Text style={{fontWeight:'bold',fontSize:20,marginBottom:10}}>{news.players[0].name}</Text>
                                <Text style={{fontWeight:'bold',color:'grey'}}>Numero {news.players[0].number}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            )
        }

        else {


        }

    }

    _displayClubs () {

        const { news } = this.state;

        if (news.clubs.length == 0) {
            return (
                <Text style={{textAlign: 'center',fontWeight: 'bold', marginTop:10}}>Aucun joueurs</Text>
            )
        }

        else if (news.clubs.length == 1) {
            return (
                <TouchableOpacity onPress={() => console.log("") }>
                    <Card style={{marginRight:10}}>
                        <CardItem cardBody style={{alignItems: 'center'}}>
                            <Image source={ (news.clubs[0].logo) ? { uri: news.clubs[0].logo } : require('../Images/club-default.png') } style={{height: 100, width: 100}}/>
                        </CardItem>
                        <CardItem>
                            <Body style={{alignItems: 'center'}}>
                                <Text style={{fontWeight:'bold',fontSize:20,marginBottom:10}}>{news.clubs[0].name}</Text>
                                <Text style={{fontWeight:'bold',color:'grey'}}>{news.clubs[0].country}</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </TouchableOpacity>
            )
        }

        else {


        }

    }


    _displayNews() {

        const { news } = this.state;

        if (news != undefined && this.state.isOnline) {

            return (
                <Container>
                    <ScrollView>
                        <Content style={styles.container}>
                            <View>
                                <TouchableOpacity style={details.back} onPress={() => this.props.navigation.goBack()}>
                                    <FontAwesome name="arrow-left" size={20} color='white' />
                                </TouchableOpacity>
                                <Text style={details.title}> {news.title}</Text>
                                <Text style={details.year}> { moment(news.date).format('DD MMMM YYYY') } </Text>
                                <Text style={details.time}> {news.category.name} </Text>
                                <View style={details.hero_overflow} />
                                <Image style={details.hero} source={ (news.image) ? { uri: getImageFromApi(news.image.url)} : require('../Images/default.png') } />
                            </View>
                            {this._displayResume()}
                            <View style={styles.main_container}>
                                <Text style={styles.title}>Joueur{(news.players.length > 1) ? 's' : ''}</Text>
                                {this._displayPlayers()}
                                <Text style={styles.title}>Club{(news.clubs.length > 1) ? 's' : ''}</Text>
                                {this._displayClubs()}
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
                {this._displayNews()}
                {this._displayOffline()}
            </View>
        )
    }
}

export default NewsDetail
