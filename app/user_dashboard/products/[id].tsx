import * as React from "react";
import { View, Image, ScrollView, ActivityIndicator, Text } from "react-native";
import { H1, H2, H4, P, Muted, H3 } from "~/components/ui/typography";
import { useLocalSearchParams } from "expo-router";
import { Products } from "~/data/productsData";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Button } from "~/components/ui/button";

export default function ProductDetails() {
  const navigation = useNavigation(); // Initialize navigation
  const { id } = useLocalSearchParams(); // Retrieve the query parameter directly

  const [quantity, setQuantity] = React.useState(1); // State to manage quantity
  const [loading, setLoading] = React.useState(false);

  const increment = () => setQuantity((prev) => prev + 1); // Increment quantity
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Decrement quantity

  const addToCart = () => {
    // Logic to add the product to the cart with the selected quantity
    console.log(`Added ${quantity} of ${product["title"]} to cart`);
  };

  React.useEffect(() => {
    navigation.setOptions({ tabBarStyle: { display: "none" } }); // Hide bottom tabs
    return () => {
      navigation.setOptions({ tabBarStyle: { display: "flex" } }); // Show bottom tabs on unmount
    };
  }, [navigation]);

  // If `id` is undefined initially, add a check to ensure `id` is defined before proceeding
  if (!id || typeof id !== "string") {
    return <Text>Loading...</Text>; // Shows loading if the ID is not yet available
  }

  const product = Products.find((product) => product.id === Number(id)); // Convert id to number for comparison

  if (!product) {
    return <Text>Product not found</Text>; // Handle case where product is not found
  }

  // Helper function to format price as currency
  const formatPrice = (price:any) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KSH',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <View className="bg-[#060606] flex-1">
      <ScrollView>
        <Image
          source={product["imageSrc"]}
          style={{
            width: "100%",
            height: 400,
            resizeMode: "contain",
            backgroundColor: "#111111",
          }}
        />
        <View className=" bg-[#060606] flex-1 pt-4 px-4 gap-6">
          <View className="">
            <P
              className=" color-white uppercase"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              {product["title"]}
            </P>
            <H3 className="color-white" style={{fontFamily: "Inter_200ExtraLight"}}>{product["details"]}</H3>
          </View>
            <View className="flex-row justify-between">
              <H4
                className="color-white uppercase justify-between"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                {formatPrice(product["price"] * quantity)}
              </H4>
              <P
                className="color-white P-sm"
                style={{ fontFamily: "Inter_300Light" }}
              >
                {formatPrice(product["price"])} per sqrm
              </P>
            </View>
          <View className="gap-4">
            <View>
              {product["additionalInfo"]?.map((info) => (
                <Muted>{info}</Muted>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="flex-row justify-around items-center mt-4 sticky bottom-0 w-full bg-[#060606] py-4 border-t-[1px] border-[#333333]">
        <View className="flex-row items-center">
          <Button
            size={"lg"}
            variant={"default"}
            className="bg-[#111111] text-white rounded-full h-10"
            onPress={async () => {
              setLoading(true);
              await increment();
              setLoading(false);
            }}
          >
            {loading ? (
              <View className="flex flex-row gap-2">
                <ActivityIndicator animating={true} color="black" />
                <P
                  className="text-base text-white"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  +
                </P>
              </View>
            ) : (
              <P
                className="text-base text-white"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                +
              </P>
            )}
          </Button>
          <P className="mx-2 color-white">{quantity}</P>
          <Button
            size={"lg"}
            variant={"default"}
            className="bg-[#111111] text-white rounded-full h-10"
            onPress={async () => {
              setLoading(true);
              await decrement();
              setLoading(false);
            }}
          >
            {loading ? (
              <View className="flex flex-row gap-2">
                <ActivityIndicator animating={true} color="black" />
                <P
                  className="text-base text-white"
                  style={{ fontFamily: "Inter_700Bold" }}
                >
                  -
                </P>
              </View>
            ) : (
              <P
                className="text-base text-white"
                style={{ fontFamily: "Inter_700Bold" }}
              >
                -
              </P>
            )}
          </Button>
        </View>
        <Button
          size={"lg"}
          variant={"default"}
          className="bg-[#66d46f] text-white rounded-full h-10"
          onPress={async () => {
            setLoading(true);
            await addToCart();
            setLoading(false);
          }}
        >
          {loading ? (
            <View className="flex flex-row gap-2">
              <ActivityIndicator animating={true} color="black" />
              <P className="text-base" style={{ fontFamily: "Inter_700Bold" }}>
              Add to Cart
              </P>
            </View>
          ) : (
            <P className="text-base" style={{ fontFamily: "Inter_700Bold" }}>
              Add to Cart
            </P>
          )}
        </Button>
      </View>
    </View>
  );
}
