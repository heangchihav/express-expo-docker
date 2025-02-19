import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Sports from '../screens/games/sport_lobby';
import Casino from '../screens/games/casino_lobby';
import Slots from '../screens/games/slots_lobby'; // Corrected from sport_lobby
import FishingLayout from '../screens/(slots_finsh)/_layout';
import NumberLobby from '../screens/games/number_lobby';
import Poker from '../screens/games/poker_lobby';
import Lottery from '../screens/games/lott_lobby';
import Cock from '../screens/games/cock_lobby';
import Promotion from '../screens/menus/promotion';
import { RootStackParamList } from '../types/navigation';
const Stack = createStackNavigator<RootStackParamList>();

export const StackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SportScreen" component={Sports} />
    <Stack.Screen name="LiveCasinoScreen" component={Casino} />
    <Stack.Screen name="SlotsScreen" component={Slots} />
    <Stack.Screen name="FishingGamesScreen" component={FishingLayout} />
    <Stack.Screen name="NumberScreen" component={NumberLobby} />
    <Stack.Screen name="PokerScreen" component={Poker} />
    <Stack.Screen name="LotteryScreen" component={Lottery} />
    <Stack.Screen name="CockfightScreen" component={Cock} />
    <Stack.Screen name="PromotionScreen" component={Promotion} />
  </Stack.Navigator>
);
