import { BottomSheetView } from "@gorhom/bottom-sheet";
import { P } from "../ui/typography";
import { useEffect, useRef, useState } from "react";
import { H4 } from "../ui/typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import { Input } from "../ui/input";
import { Link, router } from "expo-router";
import { Button } from "../ui/button";
import { showMessage } from "react-native-flash-message";
import { checkUser, updateUserDetails } from "~/lib/supabase";
import { useEmail } from "~/app/EmailContext"; // Import the useEmail hook

export function Account({ sheetTrigger }: { sheetTrigger: React.ReactNode }) {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const { email, setEmail } = useEmail(); // Get email and setEmail from context
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const validateInputs = () => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    const phonePattern = /^[0-9]{10}$/;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      return "Please fill in all the fields";
    }
    if (!emailPattern.test(email)) {
      return "Please enter a valid email address";
    }
    if (!phonePattern.test(phoneNumber)) {
      return "Please enter a valid phone number (10 digits)";
    }
    return null; // All validations passed
  };
  // Function to fetch user details
  const fetchUserDetails = async () => {
    try {
      const logged_in_user_email: string = email;
      console.log("LoggedinUser:" + logged_in_user_email)
      const userDetails = await checkUser(logged_in_user_email);
      console.log("User details:" + userDetails["first_name"])
      if (userDetails) {
        setFirstName(userDetails["first_name"]);
        setLastName(userDetails["last_name"]);
        setEmail(userDetails["email"]); // Update context email if necessary
        setPhoneNumber(userDetails["phone_number"]);
        setPassword(userDetails["password_hash"]);
        // Password should not be set for security reasons
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Fetch user details on component mount
  useEffect(() => {
    fetchUserDetails();
  }, []);

  const handleUpdateAccountDetails = async () => {
    const validationError = validateInputs();
    if (validationError) {
      showMessage({
        message: validationError,
        type: "danger",
        style: {
          paddingTop: 40,
        },
        titleStyle: {
          fontFamily: "Inter_500Medium",
          textAlign: "center",
        },
      });
      return; // Exit if validation fails
    }
    if (firstName && lastName && email && phoneNumber) {
      const response = await updateUserDetails(
        firstName,
        lastName,
        email,
        password,
        Number(phoneNumber)
      );
      if (response.startsWith("Error:")) {
        showMessage({
          message: response,
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
          message: "Account updated successfully",
          type: "success",
          style: {
            paddingTop: 40,
          },
          titleStyle: {
            fontFamily: "Inter_500Medium",
            textAlign: "center",
          },
        });
        // Optionally fetch updated user details
        await fetchUserDetails();
      }
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
    <>
      {React.cloneElement(sheetTrigger as React.ReactElement, {
        onPress: handlePresentModalPress,
      })}
      <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
        <BottomSheetView className="p-6 gap-6">
          <ScrollView>
            <View>
              <H4 style={{ fontFamily: "Inter_700Bold" }}>
                Manage account info
              </H4>
            </View>
            <View className="gap-2">
              <View className="gap-4">
                <View className="grid gird-cols-2 gap-2">
                  <View className="gap-1">
                    <P>First Name</P>
                    <Input
                      placeholder="First Name"
                      value={firstName}
                      onChangeText={setFirstName}
                      style={{ fontFamily: "Inter_500Medium" }}
                    />
                  </View>
                  <View className="gap-1">
                    <P>Last Name</P>
                    <Input
                      placeholder="Last Name"
                      value={lastName}
                      onChangeText={setLastName}
                      style={{ fontFamily: "Inter_500Medium" }}
                    />
                  </View>
                </View>
                <View className="gap-1">
                  <P>Email</P>
                  <Input
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ fontFamily: "Inter_500Medium" }}
                  />
                </View>
                <View className="gap-1">
                  <P>Phone Number</P>
                  <Input
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                    style={{ fontFamily: "Inter_500Medium" }}
                  />
                </View>
                <View className="gap-1">
                  <P>Password</P>
                  <Input
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
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
                  await handleUpdateAccountDetails();
                  setLoading(false);
                }}
              >
                {loading ? (
                  <View className="flex flex-row gap-2">
                    <ActivityIndicator animating={true} color="black" />
                    <P
                      className="text-base"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      Update account details
                    </P>
                  </View>
                ) : (
                  <P
                    className="text-base"
                    style={{ fontFamily: "Inter_700Bold" }}
                  >
                    Update account details
                  </P>
                )}
              </Button>
            </View>
          </ScrollView>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}