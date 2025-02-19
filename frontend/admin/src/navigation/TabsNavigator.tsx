import React from 'react';
import { Animated, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ContactPage from '../screens/menus/contact';
import PromotionPage from '../screens/menus/promotion';
import WalletPage from '../screens/menus/wallet';
import { useNavigation } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';
import HomePage from '../screens/menus';

// Type the navigation hook
type TabsNavigationProp = CompositeNavigationProp<
    StackNavigationProp<RootStackParamList, 'Tabs'>,
    StackNavigationProp<RootStackParamList>
>;

export default function TabsNavigator() {
    const navigation = useNavigation<TabsNavigationProp>();

    // Function to navigate to StackNavigator
    const navigateToStackNavigator = () => {
        navigation.navigate('StackNavigator');
    };

    return (
        <CurvedBottomBarExpo.Navigator
            type="DOWN"
            style={styles.bottomBar}
            shadowStyle={styles.shadow}
            height={55}
            circleWidth={50}
            bgColor="white"
            initialRouteName="Home"
            renderCircle={() => (
                <Animated.View style={styles.btnCircleUp}>
                    <TouchableOpacity onPress={navigateToStackNavigator}>
                        <Image
                            source={{ uri: "https://res.cloudinary.com/da8ox9rlr/image/upload/v1725004553/icg/Royal-Blue-Crown-PNG-removebg-preview_yfs2t1.png" }}
                            style={styles.logo}
                        />
                    </TouchableOpacity>
                </Animated.View>
            )}
            tabBar={renderTabBar}
            screenOptions={{ headerShown: false }}
        >
            <CurvedBottomBarExpo.Screen
                name="Home"
                position="LEFT"
                component={HomePage}
            />
            <CurvedBottomBarExpo.Screen
                name="Promotion"
                position="LEFT"
                component={PromotionPage}
            />
            <CurvedBottomBarExpo.Screen
                name="Contact"
                position="RIGHT"
                component={ContactPage}
            />
            <CurvedBottomBarExpo.Screen
                name="Wallet"
                position="RIGHT"
                component={WalletPage}
            />
        </CurvedBottomBarExpo.Navigator>
    );
}

// Define types for the renderTabBar function arguments
interface RenderTabBarProps {
    routeName: string;
    selectedTab: string;
    navigate: (routeName: string) => void;
}

const getTabBarIcon = (routeName: string, selectedTab: string) => {
    switch (routeName) {
        case 'Home':
            return <Ionicons name="home-outline" size={25} color={routeName === selectedTab ? 'red' : 'gray'} />;
        case 'Promotion':
            return <Ionicons name="pricetag-outline" size={25} color={routeName === selectedTab ? 'red' : 'gray'} />;
        case 'Contact':
            return <Ionicons name="call-outline" size={25} color={routeName === selectedTab ? 'red' : 'gray'} />;
        case 'Wallet':
            return <MaterialCommunityIcons name="wallet-outline" size={25} color={routeName === selectedTab ? 'red' : 'gray'} />;
        default:
            return <Ionicons name="help-circle-outline" size={25} color={routeName === selectedTab ? 'red' : 'gray'} />;
    }
}

// Render the tab bar with the appropriate icons
const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
}: RenderTabBarProps) => {
    return (
        <TouchableOpacity
            onPress={() => navigate(routeName)}
            style={styles.tabbarItem}
        >
            {getTabBarIcon(routeName, selectedTab)}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    shadow: {},
    button: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "red",
    },
    btnCircleUp: {
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ff3636',
        bottom: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 1,
    },
    bottomBar: {},
    tabbarItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#ededed",
        padding: 5,
        marginHorizontal: 15,
        borderRadius: 20
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "red",
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
});
