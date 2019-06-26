import React from 'react';
import {AsyncStorage, Image, NetInfo, Platform, ScrollView, TouchableOpacity, View , Modal,TouchableHighlight} from 'react-native';
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
    Title
} from 'native-base';
import styles from '../Style/Style';
import { FontAwesome } from '@expo/vector-icons';
import config from '../config'
import { withNavigation } from 'react-navigation';

import {addScore,getBestScore} from '../Api/Lmdfoot'

class TabScore extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            scoreHomeTeam:undefined,
            scoreAwayTeam:undefined,
            bestScore: undefined,
            connected : false,
            isLoading : true,
            isOnline: false,
            modalVisible:false
        };
    }

    componentDidMount() {
        const { match } = this.props;

        this._navListener = this.props.navigation.addListener('didFocus', () => {
            console.log("ff")
            this._retrieveData();
        });

        getBestScore(match.id, config.admin_jwt).then(data => {
            this.setState({
                bestScore:data,
                isLoading: false,
                isOnline: true
            });
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    _retrieveData = async () => {
        try {
            console.log("couc")
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

                    this.setState({
                        scoreHomeTeam:data.scoreHomeTeam,
                        scoreAwayTeam:data.scoreAwayTeam,
                        modalVisible:false
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

        if (this.state.connected) {
            return (
                <Button style={{marginTop: 15, paddingRight: 30, width: '100%',marginRight:10}} iconLeft success onPress={() => this.setState({modalVisible:true})}>
                    <FontAwesome style={{paddingLeft: 15}} name='futbol-o' size={30} color={'white'}/>
                    <Text style={{fontSize: 13,textAlign: 'center'}}>Proposer votre score</Text>
                </Button>
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
                <View style={{paddingHorizontal: 10, backgroundColor: '#F6F6F6'}}>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        presentationStyle={'fullScreen'}>
                        <View style={{flex:1}}>
                            <TouchableOpacity
                                onPress={() => this.setState({modalVisible:false})}
                                style={{position: 'absolute',top:70,right:10,width: 50,zIndex:2}}>
                                <Icon right ios="ios-close" android="md-close" style={{ color: 'black', fontSize:60}}/>
                            </TouchableOpacity>
                            <View style={{justifyContent:'center',flex:1}}>
                                <View style={{}}>
                                    <Text style={styles.title}>Entrez votre score</Text>
                                    <Form style={{marginTop:20}}>
                                        <Item picker style={{marginBottom: 10}}>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined,backgroundColor:'#4DAD4A'}}
                                                placeholder={"Score " + match.homeTeam.name}
                                                placeholderStyle={{ color: "black" }}
                                                placeholderIconColor="#007aff"
                                                selectedValue={this.state.scoreHomeTeam}
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
                                        <Item picker style={{}}>
                                            <Picker
                                                mode="dropdown"
                                                iosIcon={<Icon name="arrow-down" />}
                                                style={{ width: undefined, backgroundColor:'#EB9E3E' }}
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
                                    <Button style={{paddingHorizontal:10,marginVertical: 20}} iconLeft primary block onPress={() => this._addScore(this.state.scoreHomeTeam,this.state.scoreAwayTeam)}>
                                        <FontAwesome style={{paddingLeft: 15}} name='futbol-o' size={30} color={'white'}/>
                                        <Text style={{fontSize: 13}}>Envoyer le score</Text>
                                    </Button>
                                    <View style={{alignItems:'center',marginTop:50}}>
                                        <Image style={{width:185,height:185,marginRight: 5}} source={ require('../Images/fans.png') } />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
                    {this._showButtons()}
                    <View style={{paddingHorizontal: 10}}>
                        <Text style={styles.title}>Score Moyen</Text>
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
                                <Text numberOfLines={1}>Précision
                                    : {(this.state.bestScore) ? Math.trunc(this.state.bestScore.accuracy) : 0} %</Text>
                            </Button>
                            <Button style={{flex: 1, marginLeft: 5}} disabled small block warning iconLeft>
                                <FontAwesome style={{marginLeft: 7}} name='user' size={18} color={'white'}/>
                                <Text numberOfLines={1}>Contributeurs
                                    : {(this.state.bestScore) ? this.state.bestScore.contributors : 0}</Text>
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
                                }}> {(this.state.scoreHomeTeam) ? this.state.scoreHomeTeam : ' '} - {(this.state.scoreAwayTeam) ? this.state.scoreAwayTeam : ' '} </Text>
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