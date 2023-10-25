import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import AsyncStorage from "@react-native-async-storage/async-storage";

const Chat = ({ route, navigation, db, isConnected }) => {
    const { name, color, _id } = route.params;
    const [messages, setMessages] = useState([]);
    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    useEffect(() => {
        if (isConnected === true) {
            if (unsubMessages) unsubMessages();
            unsubMessages = null;
            const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
            unsubMessages = onSnapshot(q, (docs) => {
                let newMessages = [];
                docs.forEach((doc) => {
                    newMessages.push({
                        _id: doc.id,
                        ...doc.data(),
                        createdAt: new Date(doc.data().createdAt.toMillis()),
                    });
                });
                cacheMessages(newMessages);
                setMessages(newMessages);
            });
        } else loadCachedMessages();

          return () => {
            if (unsubMessages) {
                unsubMessages();
            }
        };
    }, [isConnected]);

    const cacheMessages = async (messagesToCache) => {
        try {
            await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
        } catch (error) {
            console.log(error.message);
        }
    };
    
    const loadCachedMessages = async () => {
        const cachedMessaages = await AsyncStorage.getItem("messages") || [];
        setMessages(JSON.parse(cachedMessaages));
    };

    const onSend = (newMessages) => {
        addDoc(collection(db, "messages"), newMessages[0]);
    };

    const renderBubble = (props) => {
        return (
        <Bubble
            {...props}
            wrapperStyle={{
                right: {
                    backgroundColor: "#000"
                },
                left: {
                    backgroundColor: "#FFF"
                }
            }}
        />
        );
    };

    const renderInputToolbar = (props) => {
        if (isConnected) return <InputToolbar {...props} />;
        else return null;
    };

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolbar}
            onSend={messages => onSend(messages)}
            user={{
                _id:  _id,
                name: name,
            }}
            />
            { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});

export default Chat;