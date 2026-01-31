import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EventScreen from "./src/screens/EventScreen";
import CantineMenuScreen from "./src/screens/CantineMenuScreen";
import VirtualCardScreen from "./src/screens/VirtualCardScreen";
import MoreScreen from "./src/screens/MoreScreen";
import { colors } from "./src/theme";
import BottomNav from "./src/components/BottomNav";
import { HomeStackParamList, RootTabParamList } from "./src/navigation/types";

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    card: colors.surface,
    text: colors.text
  }
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: { backgroundColor: colors.surface },
        headerTitleStyle: { fontWeight: "700" }
      }}
    >
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen name="Event" component={EventScreen} options={{ title: "Event" }} />
      <HomeStack.Screen
        name="CantineMenu"
        component={CantineMenuScreen}
        options={{ title: "Cantine Menu" }}
      />
      <HomeStack.Screen
        name="VirtualCard"
        component={VirtualCardScreen}
        options={{ title: "Virtual Card" }}
      />
      <HomeStack.Screen name="More" component={MoreScreen} options={{ title: "More" }} />
    </HomeStack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer theme={navTheme}>
          <Tab.Navigator
            tabBar={(props) => <BottomNav {...props} />}
            screenOptions={{
              headerShown: false,
              headerShadowVisible: false,
              headerStyle: { backgroundColor: colors.surface },
              headerTitleStyle: { fontWeight: "700" }
            }}
          >
            <Tab.Screen
              name="Home"
              component={HomeStackNavigator}
              options={{ title: "Home" }}
            />
            <Tab.Screen
              name="Dashboard"
              component={DashboardScreen}
              options={{ title: "Dashboard" }}
            />
            <Tab.Screen name="History" component={HistoryScreen} options={{ title: "History" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: "Profile" }} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
