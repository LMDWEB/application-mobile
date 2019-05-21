import React from 'react'
import { StyleSheet} from 'react-native';

// Match Style

export default StyleSheet.create({

    container: {
        height: 270,
        width: 130,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 2,
        marginRight: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 1.5,
        elevation: 3
    },

    image_container: {
        flex: 2
    },

    image: {
        flex:1,
        width:undefined,
        height:undefined,
        resizeMode:'cover'
    },

    picture: {
        flex:1,
        width:null,
        resizeMode:'cover',
        borderRadius: 9,
        height: 170
    },

    info_container:{
        flex:1,
        backgroundColor: 'white',
        paddingLeft: 2,
        paddingRight: 2,
        paddingTop:10
    },

    title : {
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 10,
        textAlign: 'center'
    },

    info : {
        textAlign:'center',
        color:'grey',
        fontSize:13
    }

});
