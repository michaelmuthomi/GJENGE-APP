import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert , Image, ActivityIndicator} from 'react-native';
import { NavigationProp } from '@react-navigation/native'; // Import NavigationProp
import {Input} from "~/components/ui/input"
import { H1, P } from '~/components/ui/typography';
import {Button} from "~/components/ui/button"
import GjengeLogo from "~/assets/images/gjenge-logo.png"
import { Link, router } from 'expo-router';
import {supabase, checkUser, validateUserCredentials} from "~/lib/supabase"
import { showMessage } from "react-native-flash-message";
import { useEmail } from '~/app/EmailContext';

type Props = {
  navigation: NavigationProp<any>; // Define the type for navigation
};

export default function LoginScreen({}) {
    const emailContext = useEmail(); // Get the context
    const { setEmail: setEmailContext } = emailContext || { setEmail: () => {} }; // Provide a fallback
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
      if (email && password) {
        const UserAvailable = await checkUser(email);
        if (!UserAvailable) {
          showMessage({
            message: "User does not exist",
            type: "danger",
            style: {
              paddingTop: 40,
            },
            titleStyle: {
              fontFamily: "Inter_500Medium",
              textAlign: "center",
            },
          });
          return;
        }
        const isValid = await validateUserCredentials(email, password);
        if (isValid["role"]) {
          const user_role = isValid["role"];
          console.log(isValid["role"]);
          if (user_role === "Customer") {
            router.push({
              pathname: "/user_dashboard",
              params: { email: email },
            });
          } else if (user_role === "Finance Manager") {
            router.push({
              pathname: "../finance_manager_dashboard",
              params: { email: email },
            });
          } else if (user_role === "Dispatch Manager") {
            router.push({
              pathname: "../dispatch_manager_dashboard",
              params: { email: email },
            });
          }

          setEmailContext(email); // Set email in context
          return;
        }
        showMessage({
          message: "Invalid Email or Password",
          type: "danger",
          style: {
            paddingTop: 40,
          },
          titleStyle: {
            fontFamily: "Inter_500Medium",
            textAlign: "center",
          },
        });
      } else {
        showMessage({
          message: "Please fill in all the fields",
          type: "danger",
          style: {
            paddingTop: 40,
          },
          titleStyle: {
            fontFamily: "Inter_500Medium",
            textAlign: "center",
          },
        });
      }
    };

  return (
    <View className="flex-1 justify-end gap-6 p-6 bg-[#101010]">
      <View className="mt-auto mb-auto">
        <Image
          source={GjengeLogo}
          alt=""
          style={{ width: 60, height: 60, marginHorizontal: "auto" }}
        />
        <H1 className="text-white leading-loose text-center">
          Let's get started
        </H1>
      </View>
      <View className="gap-2">
        <View className="gap-4">
          <View className="gap-1">
            <P className="text-white">Email</P>
            <Input
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              className="bg-[#212121] border-0 !h-14 color-white"
              style={{ fontFamily: "Inter_500Medium" }}
            />
          </View>
          <View className="gap-2">
            <P className="text-white">Password</P>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              className="bg-[#212121] border-0 !h-14 color-white"
              style={{ fontFamily: "Inter_500Medium" }}
            />
          </View>
        </View>
      </View>
      <View className="py-6 gap-4">
        <Button
          size={"lg"}
          variant={"default"}
          className="bg-[#66d46f] text-white rounded-full h-10"
          onPress={async () => {
            setLoading(true);
            await handleLogin();
            setLoading(false);
          }}
        >
          {loading ? (
            <View className="flex flex-row gap-2">
            <ActivityIndicator animating={true} color="black" />
            <P className="text-base" style={{ fontFamily: "Inter_700Bold" }}>
              Login and continue
            </P>
            </View>
          ) : (
            <P className="text-base" style={{ fontFamily: "Inter_700Bold" }}>
              Login and continue
            </P>
          )}
        </Button>
        <Link
          href={{ pathname: "/screens/SignupScreen" }}
          className="w-full text-center"
        >
          <P
            className="text-base text-center text-white"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            Create an account
          </P>
        </Link>
      </View>
    </View>
  );
}
