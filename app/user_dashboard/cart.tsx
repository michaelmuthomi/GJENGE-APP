import React from 'react';
import { View, Image, ScrollView } from "react-native";
import { H3, H4, P } from "~/components/ui/typography";
import {
  fetchProductsFromCart,
  fetchProductFromDB,
  removeProductFromCart,
} from "~/lib/supabase";
import { useEmail } from "~/app/EmailContext"; // Import the useEmail hook
import { formatPrice } from "~/helpers/formatPrice";
import { Button } from "~/components/ui/button";
import { ActivityIndicator } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Link } from "expo-router";

const CartPage = ({ refresh }: { refresh: boolean }) => {
  interface Product {
    product_id: number;
    imageSrc: string;
    title: string;
    price: number;
  }

  const clearCart = () => {
    setProducts([]);
    setQuantities({});
    console.log("Cart cleared");
  };

  const [products, setProducts] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(true);
  const emailContext = useEmail();
  const email = emailContext ? emailContext.email : "";
  const setEmail = emailContext ? emailContext.setEmail : () => {};
  const [quantities, setQuantities] = React.useState<{ [key: number]: number }>(
    {}
  );

  const fetchCartProducts = async () => {
    setLoading(true);
    const data = await fetchProductsFromCart(email);
    console.log("Fetch cart data", data);
    if (typeof data === "string") {
      console.error(data); // Handle error string
    } else {
      const productID = data.map((product) => product.product_id);
      const productQuantities = data.reduce((acc, product) => {
        acc[product.product_id] = product.quantity;
        return acc;
      }, {});
      setQuantities(productQuantities);
      const products = await Promise.all(
        productID.map((id) => fetchProductFromDB(id))
      );
      console.log("Fetch product data", products);
      setProducts(products);
    }
    setLoading(false);
  };

  async function handleCheckout() {
    const cartItems = Object.keys(quantities).map((productId) => ({
      product_id: productId,
      quantity: quantities[Number(productId)],
    }));
    console.log("Cart items", cartItems);
  }

  async function removeFromCart(productId: number) {
    const data = await removeProductFromCart(productId, email);
    showMessage({
      message: "Product removed from cart",
      type: "success",
      style: {
        paddingTop: 40,
      },
      titleStyle: {
        fontFamily: "Inter_500Medium",
        textAlign: "center",
      },
    });
    setQuantities({});
    fetchCartProducts();
  }

  React.useEffect(() => {
    if (refresh) {
      clearCart();
    }
    fetchCartProducts();
  }, [email, refresh]);

  const increment = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] + 1,
    }));
  };

  const decrement = (productId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: prev[productId] > 1 ? prev[productId] - 1 : 1,
    }));
  };

  return (
    <View className=" bg-[#060606] flex-1 pt-14 px-6 gap-10">
      <View className="flex justify-center">
        <H4
          className=" color-white"
          style={{ fontFamily: "Inter_600SemiBold" }}
        >
          Products in Cart
        </H4>
      </View>
      <ScrollView>
        <View className="gap-4 flex-1">
          {loading ? (
            <View>
              <P>Loading...</P>
            </View>
          ) : products.length === 0 ? (
            <View>
              <P className="color-white">No products in the cart</P>
            </View>
          ) : Array.isArray(products) ? (
            products.map((product) => (
              <Link
                key={product.product_id}
                className={`flex-1 w-['100%'] gap-4`}
                href={`/user_dashboard/products/${product["product_id"]}`}
              >
                <View className="flex-row items-center gap-4">
                  <Image
                    source={{ uri: product.imageSrc }}
                    alt=""
                    style={{
                      width: "45%",
                      height: 150,
                      objectFit: "contain",
                      backgroundColor: "#111111",
                      borderRadius: 10,
                    }}
                  />
                  <View className="gap-1">
                    <H4
                      className="color-white uppercase"
                      style={{ fontFamily: "Inter_600SemiBold" }}
                    >
                      {product.title}
                    </H4>
                    <H3 className="color-white text-sm uppercase">
                      {formatPrice(
                        product["price"] * quantities[product.product_id]
                      )}
                    </H3>
                  </View>
                </View>
                <View className="flex-row items-center relative">
                  <Button
                    size={"lg"}
                    variant={"default"}
                    className="bg-[#111111] text-white rounded-full h-10"
                    onPress={() => increment(product.product_id)}
                  >
                    <P
                      className="text-base text-white"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      +
                    </P>
                  </Button>
                  <P className="mx-2 color-white">
                    {quantities[product.product_id]}
                  </P>
                  <Button
                    size={"lg"}
                    variant={"default"}
                    className="bg-[#111111] text-white rounded-full h-10"
                    onPress={() => decrement(product.product_id)}
                  >
                    <P
                      className="text-base text-white"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      -
                    </P>
                  </Button>
                  <Button
                    size={"lg"}
                    variant={"default"}
                    className="bg-[#111111] text-white rounded-full h-10 absolute right-0"
                    onPress={() => removeFromCart(product.product_id)}
                  >
                    <P
                      className="text-base text-white"
                      style={{ fontFamily: "Inter_700Bold" }}
                    >
                      Remove
                    </P>
                  </Button>
                </View>
              </Link>
            ))
          ) : (
            <View>
              <P>{products}</P>
            </View>
          )}
        </View>
      </ScrollView>
      <View>
        {products.length > 0 && (
          <Button
            size={"lg"}
            variant={"default"}
            className={` text-white rounded-full h-10 bottom-4 ${
              loading ? "disabled bg-current" : "bg-[#66d46f]"
            }`}
            onPress={async () => {
              setLoading(true);
              await handleCheckout();
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
                  Proceed to Checkout
                </P>
              </View>
            ) : (
              <P className="text-base" style={{ fontFamily: "Inter_700Bold" }}>
                Proceed to Checkout
              </P>
            )}
          </Button>
        )}
      </View>
    </View>
  );
};

export default CartPage;
