/* eslint-disable react-native/no-inline-styles */
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {containerStyle, scrollContainer, vh, vw} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const sampleMessages: Message[] = [
  {
    id: 1,
    text: "Hi, I'm experiencing knee pain after running",
    isUser: true,
    timestamp: '09:00 AM',
  },
  {
    id: 2,
    text: 'Please rest and apply ice therapy for 15 minutes',
    isUser: false,
    timestamp: '09:01 AM',
  },
];

const ChatBubble = ({message}: {message: Message}) => (
  <View
    style={[
      styles.messageBubble,
      message.isUser ? styles.userMessage : styles.fixedMessage,
    ]}>
    <Text style={message.isUser ? styles.userText : styles.fixedText}>
      {message.text}
    </Text>
    <Text style={styles.timestamp}>{message.timestamp}</Text>
  </View>
);

const ChatView = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView
        contentContainerStyle={[scrollContainer, styles.chatContainer]}
        showsVerticalScrollIndicator={false}>
        {sampleMessages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              {
                justifyContent: message.isUser ? 'flex-end' : 'flex-start',
              },
            ]}>
            <ChatBubble message={message} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatView;

const styles = StyleSheet.create({
  container: containerStyle,
  chatContainer: {
    paddingHorizontal: vw(4),
    paddingVertical: vh(2),
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: vh(1),
  },
  messageBubble: {
    maxWidth: '70%',
    padding: vw(4),
    borderRadius: vw(5),
  },
  userMessage: {
    backgroundColor: '#F87643',
    borderTopRightRadius: 0,
  },
  fixedMessage: {
    backgroundColor: '#2C2C2E',
    borderTopLeftRadius: 0,
  },
  userText: {
    color: '#000000',
    fontSize: 16,
  },
  fixedText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#8E8E93',
    marginTop: vh(1),
    alignSelf: 'flex-end',
  },
});
