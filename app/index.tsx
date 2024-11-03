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
          {/* <H1 className='text-2xl text-white'>Welcome to GJENGE</H1> */}
          <Image source={GjengeLogo} alt="" style={{width: 60, height: 60}}/>
          <H1 
            className='text-white text-3xl tracking-tight text-center' 
            style={{
              fontFamily: "Inter_900Black", 
              fontVariant: "normal", 
              fontFeatureSettings: "'cv02', 'cv03', 'cv04', 'cv11'"
            }}
          >
            Build Alternatively, Affordably, Sustainably.
          </H1>
          <View className='gap-4 w-full'>
            <Button
              size={"lg"}
              variant={"default"}
              className='bg-[#66d46f] text-white rounded-full h-10'
            >
              <Link href={{ pathname: "/screens/SignupScreen" }}>
              <P className='text-base' style={{fontFamily: "Inter_700Bold"}}>Create an account</P>
              </Link>
            </Button>
            <Button
              size={"lg"}
              // variant={'outline'}
              className='text-white rounded-full h-10 bg-[#212121]'
              onPress={() => {/* Continue logic */}}
            >
              <Link href={{ pathname: "/screens/LoginScreen" }}>
                <P className='text-sm text-center text-white' style={{fontFamily: "Inter_500Medium"}}>Already a member? Login</P>
              </Link>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
