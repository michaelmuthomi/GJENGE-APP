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

export function CartPage () {
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
    </View>
  );
};

