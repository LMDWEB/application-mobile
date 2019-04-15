import React from 'react'
import { View, Image, TouchableOpacity, Text, ImageBackground,Dimensions} from 'react-native'
import card from '../Style/Card'

class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <View>
                <TouchableOpacity style={card.container} onPress={() => (type == 'season') ? displaySeason(serieId, id) : ((type == 'episode') ? displayEpisode(serieId, seasonId, id) : (displayDetail(id, type)))}>
                    <View style={card.image_container}>
                        <Image style={card.image} source={ (image) ? { uri: getImageFromApi(image, 342) } : (type == 'person') ? ( (gender == 2 ) ? require('../Images/default_men.png') : require('../Images/default_women.jpg') ) : require('../Images/default.png') } />
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

export default Card
