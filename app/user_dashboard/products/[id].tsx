import * as React from "react";
import { View, Image, ScrollView, ActivityIndicator, Text } from "react-native";
import { H1, H2, H4, P, Muted, H3 } from "~/components/ui/typography";
import { useLocalSearchParams } from "expo-router";
import { Skeleton } from "~/components/ui/skeleton";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation
import { Button } from "~/components/ui/button";
import { showMessage } from "react-native-flash-message";
import { useEmail } from "~/app/EmailContext"; // Import the useEmail hook
import { fetchProductFromDB, insertProductsToCart } from "~/lib/supabase";

export default function ProductDetails() {
  const navigation = useNavigation(); // Initialize navigation
  const { id } = useLocalSearchParams();
  const { email, setEmail } = useEmail();

  const [quantity, setQuantity] = React.useState(1); // State to manage quantity
  const [loading, setLoading] = React.useState(false);
  interface Product {
    title: string;
    imageSrc: string;
    details: string;
    price: number;
    additionalInfo?: string[];
  }

  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    async function fetchProducts() {
      const response = await fetchProductFromDB(Number(id));
      console.log(response)
      if (typeof response === "string" && response.startsWith("Error:")) {
        console.error("Failed to fetch product:", response);
      } else {
        setProduct(response);
      }
    }
      fetchProducts();
    }, [id]);

  const increment = () => setQuantity((prev) => prev + 1); // Increment quantity
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1)); // Decrement quantity

  const addToCart = async () => {
    // Logic to add the product to the cart with the selected quantity
    if (product) {
      console.log(
        `Added ${quantity} of ${product["title"]} to cart, for ${email}`
      );
    }
    const response = await insertProductsToCart(Number(id), quantity, email);
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
        message: "Product added to cart",
        type: "success",
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
        {product && (
          <Image
            source={{ uri: product["imageSrc"] }}
            style={{
              width: "100%",
              height: 400,
              resizeMode: "contain",
              backgroundColor: "#111111",
            }}
          />
        )}
        {!product && (
          <View
            style={{ width: "100%", height: 400, backgroundColor: "#111111" }}
          >
            <Skeleton className="w-full h-[400px] rounded-[10px] bg-[#111111]" />
          </View>
        )}
        <View className=" bg-[#060606] flex-1 pt-4 px-4 gap-6">
          <View className="">
            <P
              className=" color-white uppercase"
              style={{ fontFamily: "Inter_600SemiBold" }}
            >
              {product && product["title"]}
            </P>
            <H3
              className="color-white"
              style={{ fontFamily: "Inter_200ExtraLight" }}
            >
              {product && product["details"]}
            </H3>
          </View>
          <View className="flex-row justify-between">
            <H4
              className="color-white uppercase justify-between"
              style={{ fontFamily: "Inter_700Bold" }}
            >
              {product && formatPrice(product["price"] * quantity)}
            </H4>
            <P
              className="color-white P-sm"
              style={{ fontFamily: "Inter_300Light" }}
            >
              {product && formatPrice(product["price"])} per sqrm
            </P>
          </View>
          <View className="gap-4">
            <View>
              {product &&
                product["additionalInfo"]?.map((info) => <Muted>{info}</Muted>)}
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
