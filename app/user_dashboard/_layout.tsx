import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <BottomSheetModalProvider>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#66d46f",
            tabBarActiveBackgroundColor: "#000000fe",
            tabBarInactiveBackgroundColor: "#000000fe",
            tabBarStyle: { borderWidth: 0, borderColor: "#474747" },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <MaterialCommunityIcons
                    name="home-variant"
                    color={color}
                    size={28}
                  />
                ) : (
                  <MaterialCommunityIcons
                    name="home-variant-outline"
                    color={color}
                    size={28}
                  />
                ),
              headerShown: false,
              tabBarLabelStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 10,
              },
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: "Cart",
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <MaterialCommunityIcons name="cart" color={color} size={28} />
                ) : (
                  <MaterialCommunityIcons
                    name="cart-outline"
                    color={color}
                    size={28}
                  />
                ),
              headerShown: false,
              tabBarLabelStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 10,
              },
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: "Settings",
              tabBarShowLabel: false,
              tabBarIcon: ({ color, size, focused }) =>
                focused ? (
                  <Icon name="cog" color={color} size={28} />
                ) : (
                  <Icon name="cog-outline" color={color} size={28} />
                ),
              headerShown: false,
              tabBarLabelStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 10,
              },
            }}
          />
          <Tabs.Screen
            name="products/[id]"
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              href: null,
              tabBarLabelStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 10,
              },
            }}
          />
          <Tabs.Screen
            name="checkout"
            options={{
              tabBarShowLabel: false,
              headerShown: false,
              href: null,
              tabBarLabelStyle: {
                fontFamily: "Inter_400Regular",
                fontSize: 10,
              },
            }}
          />
        </Tabs>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});