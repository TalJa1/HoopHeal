/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {
  centerAll,
  containerStyle,
  rowCenter,
  scrollContainer,
  vh,
  vw,
} from '../../services/styleProps';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {backIcon, searchIcon} from '../../assets/svgIcon';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const sampleMessages: Message[] = [
  {
    id: 1,
    text: 'Hello, Mr. Gupta, Your kid has not done his homework for the past 3 days',
    isUser: true,
    timestamp: '09:00 AM',
  },
  {
    id: 2,
    text: 'Hello, Mr. Ajay Thank you for bringing this to my notice. I will look into it.',
    isUser: false,
    timestamp: '09:01 AM',
  },
];

// Add avatar image component
const Avatar = () => (
  <Image
    source={require('../../assets/progress/expert.png')}
    style={styles.avatar}
  />
);

// Modify ChatBubble to include avatar
const ChatBubble = ({message}: {message: Message}) => (
  <View style={styles.messageWrapper}>
    {!message.isUser && <Avatar />}
    <View
      style={[
        styles.messageBubble,
        message.isUser ? styles.userMessage : styles.fixedMessage,
      ]}>
      <Text style={message.isUser ? styles.userText : styles.fixedText}>
        {message.text}
      </Text>
    </View>
  </View>
);

const ChatView = () => {
  const [messages, setMessages] = useState<Message[]>(sampleMessages);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage: Message = {
        id: messages.length + 1,
        text: inputMessage,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={'black'} />
      <ScrollView
        contentContainerStyle={[scrollContainer, styles.chatContainer]}
        showsVerticalScrollIndicator={false}>
        <Header />

        {messages.map(message => (
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
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={inputMessage}
          onChangeText={setInputMessage}
          placeholder="Type a message..."
          placeholderTextColor="#8E8E93"
          onSubmitEditing={handleSendMessage}
        />
      </View>
    </SafeAreaView>
  );
};

const Header: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  return (
    <View style={[rowCenter, {marginBottom: vh(2)}]}>
      <View style={[rowCenter]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          {backIcon(vw(8), vw(8), '#F87643')}
        </TouchableOpacity>
        <View
          style={[
            {
              marginLeft: vw(4),
              width: vw(8),
              height: vw(8),
              backgroundColor: '#626262',
              borderRadius: vw(50),
            },
            centerAll,
          ]}>
          {searchIcon(vw(6), vw(6), 'black')}
        </View>
      </View>
      <View
        style={[
          {
            backgroundColor: '#F87643',
            borderRadius: 12,
            padding: vw(2),
            position: 'absolute',
            right: vw(0),
          },
          centerAll,
        ]}>
        <Text style={{color: 'white'}}>Expert</Text>
      </View>
    </View>
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
    width: '100%',
  },
  messageBubble: {
    padding: vw(4),
    borderRadius: vw(5),
    width: vw(60),
  },
  userMessage: {
    backgroundColor: '#F87643',
    borderTopRightRadius: 0,
    alignSelf: 'flex-end',
  },
  fixedMessage: {
    backgroundColor: '#2C2C2E',
    borderTopLeftRadius: 0,
    alignSelf: 'flex-start',
  },
  userText: {
    color: 'white',
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
  messageWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginVertical: vh(1),
  },
  avatar: {
    width: vw(7),
    height: vw(7),
    borderRadius: vw(5),
    marginRight: vw(2),
  },
  inputContainer: {
    padding: vw(4),
    borderTopWidth: 1,
    borderTopColor: '#2C2C2E',
    backgroundColor: 'black',
  },
  input: {
    backgroundColor: '#2C2C2E',
    borderRadius: vw(5),
    padding: vw(4),
    color: 'white',
    fontSize: 16,
  },
});
