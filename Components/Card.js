import React from 'react'
import { View, Image, Text} from 'react-native'
import card from '../Style/Card'

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    _showImage() {

        const { data, type } = this.props;

        if (type === 'player')
            return (<Image style={card.image} source={ (data.image) ? { uri: data.image } : require('../Images/player-default.png') } />)
        else
            return (<Image style={card.image} source={ (data.logo) ? { uri: data.logo } : require('../Images/club-default.png') } />)
    }

    render() {

        const { data } = this.props;

        return (
            <View style={card.container}>
                <View style={card.image_container}>
                    {this._showImage()}
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
