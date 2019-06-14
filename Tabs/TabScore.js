import React from 'react';
import {AsyncStorage, Image, NetInfo, Platform, ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import {
    Container,
    Header,
    Content,
    Card,
    CardItem,
    Text,
    Icon,
    Thumbnail,
    Left,
    Body,
    Textarea,
    Form,
    Button,
    Right,
    Item,
    Input,
    Toast,
    Picker, Separator
} from 'native-base';
import moment from "moment/moment";
import styles from '../Style/Style';
import { FontAwesome } from '@expo/vector-icons';

import {addScore} from '../Api/Lmdfoot'

class TabScore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scoreHomeTeam:undefined,
            scoreAwayTeam:undefined,
            connected : false,
            isLoading : true,
            isOnline: false
        };
    }

    componentDidMount() {
        this._retrieveData();
    }


    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('JWT');
            if (value !== null) {
                this.setState({ connected: true})
            }
        } catch (error) {
            // Error retrieving data
        }
    };

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

                    console.log(data);
                    /*
                    this.setState({
                        comment : '',
                        comments: [ ...[data], ...this.state.comments ],
                        isLoading: false,
                        isOnline: true
                    });
                    */


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

    _showCommentForm () {

        if (this.state.connected) {
            return (
                <View>
                    <Text style={{textAlign: 'center',marginVertical: 20,fontSize:17, fontWeight: "bold"}}>Participer au match !!!</Text>
                    <Form>
                        <Item rounded style={{borderColor:'black',borderWidth: 1}}>
                            <Input
                                onChangeText={(text) => this._handleComment(text)}
                                onSubmitEditing={() => this._addComment()}
                                placeholder="Ecrivez votre commentaire ..."
                                placeholderTextColor={'#303a59'}
                                value={this.state.comment}
                                autoCorrect={false}
                            />
                            <Icon onPress={() => this._addComment()} style={{marginRight: 10}} active name='send' />
                        </Item>
                    </Form>
                </View>
            )
        }
        else {
            return (
                <Button style={{marginTop: 15, paddingRight: 30, width: '100%',marginRight:10}} iconLeft primary onPress={() => this.props.navigation.push('Login')}>
                    <FontAwesome style={{paddingLeft: 15}} name='user' size={30} color={'white'}/>
                    <Text style={{fontSize: 13}}>Connecter-vous pour proposer votre score</Text>
                </Button>
            )
        }
    }

    render(){

        const {  } = this.state;

        const { match } = this.props;

        let a = [];

        for (var i=0; i <= 15; i++)
            a.push(i);

        let scores = a.map(function(value, key){
            return (
                <Picker.Item key={value} label={value} value={value} />
            );
        });

        return(
            <View style={{backgroundColor:'#F6F6F6'}} >
                <Text style={styles.title}>Entrez votre score</Text>
                <Form style={{flexDirection: 'row',justifyContent:'space-evenly',paddingHorizontal: 10}}>
                    <Item picker style={{flex:1}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined,backgroundColor:'white'}}
                            placeholder={"Score " + match.homeTeam.name}
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.scoreHomeTeam}
                            onValueChange={this._handleSelectHomeTeam.bind(this)}
                        >
                            {scores}
                        </Picker>
                    </Item>
                    <Item picker style={{flex:1}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: undefined }}
                            placeholder={"Score " + match.awayTeam.name}
                            placeholderStyle={{ color: "black" }}
                            placeholderIconColor="#007aff"
                            selectedValue={this.state.scoreAwayTeam}
                            onValueChange={this._handleSelectAwayTeam.bind(this)}
                        >
                            {scores}
                        </Picker>
                    </Item>
                </Form>
                <Button style={{paddingHorizontal:10}} iconLeft primary block onPress={() => this._addScore(this.state.scoreHomeTeam,this.state.scoreAwayTeam)}>
                    <FontAwesome style={{paddingLeft: 15}} name='futbol-o' size={30} color={'white'}/>
                    <Text style={{fontSize: 13}}>Envoyer le score</Text>
                </Button>
                <Separator bordered>
                </Separator>
                <View style={{paddingHorizontal: 10}}>
                    <Text style={styles.title}>Score Moyen</Text>
                    <View style={styles.card_container}>
                        <View style={{padding: 15,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{marginRight: 5}}>{match.homeTeam.name} </Text>
                            <Image style={{width:35,height:35,marginRight: 5}} source={ (match.homeTeam.logo) ? { uri: match.homeTeam.logo} : require('../Images/team.png') } />
                            <Text style={{fontWeight: 'bold',marginRight: 5}}> {match.goalsHomeTeam} - {match.goalsAwayTeam} </Text>
                            <Image style={{width:35,height:35,marginRight: 5}} source={ (match.awayTeam.logo) ? { uri: match.awayTeam.logo} : require('../Images/team.png') } />
                            <Text>{match.awayTeam.name} </Text>
                        </View>
                    </View>
                    <Text style={styles.title}>Votre score</Text>
                    <View style={styles.card_container}>
                        <View style={{padding: 15,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                            <Text style={{marginRight: 5}}>{match.homeTeam.name} </Text>
                            <Image style={{width:35,height:35,marginRight: 5}} source={ (match.homeTeam.logo) ? { uri: match.homeTeam.logo} : require('../Images/team.png') } />
                            <Text style={{fontWeight: 'bold',marginRight: 5}}> {(this.state.scoreHomeTeam) ? this.state.scoreHomeTeam : ' ' } - {(this.state.scoreAwayTeam) ? this.state.scoreAwayTeam : ' ' } </Text>
                            <Image style={{width:35,height:35,marginRight: 5}} source={ (match.awayTeam.logo) ? { uri: match.awayTeam.logo} : require('../Images/team.png') } />
                            <Text>{match.awayTeam.name} </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

export default TabScore