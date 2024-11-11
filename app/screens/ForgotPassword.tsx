import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { NavigationProp } from "@react-navigation/native"; // Import NavigationProp
import { Input } from "~/components/ui/input";
import { H1, P } from "~/components/ui/typography";
import { Button } from "~/components/ui/button";
import GjengeLogo from "~/assets/images/gjenge-logo.png";
import { Link, router } from "expo-router";
import { supabase, checkUser, validateUserCredentials } from "~/lib/supabase";
import { showMessage } from "react-native-flash-message";
import { useEmail } from "~/app/EmailContext";

type Props = {
  navigation: NavigationProp<any>; // Define the type for navigation
};

export default function ForgotPassword({}) {
  // router.push({
  //   pathname: "/user_dashboard",
  //   params: { email: email },
  // });
  const emailContext = useEmail(); // Get the context
  const { setEmail: setEmailContext } = emailContext || { setEmail: () => {} }; // Provide a fallback
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordRest = async () => {
    if (email && password && newPassword) {
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
      if (isValid["email"]) {
          const response = await resetUserPassword(email, newPassword)
          if (typeof response === "string" && response.startsWith("Error:")) {
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
              return;
          } else {
              showMessage({
                message: "Password reset successfully",
                type: "success",
                style: {
                  paddingTop: 40,
                },
                titleStyle: {
                  fontFamily: "Inter_500Medium",
                  textAlign: "center",
                },
              });
              router.push({
                pathname: "/screens/LoginScreen",
              });
          }
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
    <View className="flex-1 justify-end gap-6 p-4 bg-[#101010]">
      <View className="mt-auto mb-auto">
        <Image
          source={GjengeLogo}
          alt=""
          style={{ width: 60, height: 60, marginHorizontal: "auto" }}
        />
        <H1 className="text-white text-center text-xl">
          Forgot your password?
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
            <P className="text-white">New Password</P>
            <Input
              placeholder="Password"
              value={newPassword}
              onChangeText={setNewPassword}
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
          className="bg-[#66d46f] text-black rounded-full h-10"
          onPress={async () => {
            setLoading(true);
            await handlePasswordRest();
            setLoading(false);
          }}
        >
          {loading ? (
            <View className="flex flex-row gap-2">
              <ActivityIndicator animating={true} color="black" />
              <P
                className="text-base text-black"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                Confirm and reset
              </P>
            </View>
          ) : (
            <P
              className="text-base text-black"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              Confirm and reset
            </P>
          )}
        </Button>
        <Link
          href={{ pathname: "/screens/SignupScreen" }}
          className="w-full text-center"
        >
          <P
            className="text-base text-center text-zinc-400"
            style={{ fontFamily: "Inter_500Medium" }}
          >
            Create an account &rarr;
          </P>
        </Link>
      </View>
    </View>
  );
}
