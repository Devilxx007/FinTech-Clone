import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';

const CLERK_PUBLISHABLE_KEY = 'pk_test_am9pbnQtZG9ua2V5LTM5LmNsZXJrLmFjY291bnRzLmRldiQ';

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key, value) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return null;
    }
  }
};

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY} tokenCache={tokenCache}>
      <RootLayoutNav />
    </ClerkProvider>
  );
};

const RootLayoutNav = () => {
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();

  React.useEffect(() => {
    console.log("signed in",isSignedIn)
  }, []);

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="login"
        options={{
          title: "",
          headerShadowVisible:false,
          headerBackTitle:"",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={25} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="signup"
        options={{
          title: "",
          headerShadowVisible:false,
          headerBackTitle:"",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={25} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="help"
        options={{
          title: "",
          headerShadowVisible:false,
          headerBackTitle:"",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={25} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen
        name="verify/[phone]"
        options={{
          title: "",
          headerShadowVisible:false,
          headerBackTitle:"",
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name='arrow-back' size={25} />
            </TouchableOpacity>
          )
        }}
      />
      <Stack.Screen name="(tabs)" options={{
        headerShown:false,
      }}/>
    </Stack>
  );
};

export default RootLayout;
