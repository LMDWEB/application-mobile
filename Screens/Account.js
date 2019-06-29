import React from 'react'
import {
    View,
    ScrollView,
    ActivityIndicator,
    NetInfo,
    TouchableOpacity,
    StatusBar,
    Platform,
    AsyncStorage,
} from 'react-native'
import styles from '../Style/Style'
import {
    Container,
    Header,
    Title,
    Content,
    Left,
    Right,
    Body,
    Text,
    Button,
    Icon,
    Toast,
    ListItem,
    Separator
} from 'native-base';
import {getUser} from "../Api/Lmdfoot"
import { FontAwesome } from '@expo/vector-icons';
import config from '../config'

class Account extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isOnline: true,
            isLoading : false,
            username: ''
        };
    }

    _load () {

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){

                AsyncStorage.getItem("JWT").then((token) => {
                    getUser(token).then(data => {
                        this.setState({ isOnline: true, username:data.name})
                    });
                });
            } else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });
    }

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

    _removeItem = async () => {
        try {
            await AsyncStorage.removeItem('JWT');
        } catch (error) {
            console.log(error)
        }
    };

    _logout () {

        this.setState({isLoading: true});

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
               this._removeItem();
               this.props.navigation.navigate('Settings');

                Toast.show({
                    text: 'Vous êtes déconnecté',
                    type: 'danger',
                    duration: 3000
                });

            }else {
                this.setState({ isOnline: false, isLoading: false });
            }
        });

    }

    _displayLoading() {
        if (this.state.isLoading) return (<ActivityIndicator size='large' />)
        else return (<Icon name='power' />)
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: config.primary_color }}>
                    <Left>
                        <Button transparent>
                            <Icon style={{color:'white',marginLeft: 10}} name='arrow-back' onPress={ () => this.props.navigation.goBack()} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={{color:'white'}}>Mon compte</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <Content contentContainerStyle={{flex: 1}}>
                        <ScrollView>
                            <Separator bordered>
                            </Separator>
                            <ListItem>
                                <Text>{this.state.username}</Text>
                            </ListItem>
                            <Separator bordered>
                            </Separator>
                            <View style={{padding: 10,}}>
                                <Button iconLeft block danger onPress={() => this._logout()}>
                                    {this._displayLoading()}
                                    <Text>Se déconnecter</Text>
                                </Button>
                            </View>
                        </ScrollView>
                        {this._displayOffline()}
                    </Content>
                </View>
            </Container>
        )
    }
}

export default Account
