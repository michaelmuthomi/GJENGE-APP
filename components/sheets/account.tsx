import { BottomSheetView } from "@gorhom/bottom-sheet";
import { P } from "../ui/typography";
import { useRef } from "react";
import { H4 } from "../ui/typography";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import * as React from "react";
import { useCallback } from "react";
import { View } from "react-native";

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
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}