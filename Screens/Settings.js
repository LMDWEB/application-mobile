import React from 'react'
import {View, Linking, Share, Alert, ScrollView, Image, StatusBar, Platform} from 'react-native'
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, ListItem, Separator, Switch } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { Constants, WebBrowser } from 'expo'
import styles from "../Style/Style";
import config from '../config'

class Settings extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            notification:true
        }
    }

    componentDidMount() {
        this._navListener = this.props.navigation.addListener('didFocus', () => {
            (Platform.OS === 'android') ? StatusBar.setTranslucent(false) : null;
            (Platform.OS === 'android') ? StatusBar.setBackgroundColor(config.primary_color) : null;
        });
    }

    componentWillUnmount() {
        this._navListener.remove();
    }

    _changeNotifications () {
        this.setState({notification:!this.state.notification});
    }

    _shareApplication() {

        Share.share({ title: 'Viens découvrir l\'application Sporty !!', message: 'Viens vite découvrir l\'application Sporty, l\'application qui te permter de devenir le 12 éme homme du match  : https://popcorn.antonbourtnik.fr' })
            .then(Alert.alert('Application partagée', null, [{text: 'OK', onPress: () => {}},]))
            .catch(error => Alert.alert('Application non partagée', error.message, [{text: 'OK', onPress: () => {}},]))
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
                        <Title style={{color:'white'}}>Paramétres</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <Content contentContainerStyle={{flex: 1}}>
                        <ScrollView>
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
                            <ListItem icon onPress={() => WebBrowser.openBrowserAsync("https://www.antonbourtnik.fr")}>
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
                            <ListItem icon onPress={() => WebBrowser.openBrowserAsync("https://www.antonbourtnik.fr")}>
                                <Left>
                                    <Button style={{ backgroundColor: "#4CDA64" }}>
                                        <FontAwesome active name="info-circle" color={'white'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>A propos du developpeur</Text>
                                </Body>
                                <Right>
                                    <Icon name="arrow-forward" />
                                </Right>
                            </ListItem>
                            <ListItem icon onPress={() => Linking.openURL('mailto:contact@antonbourtnik.fr?subject=Contact à propos de l\'application Pop Corn')}>
                                <Left>
                                    <Button style={{ backgroundColor: "#007AFF" }}>
                                        <FontAwesome active name="envelope" color={'white'} />
                                    </Button>
                                </Left>
                                <Body>
                                    <Text>Contacter le developpeur</Text>
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
