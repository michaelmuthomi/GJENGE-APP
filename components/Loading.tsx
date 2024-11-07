import * as React from 'react';
import { View, Image, Text } from 'react-native';
import { GjengeLogoIMG } from "~/assets/images/gjenge-logo.png";

export function Loading() { 
  return (
    <View className="flex-1 items-center justify-center gap-6 p-6 bg-[#101010]">
      <Image
        source={GjengeLogoIMG}
        style={{
          width: 400,
          height: 400,
          resizeMode: "contain",
        }}
      />
      <Text
        className="color-white absolute bottom-20 text-center uppercase font-bold text-3xl"
        style={{ fontFamily: "sans-serif" }}
      >
        Gjenge Mekers
      </Text>
    </View>
  );
}