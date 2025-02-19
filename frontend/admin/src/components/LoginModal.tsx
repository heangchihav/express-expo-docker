import React, { useContext } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';

interface LoginModalProps {
    visible: boolean;
    onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ visible, onClose }) => {

    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark';

    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={onClose}
            animationType="fade"
        >
            <View style={[
                styles.modalContainer,

            ]}>
                <View style={[styles.modalContent, { backgroundColor: isDarkMode ? Colors.dark.tint : Colors.light.tint }]}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <AntDesign name="closecircleo" size={24} color="white" />

                    </TouchableOpacity>
                    <Text style={[styles.modalTitle, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Login</Text>
                    <View style={styles.modalBody}>

                        <TextInput
                            placeholder="Username"
                            style={[styles.input, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, color: isDarkMode ? Colors.lightText : Colors.lightText }]}
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            style={[styles.input, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, color: isDarkMode ? Colors.lightText : Colors.lightText  }]}
                        />
                        <TouchableOpacity style={styles.rememberMeButton}>
                            <Text style={[styles.rememberMeText, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Remember me</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.forgotPasswordButton}>
                            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.loginButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault }]}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>
                        <View style={styles.signupContainer}>
                            <Text style={styles.signupText}>Don't have an account?</Text>
                            <TouchableOpacity style={styles.signupButton}>
                                <Text style={styles.signupButtonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.6)', // Slightly darker background for better contrast
    },
    modalContent: {
        width: '85%',
        maxWidth: 588,
        backgroundColor: 'white',
        borderRadius: 40,
        padding: 50,
        elevation: 5, // Adds shadow for Android
        shadowColor: '#000', // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 }, // Shadow offset
        shadowOpacity: 0.3, // Shadow opacity
        shadowRadius: 4, // Shadow blur radius
    },
    closeButton: {
        position: 'absolute',
        width: 30,
        height: 30,
        top: 15,
        right: 15,
        zIndex: 1,
    },
    modalBody: {
        marginTop: 30,
    },
    modalTitle: {
        fontSize: 45,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 50,
        borderRadius: 50,
        paddingHorizontal: 30,
        marginBottom: 15,
    },
    rememberMeButton: {
        marginBottom: 10,
    },
    rememberMeText: {
        textAlign: 'left',
        fontSize: 14,
        color: '#007bff',
        paddingHorizontal: 30
    },
    forgotPasswordButton: {
        marginBottom: 20,
    },
    forgotPasswordText: {
        textAlign: 'right',
        fontSize: 14,
        color: '#007bff',
    },
    loginButton: {
        backgroundColor: '#007bff',
        borderRadius: 50,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    signupContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signupText: {
        fontSize: 14,
    },
    signupButton: {
        marginLeft: 5,
    },
    signupButtonText: {
        color: '#007bff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginModal;
