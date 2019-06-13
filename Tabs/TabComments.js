import React from 'react';
import {AsyncStorage, View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon,Thumbnail, Left, Body, Textarea, Form, Button } from 'native-base';
import moment from "moment/moment";
import styles from '../Style/Style';
import { FontAwesome } from '@expo/vector-icons';

import {addCommentary} from '../Api/Lmdfoot'

class TabComments extends React.Component {

    constructor(props) {
        super(props);

        this.comment = '';

        this.state = {
            comments : [],
            isLoading : true,
            isOnline: false
        };
    }

    _addComment () {

        AsyncStorage.getItem("JWT").then((token) => {

            addCommentary(this.comment, 1, token).then(data => {

                console.log(data);

                this.setState({
                    comments: data,
                    isLoading: false,
                    isOnline: true
                });
            });
        });
    }

    _handleComment (text) {
        this.comment = text;
    }

    _showCommentForm () {

        AsyncStorage.getItem("JWT").then((token) => {

            console.log('rr');
            console.log(token);

            if (token!= null) {

                console.log("HEHEHE");

                return (
                    <View></View>
                )
            }
            else {
                return (
                    <Button style={{marginTop: 15, paddingRight: 30, width: '100%',marginRight:10}} iconLeft primary onPress={() => this._searchNearsCinemas()}>
                        <FontAwesome style={{paddingLeft: 15}} name='map-marker' size={30} color={'white'}/>
                        <Text style={{fontSize: 13}}>Connecter-vous pour commenter les matchs</Text>
                    </Button>
                )
            }
        });
    }

    render(){

        const { comments } = this.props;

        return(
            <View>
                <View>
                    <Text style={{textAlign: 'center',marginVertical: 20,fontSize:17, fontWeight: "bold"}}>Participer au match !!!</Text>
                    <Form>
                        <Textarea
                            onChangeText={(text) => this._handleComment(text)}
                            onSubmitEditing={() => this._addComment()}
                            rowSpan={3}
                            bordered
                            placeholder="Ecrivez votre commentaire ..."
                        />
                    </Form>
                </View>
                <Text style={{textAlign: 'center',marginVertical: 20,fontSize:19, color:'red',fontWeight: "bold"}}>Decouvrez les moments forts du match !!!</Text>
                { (comments.length > 0) ?
                    comments.map(( comment, key ) =>
                        (
                            <Card key={key} style={{flex: 0}}>
                                <CardItem>
                                    <Left>
                                        <Thumbnail source={{uri: 'https://randomuser.me/api/portraits/lego/8.jpg'}} />
                                        <Body>
                                            <Text>{comment.creator.username}</Text>
                                            <Text>{moment(comment.createdAt).format('DD MMMM à HH:mm:ss')}</Text>
                                        </Body>
                                    </Left>
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
                    <View style={{justifyContent: 'center'}}>
                        <Text>Aucun commentaire </Text>
                    </View>
                }

            </View>

        );
    }
}

export default TabComments