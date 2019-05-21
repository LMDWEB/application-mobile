import React from 'react'
import { View, Image, TouchableOpacity, Text, ImageBackground,Dimensions} from 'react-native'
import match from '../Style/Match'

class Match extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View>
                <TouchableOpacity style={card.container} onPress={() => console.log("test")}>
                    <View style={card.image_container}>
                        <Image style={card.image} source={ (image) ? { uri: getImageFromApi(image, 342) } : require('../Images/default.png') } />
                    </View>
                    <View style={card.info_container}>
                        <Text numberOfLines={2} style={card.title}>{name}</Text>
                        <Text numberOfLines={2} style={card.info}> { (['movie', 'serie', 'episode'].includes(type)) ? moment(info).format('DD MMMM YYYY') : info} </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Match
