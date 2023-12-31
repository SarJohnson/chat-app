import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import { getAuth, signInAnonymously } from "firebase/auth";

const background_image = require('../assets/Background_Image.png');

const Start = ({ navigation }) => {
    const auth = getAuth();
    const signInUser = () => {
        signInAnonymously(auth)
            .then((result) => {
                navigation.navigate("Chat", {
                    _id: result.user.uid,
                    name: name,
                    color: colors,
                });
                Alert.alert("Sign in successful");
            })
            .catch((error) => {
                Alert.alert("Sign in failed", error.message);
            });
    };
    const [name, setName] = useState('');
    const [background, setBackground] = useState('white');
    const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];

    return (
        <ImageBackground source={background_image} resizeMode="cover" style={styles.container}>
            <Text style={styles.title}>Chat App</Text>
            <View style={styles.content}>
            <TextInput
                style={styles.textInput}
                value={name}
                onChangeText={setName}
                placeholder='Type your name here'
            />
            <Text style={styles.text}>Choose your background color:</Text>
            <View style={styles.colorlist}>
                {colors.map((color, index) => (
                    <TouchableOpacity key={index} style={[styles.box, { backgroundColor: color }, background === color && styles.selected,]} onPress={() => setBackground(color)} />
                ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={signInUser}>
                <Text style={styles.buttonText}>Start Chatting!</Text>
            </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
    },
    content: {
        width: '88%',
        height: '44%',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
    },
    textInput: {
        width: "88%",
        padding: 15,
        borderWidth: 1,
        margin: 10,
        borderColor: 'black',
        fontSize: 16,
        fontWeight: '600',
        color: '#757083',
        marginTop: 20,
    },
    colorlist: {
        flexDirection: 'row',
    },
    box: {
        width: 30,
        height: 30,
        margin: 10,
        borderRadius: 15,
    },
    button: {
        width: '88%',
        margin: 20,
        padding: 20,
        alignItems: 'center',
        backgroundColor: '#757083',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FFFFFF',
    },
    text: {
        fontSize: 16,
        fontWeight: '300',
        color: '#757083',
        marginBottom: 10,
    },
    title: {
        fontSize: 45,
        fontWeight: '600',
        color: '#000000',
        marginTop: 70,
    },
    selected: {
        borderWidth: 1,
        borderColor: 'red',
    },
});

export default Start;