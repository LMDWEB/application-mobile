import React from 'react';
import {AsyncStorage, View} from 'react-native';
import { Container, Header, Content, Card, CardItem, Text, Icon,Thumbnail, Left, Body, Textarea, Form } from 'native-base';
import moment from "moment/moment";
import styles from '../Style/Style'

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

    render(){

        const { comments } = this.props;

        return(
            <View>
                <Text style={{textAlign: 'center',marginVertical: 20,fontSize:19, color:'red',fontWeight: "bold"}}>Decouvrez les moments forts du match !!!</Text>
                <Form>
                    <Textarea
                        onChangeText={(text) => this._handleComment(text)}
                        onSubmitEditing={() => this._addComment()}
                        rowSpan={3}
                        bordered
                        placeholder="Ecrivez votre commentaire ..."
                    />
                </Form>
                <Text style={styles.title}>{comments.length} commentaires</Text>
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