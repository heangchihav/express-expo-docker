import React, { useContext, useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';

import { Colors } from '../constants/Colors';
import { AntDesign } from '@expo/vector-icons';
import { ThemeContext } from '../contexts/ThemeContext';

interface SignUpModalProps {
    visible: boolean;
    onClose: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ visible, onClose }) => {

    const { theme } = useContext(ThemeContext);
    const isDarkMode = theme === 'dark';

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [contactNumber, setContactNumber] = useState('');

    return (
        <Modal
            transparent
            visible={visible}
            onRequestClose={onClose}
            animationType="fade"
        >
            <View style={styles.modalContainer}>
                <View style={[styles.modalContent, { backgroundColor: isDarkMode ? Colors.dark.tint : Colors.light.tint }]}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <AntDesign name="closecircleo" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={[styles.modalTitle, { color: isDarkMode ? Colors.dark.text : Colors.light.text }]}>Sign Up</Text>
                    <View style={styles.modalBody}>

                        <TextInput
                            placeholder="Username"
                            value={username}
                            onChangeText={setUsername}
                            style={[styles.input, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, color: isDarkMode ? Colors.lightText : Colors.lightText }]}
                        />
                        <TextInput
                            placeholder="Password"
                            secureTextEntry
                            value={password}
                            onChangeText={setPassword}
                            style={[styles.input, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, color: isDarkMode ? Colors.lightText : Colors.lightText }]}
                        />
                        <TextInput
                            placeholder="Confirm Password"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            style={[styles.input, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, color: isDarkMode ? Colors.lightText : Colors.lightText }]}
                        />
                        <TextInput
                            placeholder="Contact Number"
                            value={contactNumber}
                            onChangeText={setContactNumber}
                            style={[styles.input, { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background, color: isDarkMode ? Colors.lightText : Colors.lightText }]}
                        />
                        <TouchableOpacity style={[styles.signupButton, { backgroundColor: isDarkMode ? Colors.dark.tabIconDefault : Colors.light.tabIconDefault }]}>
                            <Text style={[styles.signupButtonText,{color: isDarkMode ? Colors.dark.text : Colors.light.text}]}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>Already have an account?</Text>
                            <TouchableOpacity style={styles.loginButton}>
                                <Text style={styles.loginButtonText}>Login</Text>
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
    signupButton: {
        backgroundColor: '#007bff',
        borderRadius: 50,
        paddingVertical: 10,
        alignItems: 'center',
        marginBottom: 20,
    },
    signupButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginText: {
        fontSize: 14,
    },
    loginButton: {
        marginLeft: 5,
    },
    loginButtonText: {
        color: '#007bff',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default SignUpModal;
