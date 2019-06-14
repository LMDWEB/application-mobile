import React from 'react';
import {AsyncStorage, Platform, StatusBar, View} from 'react-native';
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
    Toast
} from 'native-base';
import moment from "moment/moment";
import styles from '../Style/Style';
import { FontAwesome } from '@expo/vector-icons';

import {addCommentary} from '../Api/Lmdfoot'

class TabComments extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comment : '',
            comments : this.props.comments,
            connected : false,
            isLoading : true,
            isOnline: false
        };
    }

    componentDidMount() {
        this._retrieveData();
    }

    _addComment () {

        if (this.state.comment.length > 0) {
            AsyncStorage.getItem("JWT").then((token) => {

                addCommentary(this.state.comment, this.props.match_id, token).then(data => {

                    this.setState({
                        comment : '',
                        comments: [ ...[data], ...this.state.comments ],
                        isLoading: false,
                        isOnline: true
                    });

                    Toast.show({
                        text: 'Commentaire ajouté',
                        type: 'success',
                        duration: 3000
                    });

                });
            });
        }
    }

    _handleComment (text) {
        this.setState({comment: text});
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
                        <Text style={{fontSize: 13}}>Connecter-vous pour commenter les matchs</Text>
                    </Button>
                )
            }
    }

    render(){

        const { comments } = this.state;

        return(
            <View style={{paddingHorizontal: 10,backgroundColor:'#F6F6F6'}} >
                {this._showCommentForm()}
                <Text style={{textAlign: 'center',marginVertical: 20,fontSize:19, color:'red',fontWeight: "bold"}}>Decouvrez les moments forts du match !!!</Text>

                { (comments.length > 0) ?
                    comments.map(( comment, key ) =>
                        (
                            <Card key={key} style={{flex: 0}}>
                                <CardItem>
                                  <Text style={{fontWeight:'bold',fontSize:15,fontStyle:'italic'}}>{comment.creator.username} - {moment(comment.createdAt).format('DD MMMM à HH:mm:ss')}</Text>
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>
                                            {comment.content}
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        )) :
                    <View style={{alignItems: 'center'}}>
                        <Text style={styles.offline_text}>Aucun commentaire </Text>
                        <FontAwesome  name='comments' size={70} color={'grey'} />
                    </View>
                }

            </View>

        );
    }
}

export default TabComments