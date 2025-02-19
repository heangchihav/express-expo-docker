import React, { useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importing Ionicons from @expo/vector-icons
import SlideInModal from './SlideInModal';

const SmallScreenNav = () => {
  const [menuModalVisible, setMenuModalVisible] = useState(false);

  const toggleModal = () => setMenuModalVisible((prev) => !prev);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleModal} style={styles.menuIconContainer}>
        <Ionicons name="menu" size={30} color="#333" /> 
      </TouchableOpacity>
      <Image
        source={{ uri: 'https://i.imgur.com/CDwyIk4.png' }} 
        style={styles.logo}
      />
      <View style={styles.placeholder} />
      <SlideInModal visible={menuModalVisible} closeModal={toggleModal} />
    </View>
  );
};

export default SmallScreenNav;

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    elevation: 4,
  },
  menuIconContainer: {
    padding: 10,
  },
  logo: {
    width: 180,
    height: 60,
    resizeMode: 'contain', // Ensures the logo fits within the container
  },
  placeholder: {
    width: 40, // This width is for alignment to balance the logo in the center
  },
});
