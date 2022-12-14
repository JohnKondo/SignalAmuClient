
import {LogBox} from "react-native";  LogBox.ignoreLogs([ "exported from 'deprecated-react-native-prop-types'.", ])

import { createStackNavigator } from "@react-navigation/stack";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";

import * as Font from "expo-font";
import React, {useCallback, useEffect, useState} from "react";

import * as SplashScreen from 'expo-splash-screen';
import 'react-native-gesture-handler';


import Splash from "./screens/SplashScreen";
import AuthStack from "./navigation/AuthStack";

const Stack = createStackNavigator();



const getFonts = () =>
  Font.loadAsync({
      "Roboto-Black": require("./assets/fonts/Roboto/Roboto-Black.ttf"),
      "Roboto-BlackItalic": require("./assets/fonts/Roboto/Roboto-BlackItalic.ttf"),
      "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
      "Roboto-BoldItalic": require("./assets/fonts/Roboto/Roboto-BoldItalic.ttf"),
      "Roboto-Italic": require("./assets/fonts/Roboto/Roboto-Italic.ttf"),
      "Roboto-Light": require("./assets/fonts/Roboto/Roboto-Light.ttf"),
      "Roboto-LightItalic": require("./assets/fonts/Roboto/Roboto-LightItalic.ttf"),
      "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
      "Roboto-MediumItalic": require("./assets/fonts/Roboto/Roboto-MediumItalic.ttf"),
      "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
      "Roboto-Thin": require("./assets/fonts/Roboto/Roboto-Thin.ttf"),
      "Roboto-ThinItalic": require("./assets/fonts/Roboto/Roboto-ThinItalic.ttf"),
      "Outfit-Light": require("./assets/fonts/Outfit/Outfit-Light.ttf"),
      "Outfit-Bold": require("./assets/fonts/Outfit/Outfit-Bold.ttf"),
      "Outfit-Medium": require("./assets/fonts/Outfit/Outfit-Medium.ttf"),
  });

const LightTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'rgb(0,0,0)',
        background:'#FFFFFF'
    },
};

const DarkTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#FFFFFF',
        background:'rgb(0,0,0)'
    },
};

export default function App() {
    let [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await getFonts();
            } catch (e) {
                console.warn(e);
            } finally{
                setAppIsReady(true);
                await SplashScreen.hideAsync(); //work around splash screen doesn't leave after loading
            }
        }
        prepare();
    },[]);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady){
        return null;
    }
    return (
        <NavigationContainer theme={LightTheme}>
            <Stack.Navigator initialRouteName="SplashScreen" onLayout={onLayoutRootView} >
                <Stack.Screen
                    name="SplashScreen"
                    component={Splash}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Auth"
                    component={AuthStack}
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
