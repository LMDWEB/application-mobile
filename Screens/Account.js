import React from 'react'
import {
    View,
    ScrollView,
    ActivityIndicator,
    NetInfo,
    TouchableOpacity,
    RefreshControl,
    StatusBar,
    Platform,
    AsyncStorage,
    Image
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
    Item,
    Input,
    Form,
    Button,
    Icon,
    Toast,
    Switch, ListItem, Separator
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

    _logout () {

        this.setState({isLoading: true});

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                AsyncStorage.removeItem('JWT');
                this.props.navigation.navigate('News');

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
                                <Text>Votre compte</Text>
                            </Separator>
                            <ListItem>
                                <Text>Caroline Aaron</Text>
                            </ListItem>
                            <Separator bordered>
                            </Separator>
                            <View style={{padding: 10,}}>
                                <Button iconLeft block danger onPress={() => this._logout()}>
                                    <Icon name='power' />
                                    <Text>Se deconecter</Text>
                                </Button>
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

export default Account
