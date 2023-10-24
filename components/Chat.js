import { Bubble, GiftedChat } from 'react-native-gifted-chat';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Platform, KeyboardAvoidingView } from 'react-native';
import { collection, getDocs, addDoc, onSnapshot, orderBy, query } from 'firebase/firestore';

const Chat = ({ route, navigation, db }) => {
    const { name, color, _id } = route.params;
    const [messages, setMessages] = useState([]);
    let unsubMessages;

    useEffect(() => {
        navigation.setOptions({ title: name });
    }, []);

    useEffect(() => {
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
            setMessages(newMessages);
        });
          return () => {
            if (unsubMessages) {
                unsubMessages();
            }
        };
    }, []);
      

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

    return (
        <View style={[styles.container, { backgroundColor: color }]}>
            <GiftedChat
            messages={messages}
            renderBubble={renderBubble}
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