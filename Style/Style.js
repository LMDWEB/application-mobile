import React from 'react'
import { StyleSheet} from 'react-native';
import config from "../config";

export default StyleSheet.create({

    container: {
        flex:1,
    },

    main_container: {
        flex:1,
        backgroundColor: config.background_color,
        paddingLeft: 10,
        paddingBottom: 10

    },

    main_second_container: {
        flex:1,
        backgroundColor: config.background_color,
        paddingLeft: 10,
        paddingRight: 10,
        paddingBottom: 10
    },

    main_third_container: {
        flex:1,
        paddingLeft: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
    },

    // Main Page


    title: {
        fontWeight: 'bold',
        fontSize: 25,
        marginTop: 17,
        marginBottom: 10,
        textAlign: 'center'
    },

    // Loader

    loading_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },

    // Settings

    settings_title: {
        textAlign:'left',
        fontSize: 16,
        color:'black',
        fontWeight: 'bold',
        paddingTop:20,
        paddingLeft:10
    },

    settings_icon: {
        marginRight:12
    },

    // Offline

    offline_container : {
        alignItems:'center',
        marginTop:50
    },

    offline_text: {
        marginBottom:20,
        color:'grey',
        fontWeight:'bold',
        fontSize:20
    },

    offline_button: {
        marginTop:30,
        borderWidth: 1,
        padding:8
    }

});
