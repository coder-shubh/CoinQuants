import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';



import SplashScreen from './Screens/SplashScreen';
import SignIn from './Screens/SignIn/SignIn';
import StrategiesList from './Screens/StrategiesList';
import StrategyDetails from './Screens/StrategyDetails/StrategyDetails';
import PaymentSuccess from './Screens/PaymentSuccess/PaymentSuccess';

import PersonalInformation from './Screens/PersonalInformation/PersonalInformation';
import OtpVerify from './Screens/OtpVerify/OtpVerify';
import { StripeProvider } from '@stripe/stripe-react-native';
import PaymentFailed from './Screens/paymentFailed/PaymentFailed';


const Stack = createNativeStackNavigator();

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


