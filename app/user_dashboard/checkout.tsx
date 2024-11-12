import React from "react";
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
import { Skeleton } from "~/components/ui/skeleton";

const Checkout = () => {
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
        <H4 style={{ fontFamily: "Inter_600SemiBold" }}>Checkout</H4>
      </View>
    </View>
  );
};

export default Checkout;
