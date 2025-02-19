import React, { useState, useRef } from 'react';
import { StyleSheet, TouchableOpacity, Image, Animated, View } from 'react-native';
import UserProfile from './userProfile';
import { User } from '../types/types';
import { LinearGradient } from 'expo-linear-gradient';

const AvatarModal: React.FC = () => {
    const [isAvatarModalVisible, setAvatarModalVisible] = useState(false);
    const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value

    const toggleAvatarModal = () => {
        if (isAvatarModalVisible) {
            // Animate scale back to 1
            Animated.timing(scaleAnim, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
            }).start();
        } else {
            // Animate scale to 1.2
            Animated.timing(scaleAnim, {
                toValue: 1.2,
                duration: 200,
                useNativeDriver: false,
            }).start();
        }
        setAvatarModalVisible(!isAvatarModalVisible);
    };

    const user: User = {
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatarUri: 'https://image.winudf.com/v2/image1/Y29tLkFuaW1lQm95cy5Qcm9maWxlUGljdHVyZXNfc2NyZWVuXzBfMTY5MTgyMzI5MF8wMzk/screen-0.jpg?fakeurl=1&type=.jpg',
    };

    const animatedStyle = {
        transform: [{ scale: scaleAnim }]
    };

    return (
        <View style={styles.avatarContainer}>
            <View>
                <TouchableOpacity onPress={toggleAvatarModal}>
                    <LinearGradient
                        colors={['#bf5b04', '#ffcc00', "#e80008"]}
                        start={[0, 0]}
                        end={[1, 1]}
                        style={styles.gradientBorder}
                    >
                        <Animated.Image
                            source={{ uri: user.avatarUri }}
                            style={[styles.avatar, animatedStyle]}
                        />
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            <View>
                <UserProfile
                    user={user}
                    onPress={toggleAvatarModal}
                    visible={isAvatarModalVisible}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    avatarContainer: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 50
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: 'transparent', // Border color is managed by gradient
    },
    gradientBorder: {
        width: 80,
        height: 80,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0,
        borderColor: 'transparent', // Ensures the border color from gradient is visible
    },
});

export default AvatarModal;
