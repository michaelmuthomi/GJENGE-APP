import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { H2, H3, H4 } from "~/components/ui/typography";
import { Separator } from "~/components/ui/separator";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const SettingsPage = () => {
  return (
    <View className=" bg-[#060606] flex-1 pt-14 px-6 gap-10">
      <View className="flex justify-center">
        <H4
          className="capitalize color-white"
          style={{ fontFamily: "Inter_600SemiBold" }}
        >
          Settings
        </H4>
      </View>
      <ScrollView>
        <View className="flex-1">
          <Link
            href={{ pathname: "/screens/LoginScreen" }}
            className="w-full color-[#dbdbdb] !gap-8 !items-center !justify-center"
          >
            <H4
              className="capitalize color-white"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Account info &rarr;
            </H4>
          </Link>
          <Separator className="my-6 bg-muted-foreground" />
          <Link
            href={{ pathname: "/screens/LoginScreen" }}
            className="w-full color-[#dbdbdb] !gap-8 !items-center !justify-center"
          >
            <H4
              className="capitalize color-white"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Orders &rarr;
            </H4>
          </Link>
          <Separator className="my-6 bg-muted-foreground" />
          <Link
            href={{ pathname: "/screens/LoginScreen" }}
            className="w-full color-[#dbdbdb] !gap-8 !items-center !justify-center"
          >
            <H4
              className="capitalize color-white"
              style={{ fontFamily: "Inter_400Regular" }}
            >
              Contact Us &rarr;
            </H4>
          </Link>
          <Separator className="my-6 bg-muted-foreground" />
          <Link
            href={{ pathname: "/screens/LoginScreen" }}
            className="w-full color-white !gap-8 !items-center !justify-center"
          >
            <H4
              className="color-white"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              About us &rarr;
            </H4>
          </Link>
          <Separator className="my-6 bg-muted-foreground" />
          <Link
            href={{ pathname: "/screens/LoginScreen" }}
            className="w-full color-white !gap-8 !items-center !justify-center"
          >
            <H4
              className="color-white"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Send us Feedback &rarr;
            </H4>
          </Link>
          <Separator className="my-6 bg-muted-foreground" />
          <Link
            href={{ pathname:  "/screens/LoginScreen" }}
            className="w-full color-white"
          >
            <H4
              className="color-white"
              style={{ fontFamily: "Inter_500Medium" }}
            >
              Logout &rarr;
            </H4>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsPage;
