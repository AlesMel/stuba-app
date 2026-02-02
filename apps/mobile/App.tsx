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
import { ThemeProvider, useTheme } from "./src/theme";
import BottomNav from "./src/components/BottomNav";
import { HomeStackParamList, RootTabParamList } from "./src/navigation/types";
import { LocalizationProvider, useTranslation } from "./src/localization";

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackNavigator() {
  const { t } = useTranslation();
  const { colors } = useTheme();

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
      <HomeStack.Screen
        name="Event"
        component={EventScreen}
        options={{ title: t("screenEventTitle") }}
      />
      <HomeStack.Screen
        name="CantineMenu"
        component={CantineMenuScreen}
        options={{ title: t("screenCantineTitle") }}
      />
      <HomeStack.Screen
        name="VirtualCard"
        component={VirtualCardScreen}
        options={{ title: t("screenVirtualCardTitle") }}
      />
      <HomeStack.Screen name="More" component={MoreScreen} options={{ title: t("screenMoreTitle") }} />
    </HomeStack.Navigator>
  );
}

function AppNavigation() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const navTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text
    }
  };

  return (
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
        <Tab.Screen name="Home" component={HomeStackNavigator} options={{ title: t("tabHome") }} />
        <Tab.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ title: t("tabDashboard") }}
        />
        <Tab.Screen name="History" component={HistoryScreen} options={{ title: t("tabHistory") }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: t("tabProfile") }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <ThemeProvider>
          <LocalizationProvider>
            <AppNavigation />
          </LocalizationProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
