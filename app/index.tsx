import * as React from 'react';
import { Image, View } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { H1, H2, H3, H4, P } from '~/components/ui/typography';
import { Link, router } from "expo-router";

export default function Screen() {
  return (
    <View className="relative bg-[#060606] flex-1">
      <Image
        source={require("~/assets/images/ceo.png")}
        alt=""
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
        }}
      />
      <View className="items-center p-4 py-6">
        <View className="flex-col w-full max-w-sm h-full gap-14 justify-end items-center">
          <View className="items-center gap-2">
            <Image
              source={require("~/assets/images/gjenge-logo.png")}
              alt=""
              style={{ width: 60, height: 60 }}
            />
            <H1
              className="text-white text-2xl tracking-tight text-center"
              style={{
                fontFamily: "Inter_700Bold",
                fontVariant: ["normal"],
                fontFeatureSettings: "cv02, cv03, cv04, cv11",
              }}
            >
              Build Sustainably{"\n"}Empower Communities
            </H1>
          </View>
          <View className="gap-4 w-full flex-row border-t">
            <Button
              size={"lg"}
              variant={"default"}
              className="bg-[#66d46f] text-white rounded-full h-10 flex-1"
              onPress={() => {
                router.push({
                  pathname: "/screens/SignupScreen",
                });
              }}
            >
              <P
                className="text-base text-black"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                Sign Up
              </P>
            </Button>
            <Button
              size={"lg"}
              className="text-white rounded-full h-10 bg-[#212121] flex-1"
              onPress={() => {
                router.push({
                  pathname: "/screens/LoginScreen",
                });
              }}
            >
              <P
                style={{ fontFamily: "Inter_500Medium" }}
                className="text-sm text-center text-white"
              >
                Login
              </P>
            </Button>
          </View>
        </View>
      </View>
    </View>
  );
}
