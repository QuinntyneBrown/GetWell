import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { ChatScreen } from '../screens/ChatScreen';
import { CrisisResourcesScreen } from '../screens/CrisisResourcesScreen';
import { DonationScreen } from '../screens/DonationScreen';
import { SettingsScreen } from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="CrisisResources" component={CrisisResourcesScreen} />
      <Stack.Screen name="Donation" component={DonationScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  );
}
