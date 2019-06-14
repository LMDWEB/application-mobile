import React from 'react'
import {View, Image, TouchableOpacity, Text, StyleSheet} from 'react-native'

class Match extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { data, displayDetail } = this.props;

        return (
                <TouchableOpacity style={styles.container} onPress={() => displayDetail(data.id)}>
                    <View style={{padding: 15,flexDirection: 'row',justifyContent: 'center',alignItems: 'center'}}>
                        <Text style={{marginRight: 5}}>{data.homeTeam.name} </Text>
                        <Image style={{width:35,height:35,marginRight: 5}} source={ (data.homeTeam.logo) ? { uri: data.homeTeam.logo} : require('../Images/team.png') } />
                        <Text style={{fontWeight: 'bold',marginRight: 5}}> {data.goalsHomeTeam} - {data.goalsAwayTeam} </Text>
                        <Image style={{width:35,height:35,marginRight: 5}} source={ (data.awayTeam.logo) ? { uri: data.awayTeam.logo} : require('../Images/team.png') } />
                        <Text>{data.awayTeam.name} </Text>
                    </View>
                </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({

    container: {
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 2,
        marginRight: 6,
        backgroundColor:'#fff',
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3
    },

    image: {
        width: '100%',
        height: 250,
        resizeMode:'cover'
    },

    content_container: {
        padding: 10
    },

    title_text: {
        textAlign:'center',
        fontWeight: 'bold',
        fontSize: 18,
        flexWrap: 'wrap'
    },

    description_text: {
        textAlign:'center',
        fontStyle: 'italic',
        fontWeight: 'bold',
        color: '#666666',
        marginTop:10,
        fontSize: 16,
    },

    button_container: {
        marginVertical:15,
        marginHorizontal:5,
        justifyContent: 'space-around',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    button_icon: {
        paddingLeft:8
    },

    button_text: {
        fontSize:11
    }
});

export default Match
