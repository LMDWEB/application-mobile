import React from 'react'
import {View, ScrollView, ActivityIndicator, NetInfo, TouchableOpacity, RefreshControl, StatusBar, Platform, AsyncStorage} from 'react-native'
import styles from '../Style/Style'
import { Container, Header, Title, Content, Left, Right, Body, Text, Item, Input, Form, Button, Icon, Toast} from 'native-base';
import {login} from "../Api/Lmdfoot"
import { FontAwesome } from '@expo/vector-icons';
import config from '../config'

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.login = '';
        this.password = '';

        this.state = {
            login: false,
            isOnline: true,
            isLoading : false,
        };
    }

    _load () {

        this.setState({ isLoading: true});

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                this.setState({
                    isLoading: false,
                    isOnline: true,
                    refreshing: false
                });
            } else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });
    }

    _storeToken = async (token) => {
        try {
            await AsyncStorage.setItem('JWT', token);
        } catch (error) {
            console.log(error)
        }
    };

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
                <View style={{alignItems: 'center',marginTop:45}}>
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
        this.props.navigation.navigate('NewsDetail', { id: id })
    };

    _login () {

        this.setState({isLoading: true});

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                login(this.login, this.password).then(data => {

                    if (data.hasOwnProperty('code') && data.code == 401 ) {
                        this.setState({
                            isLoading: false,
                            isOnline: true
                        });

                        Toast.show({
                            text: 'Login ou mot de passe incorrect',
                            type: 'danger',
                            duration: 3000
                        });

                    }
                    else if (data.hasOwnProperty('token')) {

                        console.log(data.token);

                        this._storeToken(data.token);

                        this.props.navigation.navigate('News')
                    }
                });
            }else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });

    }

    _loginResult () {

        if (!this.state.login && this.login != '' && this.password != '') {
            return (
                <View>
                    <Text>Login ou mot de passe incorrect</Text>
                </View>
            )
        }
    }

    _handleLogin(text) {
        this.login = text;
    }

    _handlePassword(text) {
        this.password = text;
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: config.primary_color }}>
                    <Left/>
                    <Body>
                        <Title style={{color:'white'}}>Connexion</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <Content contentContainerStyle={{flex: 1}}>
                        <ScrollView refreshControl={<RefreshControl style={{backgroundColor: 'transparent'}} refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
                            <View style={styles.main_container}>
                                <Text style={styles.title}>Connectez-vous</Text>
                                <Form>
                                    <Item style={{marginVertical: 10}} rounded>
                                        <Input autoCapitalize='none' placeholder='Login' onChangeText={(text) => this._handleLogin(text)}/>
                                    </Item>
                                    <Item style={{marginVertical: 10}} rounded>
                                        <Input autoCapitalize='none' placeholder='Mot de passe' onChangeText={(text) => this._handlePassword(text)}/>
                                    </Item>
                                    <Button iconLeft block onPress={ () => this._login()}>
                                        <Icon name='arrow-back' />
                                        <Text>Se connecter</Text>
                                    </Button>
                                </Form>

                            </View>
                        </ScrollView>
                        {this._displayLoading()}
                        {this._displayOffline()}
                    </Content>
                </View>
            </Container>
        )
    }
}

export default Login
