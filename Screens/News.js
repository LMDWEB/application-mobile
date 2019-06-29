import React from 'react'
import {View, ScrollView, ActivityIndicator, FlatList, NetInfo, TouchableOpacity, RefreshControl, StatusBar, Platform} from 'react-native'
import styles from '../Style/Style'
import { Container, Header, Title, Content, Left, Right, Body, Text} from 'native-base';
import Article from "../Components/Article"
import {getNews} from "../Api/News"
import { FontAwesome } from '@expo/vector-icons';
import config from '../config'

class News extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            news: [],
            isOnline: true,
            isLoading : false,
            refreshing: false
        };
    }

    _onRefresh = () => {
        this.setState({refreshing: false});
        this._load();
    };

    _load () {

        this.setState({ isLoading: true});

        NetInfo.isConnected.fetch().then(isConnected => {
            if (isConnected){
                getNews().then(data => {
                    this.setState({
                        news: data,
                        isLoading: false,
                        isOnline: true,
                        refreshing: false
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

    _displayDetail = (id) => {
        this.props.navigation.navigate('NewsDetail', { id: id })
    };

    _displayNews () {

        if (this.state.isOnline && !this.state.isLoading) {
            return (
                <ScrollView refreshControl={<RefreshControl style={{backgroundColor: 'transparent'}} refreshing={this.state.refreshing} onRefresh={this._onRefresh}/>}>
                    <View style={styles.main_container}>
                        <Text style={styles.title}>Les dernières news</Text>
                        <FlatList
                            data={this.state.news}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => <Article data={item} displayDetail={this._displayDetail}></Article>}
                        />
                    </View>
                </ScrollView>
            )
        }
    }

    render() {
        return (
            <Container>
                <Header style={{ backgroundColor: config.primary_color }}>
                    <Left/>
                    <Body>
                        <Title style={{color:'white'}}>News</Title>
                    </Body>
                    <Right/>
                </Header>
                <View style={styles.container}>
                    <Content contentContainerStyle={{flex: 1}}>
                        {this._displayLoading()}
                        {this._displayOffline()}
                        {this._displayNews()}
                    </Content>
                </View>
            </Container>
        )
    }
}

export default News
