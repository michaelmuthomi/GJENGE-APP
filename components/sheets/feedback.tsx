import { BottomSheetView } from "@gorhom/bottom-sheet";
import { P } from "../ui/typography";
import { useRef } from "react";
import { H4 } from "../ui/typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Label } from "../ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Button } from "../ui/button";
import { showMessage } from "react-native-flash-message";
import ConfettiCannon from 'react-native-confetti-cannon';

export function Feedback({ sheetTrigger }: { sheetTrigger: React.ReactNode }) {
    const [loading, setLoading] = React.useState(false)
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const [value, setValue] = React.useState("Comfortable");
  const [message, setMessage] = React.useState("")

  const confettiRef = useRef<ConfettiCannon>(null);

  function onLabelPress(label: string) {
    return () => {
      setValue(label);
    };
  }
  function handleFeedBack(){
    console.log(value, message)
    if(value && message){
        showMessage({
            message: "Thanks for the feedback",
            type: "success",
            style: {
                paddingTop: 40,
            },
            titleStyle: {
                fontFamily: "Inter_500Medium",
                textAlign: "center",
            },
        });
        confettiRef.current?.start();
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

  const inputRef = useRef<Textarea>(null);

  return (
    <>
      {React.cloneElement(sheetTrigger as React.ReactElement, {
        onPress: handlePresentModalPress,
      })}
      <BottomSheetModal ref={bottomSheetModalRef} onChange={handleSheetChanges}>
        <BottomSheetView className="p-6 gap-6">
          <View>
            <H4 className="text-center" style={{ fontFamily: "Inter_700Bold" }}>
              How was your experience {"\n"} with the app?
            </H4>
            <P>
              State your experience interacting with the app and recommend
              improvements
            </P>
          </View>
          <View className="gap-4">
            <RadioGroup
              value={value}
              onValueChange={setValue}
              className="gap-3 flex-row"
            >
              <RadioGroupItemWithLabel
                value="Bad"
                onLabelPress={onLabelPress("Bad")}
              />
              <RadioGroupItemWithLabel
                value="Decent"
                onLabelPress={onLabelPress("Decent")}
              />
              <RadioGroupItemWithLabel
                value="Love it!"
                onLabelPress={onLabelPress("Love it!")}
              />
            </RadioGroup>
            <Textarea
              ref={inputRef}
              placeholder="Tell us more"
              value={message}
              onChangeText={setMessage}
              aria-labelledby="textareaLabel"
              style={{ fontFamily: "Inter_500Medium" }}
            />
            <Button
              size={"lg"}
              variant={"default"}
              className="bg-[#66d46f] text-white rounded-full h-10"
              onPress={async () => {
                setLoading(true);
                await handleFeedBack();
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
                    Submit feedback
                  </P>
                </View>
              ) : (
                <P
                  className="text-base"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  Submit feedback
                </P>
              )}
            </Button>
          </View>
            <ConfettiCannon ref={confettiRef} count={50} origin={{x: -14, y: 0}} autoStart={false} />
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  // Define emoji mapping
  const emojiMap: { [key: string]: string } = {
    Bad: "😞",
    Decent: "🙂",
    "Love it!": "😍",
  };
  return (
    <View
      className={
        "flex-row gap-2 flex-1 items-center bg-slate-100 border-[#ccc] border-['1px'] rounded-lg bg-[#f9f9f9] p-2"
      }
    >
      <RadioGroupItem
        value={value}
        aria-labelledby={`label-for-${value}`}
        style={{ display: "none" }}
      />
      <Label
        nativeID={`label-for-${value}`}
        onPress={onLabelPress}
        style={{
          fontFamily: "Inter_500Medium",
          textAlign: "center",
          fontSize: 16,
        }}
      >
        {emojiMap[value]} {value}
      </Label>
    </View>
  );
}
