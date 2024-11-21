/* eslint-disable react-native/no-inline-styles */
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
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
        <Header />

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
