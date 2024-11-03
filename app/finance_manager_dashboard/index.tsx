import * as React from 'react';
import { Image, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H1, H2, H3, H4, P } from '~/components/ui/typography';
import GjengeLogo from "~/assets/images/gjenge-logo.png"
import CEO from "~/assets/images/ceo.png"
import { Link } from 'expo-router';

export default function Screen() {
  return (
    <View className='relative bg-[#060606] flex-1'>
      <Image source={CEO} alt="" style={{width: "100%", height: "100%", position: "absolute", top: '0'}}/> 
      <View className='items-center p-6 py-12 '>
        <View className='h-2/3 justify-center'>
        </View>
        <View className='flex-col w-full max-w-sm h-1/3 gap-4 justify-end items-center'>
          <Image source={GjengeLogo} alt="" style={{width: 60, height: 60}}/>
          <H1 
            className='text-white text-3xl tracking-tight text-center' 
            style={{
              fontFamily: "Inter_700Bold", 
              fontVariant: "normal", 
              fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'"
            }}
          >
            Finance Manager Dashboard
          </H1>
        </View>
      </View>
    </View>
  );
}