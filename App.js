import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';


import SplashScreen from './Screens/SplashScreen';
import SignIn from './Screens/SignIn/SignIn';

import StrategiesList from './Screens/StrategiesList';
import StrategyDetails from './Screens/StrategyDetails/StrategyDetails';
import PaymentSuccess from './Screens/PaymentSuccess/PaymentSuccess';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



// import home from './assets/Home.png';
import blog from './assets/setting.png';
import profile from './assets/profile.png';
import Colors from './utils/colors';
import LandingContainer from './Screens/LandingScreen/LandingContainer';
import PersonalInformation from './Screens/PersonalInformation/PersonalInformation'; import SubscriptionPayment from './Screens/SubscriptionPayment/SubscriptionPayment';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import OtpVerify from './Screens/OtpVerify/OtpVerify';
import CustomBackHeader from './Components/CustomBackHeader';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentFailed from './Screens/paymentFailed/PaymentFailed';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


























const App = ({ navigation }) => {


  return (
    <StripeProvider
      publishableKey="pk_test_51IyB5xSAHMKdkV3ewNKnMkBL5FLjuj4MqygAczHJL4cGevO05L30TG6x76Q0dW8wKXKEkFS3PzGhYmEosaV5ALUC001ENLyNpW"
      merchantIdentifier="merchant.identifier" // required for Apple Pay
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    >
      <NavigationContainer>

        <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: 'transparent' },
        }}>


          <Stack.Screen name="SplashScreen" component={SplashScreen}
            options={{
              headerShown: false,
              animation: 'fade'
            }} />

          <Stack.Screen name="SignIn" component={SignIn}
            options={{
              headerShown: false,
              animation: 'fade'
            }} />





          <Stack.Screen name="OtpVerify" component={OtpVerify}
            options={{
              headerShown: false,
              animation: 'fade'
            }} />

          <Stack.Screen name="PersonalInformation" component={PersonalInformation}
            options={{
              headerShown: false,
              animation: 'fade'
            }} />


          <Stack.Screen name="StrategiesList" component={StrategiesList}
            options={{
              headerShown: true,
              animation: 'fade',
            }} />

          <Stack.Screen name="StrategyDetails" component={StrategyDetails}
            options={{
              headerShown: true,
              animation: 'fade',
            }} />






          <Stack.Screen name="PaymentSuccess" component={PaymentSuccess}
            options={{
              headerShown: false,
              animation: 'fade',
            }} />


          <Stack.Screen name="PaymentFailed" component={PaymentFailed}
            options={{
              headerShown: false,
              animation: 'fade',
            }} />



        </Stack.Navigator>
      </NavigationContainer>
    </StripeProvider>
  );
}

export default App;


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    // borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8E8E8',
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    // elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
});