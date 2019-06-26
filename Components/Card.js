import React from 'react'
import { View, Image, TouchableOpacity, Text, ImageBackground,Dimensions} from 'react-native'
import card from '../Style/Card'

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { data } = this.props;

        return (
            <View style={card.container} onPress={() => console.log("test")}>
                <View style={card.image_container}>
                    <Image style={card.image} source={ (data.logo) ? { uri: data.logo } : require('../Images/player-default.png') } />
                </View>
                <View style={card.info_container}>
                    <Text numberOfLines={2} style={card.title}>{data.name}</Text>
                    <Text numberOfLines={2} style={card.info}> { (data.number) ? data.number : data.country } </Text>
                </View>
            </View>
        )
    }
}

export default Card
