import * as React from 'react';
import { View, Image, Text } from 'react-native';

export function Loading() { 
  return (
    <View className="flex-1 items-center justify-center gap-6 p-6 bg-[#101010]">
      <Image
        source={require("~/assets/images/gjenge-logo.png")}
        style={{
          width: 100,
          height: 100,
          resizeMode: "contain",
        }}
      />
    </View>
  );
}