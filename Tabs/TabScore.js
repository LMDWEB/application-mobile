import React from 'react';
import {AsyncStorage, Image, View, Platform} from 'react-native';
import {
    Header,
    Text,
    Icon,
    Left,
    Body,
    Form,
    Button,
    Right,
    Item,
    Toast,
    Picker,
    Title,
} from 'native-base';
import styles from '../Style/Style';
import { FontAwesome } from '@expo/vector-icons';
import config from '../config'
import { withNavigation } from 'react-navigation';

import {addScore, getBestScore, getLastScoreByUser} from '../Api/Lmdfoot'

class TabScore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scoreHomeTeam:undefined,
            scoreAwayTeam:undefined,
            userScoreHomeTeam:undefined,
            userScoreAwayTeam:undefined,
            bestScore: undefined,
            isLoading : true,
            isOnline: false,
        };
    }

    componentDidMount() {
        const { match } = this.props;

        Promise.all([
            getBestScore(match.id, config.admin_jwt),
            getLastScoreByUser(match.id, config.admin_jwt),
        ]).then(([bestScore, lastScore]) => {
            console.log(lastScore);
            this.setState({
                bestScore:bestScore,
                userScoreHomeTeam:lastScore.scoreHomeTeam,
                userScoreAwayTeam:lastScore.scoreAwayTeam,
                isLoading: false,
                isOnline: true
            });
        });
    }

    _refreshBestScore() {

        const { match } = this.props;

        getBestScore(match.id, config.admin_jwt).then(data => {
            this.setState({
                bestScore:data,
                isLoading: false,
                isOnline: true
            });
        });

    }

    _handleSelectHomeTeam(score) {
        this.setState({scoreHomeTeam: score});
    }

    _handleSelectAwayTeam(score) {
        this.setState({scoreAwayTeam: score});
    }

    _addScore(scoreHome, scoreAway) {

        const { match } = this.props;

        if (scoreHome != undefined && scoreAway != undefined ){

            AsyncStorage.getItem("JWT").then((token) => {

                addScore(match.id, this.state.scoreHomeTeam, this.state.scoreAwayTeam, token).then(data => {

                    this.setState({
                        scoreHomeTeam:null,
                        scoreAwayTeam:null,
                        userScoreHomeTeam:data.scoreHomeTeam,
                        userScoreAwayTeam:data.scoreAwayTeam,
                    });

                    getBestScore(match.id, config.admin_jwt).then(data => {
                        this.setState({
                            bestScore:data,
                        });
                    });

                    Toast.show({
                        text: 'Score envoyé',
                        type: 'success',
                        duration: 3000
                    });

                });
            });
        }
        else {
            Toast.show({
                text: 'Merci de rentrer un score',
                type: 'danger',
                duration: 3000
            });
        }
    }

    _showButtons () {

        const { match, connected } = this.props;

        let a = [];

        for (var i=0; i <= 15; i++)
            a.push(i);

        let scores = a.map(function(value, key){
            return (
                <Picker.Item key={value} label={value.toString()} value={value} />
            );
        });

        if (connected) {
            return (
                <View style={{backgroundColor:'#d1ecf1',paddingBottom: 20,borderWidth: 2,borderRadius: 4,borderColor: '#bee5eb',alignItems:'center',flex:1}}>
                    <Text style={styles.title}>Entrez votre score</Text>
                    <Form style={{}}>
                        <Item picker style={{}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%',backgroundColor:'white'}}
                                placeholder={"Score " + match.homeTeam.name}
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="#007aff"
                                selectedValue={(Platform.OS === 'android') ? 999 : this.state.scoreHomeTeam}
                                onValueChange={this._handleSelectHomeTeam.bind(this)}
                                renderHeader={backAction =>
                                    <Header>
                                        <Left>
                                            <Button transparent onPress={backAction}>
                                                <Icon name="arrow-back" style={{ color: "#0960FF" }} />
                                            </Button>
                                        </Left>
                                        <Body style={{ flex: 3 }}>
                                            <Title style={{ color: "#0960FF" }}>Sélectionner un score </Title>
                                        </Body>
                                        <Right />
                                    </Header>}
                            >
                                {scores}
                            </Picker>
                        </Item>
                        <Item picker style={{marginTop:10}}>
                            <Picker
                                mode="dropdown"
                                iosIcon={<Icon name="arrow-down" />}
                                style={{ width: '100%',backgroundColor:'white' }}
                                placeholder={"Score " + match.awayTeam.name}
                                placeholderStyle={{ color: "black" }}
                                placeholderIconColor="#007aff"
                                selectedValue={this.state.scoreAwayTeam}
                                onValueChange={this._handleSelectAwayTeam.bind(this)}
                                renderHeader={backAction =>
                                    <Header>
                                        <Left>
                                            <Button transparent onPress={backAction}>
                                                <Icon name="arrow-back" style={{ color: "#0960FF" }} />
                                            </Button>
                                        </Left>
                                        <Body style={{ flex: 3 }}>
                                            <Title style={{ color: "#0960FF" }}>Sélectionner un score </Title>
                                        </Body>
                                        <Right />
                                    </Header>}
                            >
                                {scores}
                            </Picker>
                        </Item>
                    </Form>
                    <Button style={{marginTop:20,marginLeft:100}} iconLeft primary onPress={() => this._addScore(this.state.scoreHomeTeam,this.state.scoreAwayTeam)}>
                        <FontAwesome style={{paddingLeft: 15}} name='futbol-o' size={30} color={'white'}/>
                        <Text style={{fontSize: 13}}>Envoyer le score</Text>
                    </Button>
                </View>
            )
        }
        else {
            return (
                <Button style={{marginTop: 15, marginHorizontal: 10}} iconLeft block primary onPress={() => this.props.navigation.push('Login')}>
                    <FontAwesome style={{paddingLeft: 15}} name='user' size={30} color={'white'}/>
                    <Text style={{fontSize: 13}}>Connecter-vous pour proposer votre score</Text>
                </Button>
            )
        }
    }

    render(){

        const {  } = this.state;

        const { match } = this.props;

        if (match != undefined) {

            let a = [];

            for (var i=0; i <= 15; i++)
                a.push(i);

            let scores = a.map(function(value, key){
                return (
                    <Picker.Item key={value} label={value} value={value} />
                );
            });

            return (
                <View style={{backgroundColor: '#F6F6F6'}}>
                    {this._showButtons()}
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={styles.title}>Score Moyen</Text>
                        <Button style={{flex: 1, marginBottom: 5}} small block success iconLeft onPress={() => this._refreshBestScore()}>
                            <FontAwesome style={{marginLeft: 7}} name='retweet' size={18} color={'white'}/>
                            <Text style={{fontSize:11}} numberOfLines={1}>Rafraishir</Text>
                        </Button>
                        <View style={styles.card_container}>
                            <View style={{
                                padding: 15,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{marginRight: 5}}>{match.homeTeam.name} </Text>
                                <Image style={{width: 35, height: 35, marginRight: 5}}
                                       source={(match.homeTeam.logo) ? {uri: match.homeTeam.logo} : require('../Images/team.png')}/>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginRight: 5
                                }}> {(this.state.bestScore) ? this.state.bestScore.scoreHomeTeam : ' '} - {(this.state.bestScore) ? this.state.bestScore.scoreAwayTeam : ' '} </Text>
                                <Image style={{width: 35, height: 35, marginRight: 5}}
                                       source={(match.awayTeam.logo) ? {uri: match.awayTeam.logo} : require('../Images/team.png')}/>
                                <Text>{match.awayTeam.name} </Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Button style={{flex: 1, marginRight: 5}} disabled small block info iconLeft>
                                <FontAwesome style={{marginLeft: 7}} name='futbol-o' size={18} color={'white'}/>
                                <Text style={{fontSize:11}} numberOfLines={1}>Précision : {(this.state.bestScore) ? Math.trunc(this.state.bestScore.accuracy) : 0} %</Text>
                            </Button>
                            <Button style={{flex: 1, marginLeft: 5}} disabled small block warning iconLeft>
                                <FontAwesome style={{marginLeft: 7}} name='user' size={18} color={'white'}/>
                                <Text style={{fontSize:11}} numberOfLines={1}>Contributeurs : {(this.state.bestScore) ? this.state.bestScore.contributors : 0}</Text>
                            </Button>
                        </View>
                        <Text style={styles.title}>Votre score</Text>
                        <View style={styles.card_container}>
                            <View style={{
                                padding: 15,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{marginRight: 5}}>{match.homeTeam.name} </Text>
                                <Image style={{width: 35, height: 35, marginRight: 5}}
                                       source={(match.homeTeam.logo) ? {uri: match.homeTeam.logo} : require('../Images/team.png')}/>
                                <Text style={{
                                    fontWeight: 'bold',
                                    marginRight: 5
                                }}> {(this.state.userScoreHomeTeam) ? this.state.userScoreHomeTeam : ' '} - {(this.state.userScoreAwayTeam) ? this.state.userScoreAwayTeam : ' '} </Text>
                                <Image style={{width: 35, height: 35, marginRight: 5}}
                                       source={(match.awayTeam.logo) ? {uri: match.awayTeam.logo} : require('../Images/team.png')}/>
                                <Text>{match.awayTeam.name} </Text>
                            </View>
                        </View>
                    </View>
                </View>
            );
        }
    }
}

export default withNavigation(TabScore)