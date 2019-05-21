import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';

// Detail Page

export default StyleSheet.create({

    // Hero

    title: {
        position: 'absolute',
        top: '30%',
        zIndex:3,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },

    title_center: {
        position: 'absolute',
        top: '40%',
        zIndex:3,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },

    title_bis: {
        position: 'absolute',
        top: '35%',
        zIndex:3,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },

    year: {
        position: 'absolute',
        left: 20,
        bottom: 15,
        zIndex:3,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },

    time: {
        position: 'absolute',
        right: 20,
        bottom: 15,
        zIndex:3,
        color: 'white',
        fontSize: 15,
        fontWeight: 'bold'
    },

    address: {
        position: 'absolute',
        textAlign: 'center',
        top: '55%',
        zIndex:3,
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        flexWrap: 'wrap'
    },

    back: {
        position: 'absolute',
        left: 15,
        top: 40,
        zIndex:3,
        color: 'white',
        fontWeight: 'bold'
    },

    share: {
        position: 'absolute',
        right: 15,
        top: 40,
        zIndex:3,
        color: 'white',
        fontWeight: 'bold'
    },

    hero_overflow: {
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        height:250,
        width:'100%',
        zIndex:2
    },

    hero: {
        height:250,
        width: '100%',
        resizeMode:'cover'
    },

    hero_poster: {
        resizeMode:'cover',
        height:220,
        width:160,
        borderWidth: 1,
        borderRadius: 2,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2
    },

    hero_button: {
        position: 'absolute',
        alignSelf: 'center',
        top: '50%',
        zIndex:3
    },

    // Detail page

    info_container: {
        backgroundColor: 'white',
        paddingHorizontal:10,
        paddingVertical:10,
        textAlign:'left'
    },

    info_secondary_container: {
        backgroundColor: 'white',
        textAlign:'center',
        paddingVertical:15,
        flexDirection: 'row',
        alignItems:'center',
        justifyContent: 'center',
        borderColor: '#ccc',
        borderWidth: 1,
    },

    info_title: {
        fontWeight: 'bold',
        fontSize: 19,
        flexWrap: 'wrap',
        color: '#000000',
        paddingBottom:10
    },

    text_muted: {
        color:'grey'
    },

    info_text: {
        color:'black'
    },

    // Description

    description_container: {
        paddingVertical:10,
        paddingHorizontal:10,
        backgroundColor: '#FFF',
    },

    description: {
        color:'black',
        marginBottom: 10
    },

    container_video: {

    },

    media_overflow: {
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0.3,
        backgroundColor: 'black',
        height:'100%',
        width:'100%',
        zIndex:2,
        borderRadius: 9
    },

    no_result_container: {
        marginTop:25,
        alignItems:'center'
    },

    no_result_text: {
        marginBottom:20,
        color:'grey',
        fontWeight:'bold',
        fontSize:20
    }

});
