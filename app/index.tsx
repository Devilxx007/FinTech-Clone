import { View, StyleSheet,Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { Video } from 'expo-av';
import { useAssets } from 'expo-asset';
import { Link } from 'expo-router';

const Intro = () => {
    const [asset] = useAssets(require("@/assets/video/intro.mp4"));
    return (
        <View style={styles.container}>
            {asset && (
                <Video
                    isLooping
                    isMuted
                    shouldPlay
                    source={{ uri: asset[0]?.uri }}
                    resizeMode="cover"
                    style={styles.video}
                />
            )}
            <View style={{  marginTop:"12%", padding:"2%"}}>
                <Text style={styles.header}>ready to change the way you money</Text>
            </View>
            <View style={styles.button_container}>
                <Link href={"/login"} asChild style={{backgroundColor:"#002244",borderRadius:9999,paddingHorizontal:30,paddingVertical:12}}>
                    <TouchableOpacity >
                        <Text style={{color:"white",fontSize:25,fontWeight:"bold"}}>Log In</Text>
                    </TouchableOpacity>
                </Link>
                <Link href={"/signup"} asChild style={{backgroundColor:"#ffff",borderRadius:9999,paddingHorizontal:30,paddingVertical:12}}>
                <TouchableOpacity>
                        <Text style={{color:"black",fontSize:25,fontWeight:"bold"}}>Sign Up</Text>
                </TouchableOpacity>
                </Link>
            </View>
        </View>
    );
};

export default Intro;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:"space-between",
    },
    video: {
        width:"100%",
        height:"100%",
        position:"absolute"
    },
    header:{
        fontWeight:"bold",
        fontSize:36,
        color:"white",
        textTransform:"uppercase"
    },
    button_container:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginBottom:"10%",
    },
});
