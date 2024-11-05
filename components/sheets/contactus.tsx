import { BottomSheetView } from "@gorhom/bottom-sheet";
import { P } from "../ui/typography";
import { useRef } from "react";
import { H4 } from "../ui/typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback } from "react";
import { ActivityIndicator, Linking, View } from "react-native";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { showMessage } from "react-native-flash-message";

export function ContactUs({ sheetTrigger }: { sheetTrigger: React.ReactNode }) {
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const inputRef = useRef<Textarea>(null);
  const [loading, setLoading] = React.useState(false);

  async function handleContactUs() {
    if (email && message) {
      showMessage({
        message: "We will get back to you soon",
        type: "success",
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

  return (
    <>
      {React.cloneElement(sheetTrigger as React.ReactElement, {
        onPress: handlePresentModalPress,
      })}
      <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
        <BottomSheetView className="p-6 gap-6">
          <View>
            <H4 className="" style={{ fontFamily: "Inter_700Bold" }}>
              Hey, were ready to hear from you.
            </H4>
            <P>
              Please fill in the form and we will get back to you as soon as
              possible
            </P>
          </View>
          <View className="gap-4">
            <View className="gap-1">
              <P className="">Email</P>
              <Input
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                // className="bg-[#212121] border-0 !h-14 color-white"
                style={{ fontFamily: "Inter_500Medium" }}
              />
            </View>
            <View className="gap-1">
              <P className="">Message</P>
              <Textarea
                ref={inputRef}
                placeholder="What's you query"
                value={message}
                onChangeText={setMessage}
                aria-labelledby="textareaLabel"
                style={{ fontFamily: "Inter_500Medium" }}
              />
            </View>
            <Button
              size={"lg"}
              variant={"default"}
              className="bg-[#66d46f] text-white rounded-full h-10"
              onPress={async () => {
                setLoading(true);
                await handleContactUs();
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
                    Submit message
                  </P>
                </View>
              ) : (
                <P
                  className="text-base"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  Submit message
                </P>
              )}
            </Button>
            <Button className="bg-transparent" onPress={() => (
              Linking.openURL('mailto:sales@gjenge.co.ke?subject=RE:ENQUIRY').catch(error => {
                  console.log(error);
              })
            )}>
              <P className="uppercase" style={{fontFamily: "Inter_500Medium"}}>Email Us directly</P>
            </Button>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}