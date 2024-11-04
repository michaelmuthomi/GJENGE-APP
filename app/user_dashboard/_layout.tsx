import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Tabs } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  return (
    <GestureHandlerRootView style={styles.container}>
    <BottomSheetModalProvider>
    <Tabs screenOptions={{ tabBarActiveTintColor: '#66d46f', tabBarActiveBackgroundColor: "#212121",tabBarInactiveBackgroundColor: "#212121", tabBarStyle: { borderColor: "#222121" }}}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            focused ? (
              <MaterialCommunityIcons name="home-variant" color={color} size={size} />
            ) : (
              <MaterialCommunityIcons name="home-variant-outline" color={color} size={size} />
            )
          ),
          headerShown: false,
          tabBarLabelStyle: { fontFamily: 'Inter_400Regular', fontSize: 10 },
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size, focused }) => (
            focused ? (
              <MaterialCommunityIcons name="cart-variant" color={color} size={size} />
            ) : (
              <MaterialCommunityIcons name="cart-outline" color={color} size={size} />
            )
          ),
          headerShown: false,
          tabBarLabelStyle: { fontFamily: 'Inter_400Regular', fontSize: 10 },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            focused ? (
              <MaterialCommunityIcons name="account-settings" color={color} size={size} />
            ) : (
              <MaterialCommunityIcons name="account-settings-outline" color={color} size={size} />
            )
          ),
          headerShown: false,
          tabBarLabelStyle: { fontFamily: 'Inter_400Regular', fontSize: 10 },
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
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: "center",
  },
});