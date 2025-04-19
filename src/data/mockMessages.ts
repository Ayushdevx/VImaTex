
export interface Match {
  id: string;
  name: string;
  image: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  matchId: string;
  messages: Message[];
}

export const mockMatches: Match[] = [
  {
    id: "1",
    name: "Emma",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80",
    lastMessage: "Are you free for coffee tomorrow?",
    lastMessageTime: "2m ago",
    unread: true,
    online: true
  },
  {
    id: "2",
    name: "Michael",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    lastMessage: "That movie was amazing! We should watch the sequel sometime",
    lastMessageTime: "1h ago",
    unread: false,
    online: false
  },
  {
    id: "3",
    name: "Olivia",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1288&q=80",
    lastMessage: "I love that painting too! Have you been to the new exhibit?",
    lastMessageTime: "3h ago",
    unread: true,
    online: true
  },
  {
    id: "5",
    name: "Sophia",
    image: "https://images.unsplash.com/photo-1464863979621-258859e62245?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1286&q=80",
    lastMessage: "Thanks for the study help yesterday!",
    lastMessageTime: "Yesterday",
    unread: false,
    online: false
  },
  {
    id: "6",
    name: "Ethan",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1287&q=80",
    lastMessage: "My band is playing Friday, would you like to come?",
    lastMessageTime: "2d ago",
    unread: false,
    online: true
  }
];

export const mockConversations: { [key: string]: Conversation } = {
  "1": {
    matchId: "1",
    messages: [
      {
        id: "1-1",
        senderId: "1",
        text: "Hey there! I noticed we're both Psychology majors. What classes are you taking this semester?",
        timestamp: "Yesterday, 4:30 PM",
        read: true
      },
      {
        id: "1-2",
        senderId: "user",
        text: "Hi Emma! I'm taking Cognitive Psychology and Research Methods. How about you?",
        timestamp: "Yesterday, 5:15 PM",
        read: true
      },
      {
        id: "1-3",
        senderId: "1",
        text: "I'm in Research Methods too! Professor Johnson's class?",
        timestamp: "Yesterday, 5:20 PM",
        read: true
      },
      {
        id: "1-4",
        senderId: "user",
        text: "Yes! His lectures are so interesting. Would you want to study together sometime?",
        timestamp: "Yesterday, 5:45 PM",
        read: true
      },
      {
        id: "1-5",
        senderId: "1",
        text: "That would be great! I could definitely use a study partner for the midterm.",
        timestamp: "Yesterday, 6:30 PM",
        read: true
      },
      {
        id: "1-6",
        senderId: "user",
        text: "Perfect! How about meeting at the library this week?",
        timestamp: "Yesterday, 7:00 PM",
        read: true
      },
      {
        id: "1-7",
        senderId: "1",
        text: "Are you free for coffee tomorrow?",
        timestamp: "Today, 9:15 AM",
        read: false
      }
    ]
  },
  "3": {
    matchId: "3",
    messages: [
      {
        id: "3-1",
        senderId: "3",
        text: "I saw you're interested in art too! What's your favorite period?",
        timestamp: "2 days ago, 3:45 PM",
        read: true
      },
      {
        id: "3-2",
        senderId: "user",
        text: "I really love Renaissance art, especially the works of Botticelli. How about you?",
        timestamp: "2 days ago, 4:20 PM",
        read: true
      },
      {
        id: "3-3",
        senderId: "3",
        text: "I'm more into modern art, but I appreciate Renaissance too! Botticelli's 'Birth of Venus' is incredible.",
        timestamp: "2 days ago, 5:00 PM",
        read: true
      },
      {
        id: "3-4",
        senderId: "user",
        text: "That's one of my favorites too! Have you seen it in person?",
        timestamp: "2 days ago, 5:15 PM",
        read: true
      },
      {
        id: "3-5",
        senderId: "3",
        text: "Not yet, it's on my bucket list! I did see a few Picasso works at MoMA last summer though.",
        timestamp: "Yesterday, 10:30 AM",
        read: true
      },
      {
        id: "3-6",
        senderId: "user",
        text: "That must have been amazing! I'd love to check out the new exhibit at the university gallery. They have some impressive modern pieces right now.",
        timestamp: "Yesterday, 11:45 AM",
        read: true
      },
      {
        id: "3-7",
        senderId: "3",
        text: "I love that painting too! Have you been to the new exhibit?",
        timestamp: "Today, 8:30 AM",
        read: false
      }
    ]
  }
};
