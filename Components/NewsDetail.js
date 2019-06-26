import React from 'react'
import {View, ActivityIndicator, ScrollView, Image, TouchableOpacity, NetInfo, StatusBar, Platform, FlatList, ImageBackground} from 'react-native'
import { Container, Content, Text, Badge, Icon, Button,Body } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import Card from '../Components/Card'
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
                                {news.content.replace(/<\/?[^>]+(>|$)/g, "")}
                            </Text>
                        </TouchableOpacity>
                </View>
            )
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
                                <Image style={details.hero} source={ (news.image) ? { uri: getImageFromApi(news.image.url)} : require('../Images/default-news.jpg') } />
                            </View>
                            {this._displayResume()}
                            <View style={styles.main_container}>
                                <Text style={styles.title}>Joueur{(news.players.length > 1) ? 's' : ''}</Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={news.players}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({item}) => <Card data={item}></Card>}
                                    />
                                </ScrollView>
                                <Text style={styles.title}>Club{(news.clubs.length > 1) ? 's' : ''}</Text>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                    <FlatList
                                        horizontal={true}
                                        showsHorizontalScrollIndicator={false}
                                        data={news.clubs}
                                        keyExtractor={(item) => item.id.toString()}
                                        renderItem={({item}) => <Card data={item}></Card>}
                                    />
                                </ScrollView>
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
