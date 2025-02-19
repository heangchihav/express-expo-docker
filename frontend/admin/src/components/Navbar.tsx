import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeSwitcherButton from './ThemeSwitcherButton';

import { Colors } from '../constants/Colors';
import LoginModal from './LoginModal';
import SignUpModal from './SignUpModal';
import { useTheme } from '@/contexts/ThemeContext';
import { FontAwesome } from '@expo/vector-icons';

const Navbar = () => {
    const { theme } = useTheme();
    const isDarkMode = theme === 'dark';
    const [loginModalVisible, setLoginModalVisible] = useState(false);
    const [signUpModalVisible, setSignUpModalVisible] = useState(false);

    const openLoginModal = () => setLoginModalVisible(true);
    const closeLoginModal = () => setLoginModalVisible(false);

    const openSignUpModal = () => setSignUpModalVisible(true);
    const closeSignUpModal = () => setSignUpModalVisible(false);

    const screenWidth = Dimensions.get('window').width;
    const isLargeScreen = screenWidth > 768;

    return (
        <View style={[
            styles.navbarContainer,
            { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background }
        ]}>
            <View style={styles.logoContainer}>
                <Image
                    source={{ uri: "https://i.imgur.com/CDwyIk4.png" }}
                    style={styles.logo}
                />
            </View>

            <View style={styles.menuContainer}>
                <View style={styles.menuItems}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={[styles.menuText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Home</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Text style={[styles.menuText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>About</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.rightContainer}>
                    <View style={{ display: "flex", flexDirection: "row", gap: 10 }}>
                        <LanguageSwitcher />
                        <ThemeSwitcherButton />
                    </View>

                    <View style={styles.authContainer}>
                        <TouchableOpacity
                            style={[styles.authButton, { backgroundColor: isDarkMode ? Colors.dark.tint : Colors.light.tint }]}
                            onPress={openLoginModal}
                        >
                            <FontAwesome name="sign-in" size={20} color="#fff" style={styles.authIcon} />
                            <Text style={styles.authText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.authButton, { backgroundColor: isDarkMode ? Colors.dark.tint : Colors.light.tint }]}
                            onPress={openSignUpModal}
                        >
                            <FontAwesome name="user-plus" size={20} color="#fff" style={styles.authIcon} />
                            <Text style={styles.authText}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <LoginModal visible={loginModalVisible} onClose={closeLoginModal} />
            <SignUpModal visible={signUpModalVisible} onClose={closeSignUpModal} />
        </View>

    );
};

// Define styles for Navbar
const styles = StyleSheet.create({
    navbarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#dee2e6',
    },
    logoContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    logo: {
        width: 250,
        height: 40,
        resizeMode: 'contain',
    },
    menuContainer: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuItems: {
        flexDirection: 'row',
    },
    menuItem: {
        marginHorizontal: 10,
    },
    menuText: {
        fontSize: 16,
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    authContainer: {
        flexDirection: 'row',
    },
    authButton: {
        width: 100,
        height: 35,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flexDirection: 'row',
    },
    authText: {
        color: '#fff',
        fontSize: 15,
        marginLeft: 5,
    },
    authIcon: {
        // Optional: Additional styling for the icons
    },
});

export default Navbar;
