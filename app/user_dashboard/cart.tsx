import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CartPage = () => {
  return (
    <View style={styles.container}>
      <Text>Cart Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CartPage;

