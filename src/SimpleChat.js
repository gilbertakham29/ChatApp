import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import axios from 'axios';

const SimpleChat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const API_KEY = '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';
  const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  const sendMessage = async () => {
    if (inputText.trim() === '') {
      return;
    }

    const message = {
      id: messages.length,
      text: inputText,
      fromUser: true,
    };

    setMessages(prevMessages => [...prevMessages, message]);
    setInputText('');

    try {
      const response = await axios.post(
        API_URL,
        {
          prompt: message.text,
          max_tokens: 50,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      const reply = response.data.choices[0].text.trim();

      const botMessage = {
        id: messages.length + 1,
        text: reply,
        fromUser: false,
      };

      setMessages(prevMessages => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.messageContainer,
          item.fromUser ? styles.userMessage : styles.botMessage,
        ]}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.messagesContainer}
        inverted
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="Type a message..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  messagesContainer: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  messageContainer: {
    padding: 10,
    borderRadius: 8,
    marginVertical: 4,
    maxWidth: '80%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#A6E1FA',
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#F8F8F8',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    marginRight: 8,
  },
  sendButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#3777F0',
    borderRadius: 20,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default SimpleChat;
