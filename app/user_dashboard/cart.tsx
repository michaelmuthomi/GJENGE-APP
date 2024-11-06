import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { H4 } from '~/components/ui/typography';

const CartPage = () => {
  return (
    <View className=" bg-[#060606] flex-1 pt-14 px-6 gap-10">
      <View className="flex justify-center">
        <H4
          className=" color-white"
          style={{ fontFamily: "Inter_600SemiBold" }}
        >
          Products in Cart
        </H4>
      </View>
    </View>
  );
};

export default CartPage;
