import messaging from '@react-native-firebase/messaging';
import { localStorage } from './storage';
import { Platform } from 'react-native';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
};

const getFcmTokenFromLocalStorage = async () => {
  const fcmtoken = localStorage.getString('fcmtoken');
  if (!fcmtoken) {
    try {
      const newFcmToken = await messaging().getToken();
      localStorage.set('fcmtoken', newFcmToken);
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log('token found', fcmtoken);
  }
};

const getFcmToken = async () => {
  try {
    const newFcmToken = await messaging().getToken();
    return newFcmToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const showLocalNotification = (title, message) => {
  // Implement local notification based on the platform (iOS or Android)
  if (Platform.OS === 'ios') {
    // iOS implementation using PushNotificationIOS
    PushNotificationIOS.presentLocalNotification({
      alertTitle: title,
      alertBody: message,
      // Add other necessary properties as needed
    });
  } else {
    // Android implementation using react-native-push-notification
    PushNotification.localNotification({
      // channelId: 'your_channel_id',
      title: title,
      message: message,
      // Add other necessary properties as needed
    });
  }
};

const notificationListener = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    })
    .catch(error => console.log('failed', error));

  messaging().onMessage(async remoteMessage => {
    // Replace Alert with local notification
    showLocalNotification(JSON.stringify(remoteMessage.notification.title), JSON.stringify(remoteMessage.notification.body));
  });
};

const createNotificationChannel = () => {
  if (Platform.OS === 'android') {
    PushNotification.createChannel(
      {
        channelId: 'your_channel_id', // Replace with your desired channel ID
        channelName: 'Your Channel Name',
        channelDescription: 'Your Channel Description',
        soundName: 'default',
        importance: 4, // Importance level: 4 = high, 3 = default, 2 = low
        vibrate: true,
      },
      created => console.log(`Channel created: ${created}`)
    );
  }
};

export {
  getFcmToken,
  getFcmTokenFromLocalStorage,
  requestUserPermission,
  notificationListener,
  createNotificationChannel
};
