import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

const UnderNav = () => {
    return (
        <View style={styles.container}>
            <View style={styles.menuContainer}>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Settings</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>Help</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuItem}>
                    <Text style={styles.menuText}>About</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default UnderNav

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 100,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#ffd700',
        paddingVertical: 10,
        backgroundColor: '#f0f0f0', // add a default background color
    },
    menuContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
    },
    menuItem: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff', // add a default background color
    },
    menuText: {
        fontSize: 16,
        color: '#333', // add a default text color
    },
})