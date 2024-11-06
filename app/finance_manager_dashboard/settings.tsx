import { Link } from "expo-router";
import React, { useCallback, useRef } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { H2, H3, H4, P } from "~/components/ui/typography";
import { Separator } from "~/components/ui/separator";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Feedback } from "~/components/sheets/feedback";
import { AboutUs } from "~/components/sheets/aboutus";
import { ContactUs } from "~/components/sheets/contactus";
import { Account } from "~/components/sheets/account";
import { Orders } from "~/components/sheets/orders";
import { showMessage } from "react-native-flash-message";

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
          <Account
            sheetTrigger={
              <H4
                className="capitalize color-white"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Account info &rarr;
              </H4>
            }
          />
          <Separator className="my-6 bg-muted-foreground" />
          <Orders
            sheetTrigger={
              <H4
                className="capitalize color-white"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Orders &rarr;
              </H4>
            }
          />
          <Separator className="my-6 bg-muted-foreground" />
          <ContactUs
            sheetTrigger={
              <H4
                className="capitalize color-white"
                style={{ fontFamily: "Inter_400Regular" }}
              >
                Contact Us &rarr;
              </H4>
            }
          />
          <Separator className="my-6 bg-muted-foreground" />
          <AboutUs
            sheetTrigger={
              <H4
                className="color-white"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                About us &rarr;
              </H4>
            }
          />
          <Separator className="my-6 bg-muted-foreground" />
          <Feedback
            sheetTrigger={
              <H4
                className="color-white"
                style={{ fontFamily: "Inter_500Medium" }}
              >
                Send us Feedback &rarr;
              </H4>
            }
          />
          <Separator className="my-6 bg-muted-foreground" />
          <Link
            href={{ pathname: "/screens/LoginScreen" }}
            className="w-full color-white"
            onPress={()=>{
              showMessage({
                message: "Succesfully logged out",
                type: "success",
                style: {
                  paddingTop: 40,
                },
                titleStyle: {
                  fontFamily: "Inter_500Medium",
                  textAlign: "center",
                },
              });
            }}
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "grey",
  },
  contentContainer: {
    padding: 36,
    alignItems: "center",
  },
});

export default SettingsPage;
