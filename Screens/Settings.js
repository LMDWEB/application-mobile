import React from 'react'
import {View, Linking, Share,ScrollView, Image, StatusBar, Platform, AsyncStorage} from 'react-native'
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    ListItem,
    Separator,
    Switch,
    Toast
} from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { WebBrowser } from 'expo'
import styles from "../Style/Style";
import config from '../config'
import {getUser} from '../Api/Lmdfoot'

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notification:false,
            connected : false,
            username: '',
            isLoading : false
        }
    }

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('JWT');
            if (value !== null) {
                getUser(value).then(data => {
                    this.setState({ connected: true, username:data.name})
                });
            }
            else this.setState({ connected: false});
        } catch (error) {
            // Error retrieving data
        }
    };

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            (Platform.OS === 'android') ? StatusBar.setTranslucent(false) : null;
            (Platform.OS === 'android') ? StatusBar.setBackgroundColor(config.primary_color) : null;
            this._retrieveData();
        });

    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    _changeNotifications () {
        this.setState({notification:!this.state.notification});
    }

    _shareApplication() {

        Share.share({ title: 'Viens découvrir l\'application Sporty !!', message: 'Viens vite découvrir l\'application Sporty, l\'application qui te permter de devenir le 12 éme homme du match  : https://lmdfoot.com' })
            .then(
                Toast.show({
                    text: 'Partage effectué',
                    type: 'success',
                    duration: 3000
                })
            )
            .catch(error => Toast.show({text: 'Une erreur est survenue', type: 'danger', duration: 3000}))
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: config.primary_color }}>
                    <Left/>
                    <Body>
                        <Title style={{color:'white'}}>Paramétres</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <Content contentContainerStyle={{flex: 1}}>
                        <ScrollView>
                            <Separator bordered>
                                <Text style={{fontSize:12}}>Compte</Text>
                            </Separator>
                            {(this.state.connected) ?
                                <ListItem icon onPress={() => this.props.navigation.push('Account')}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#880e4f" }}>
                                            <FontAwesome active name="user" color={'white'} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text> {this.state.username}</Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                                :
                                <ListItem icon onPress={() => this.props.navigation.push('Login' , {'referer': 'Settings' })}>
                                    <Left>
                                        <Button style={{ backgroundColor: "#880e4f" }}>
                                            <FontAwesome active name="user" color={'white'} />
                                        </Button>
                                    </Left>
                                    <Body>
                                        <Text>Connexion / Inscription</Text>
                                    </Body>
                                    <Right>
                                        <Icon name="arrow-forward" />
                                    </Right>
                                </ListItem>
                            }

                            <Separator bordered>
                                <Text style={{fontSize:12}}>GENERAL</Text>
                            </Separator>
                            <ListItem icon>
                                <Left>
                                    <Button style={{ backgroundColor: "#fd3c2c" }}>
                                        <FontAwesome active name="bell" color={'white'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Activer les notifications</Text>
                                </Body>
                                <Right>
                                    <Switch value={this.state.notification} onValueChange={() => this._changeNotifications()} />
                                </Right>
                            </ListItem>
                            <Separator bordered>
                                <Text style={{fontSize:12}}>A PROPOS</Text>
                            </Separator>
                            <ListItem icon onPress={() => this._shareApplication()}>
                                <Left>
                                    <Button style={{ backgroundColor: "#5854D6" }}>
                                        <FontAwesome active name="share" color={'white'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Partager cette application</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => WebBrowser.openBrowserAsync("https://lmdfoot.com/")}>
                                <Left>
                                    <Button style={{ backgroundColor: "#8F8E93" }}>
                                        <FontAwesome active name="balance-scale" color={'white'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Conditions d'utilisation</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => WebBrowser.openBrowserAsync("https://lmdfoot.com/")}>
                                <Left>
                                    <Button style={{ backgroundColor: "#4CDA64" }}>
                                        <FontAwesome active name="info-circle" color={'white'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>A propos de Sporty</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => Linking.openURL('mailto:contact@antonbourtnik.fr?subject=Contact à propos de l\'application Sporty')}>
                                <Left>
                                    <Button style={{ backgroundColor: "#007AFF" }}>
                                        <FontAwesome active name="envelope" color={'white'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Contacter l'equipe</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <Separator bordered>
                            </Separator>
                            <View style={{paddingVertical:20}}>
                                <Text style={{textAlign:'center',fontWeight: 'bold',marginBottom:10}}>Version de l'application : 1.0</Text>
                                <Text style={{textAlign:'center',fontWeight: 'bold'}}>© {(new Date()).getFullYear()} Sporty - Tous droits réservés</Text>
                                <View style={{flexDirection: 'row',justifyContent:'space-evenly'}}>
                                    <Image style={{marginTop:30,width:150,height:150}} source={ require('../assets/icon.png') } />
                                </View>
                            </View>
                        </ScrollView>
                    </Content>
                </View>
            </Container>
        )
    }
}

export default Settings
