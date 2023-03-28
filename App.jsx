import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screen/Home';
import Login from './screen/user/Login';
import Register from './screen/user/Register';
import UserPage from './screen/user/UserPage';
import Dashboard from './screen/Dashboard';
import EstateType from './screen/EstateType';
import EstateAgent from './screen/EstateAgent';
import Profile from './screen/Profile';
import SearchEstate from './screen/SearchEstate';
import FeatureEstate from './screen/FeatureEstate';
import DocumentUpload from './screen/uploadDocument/DocumentUpload';





const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
      initialRouteName="search"
      screenOptions={{
        headerTitleAlign: 'center',
        headerShadowVisible: false,
       headerShown:false
       
      }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="user" component={UserPage} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="dashboard" component={Dashboard} />
        <Stack.Screen name="type" component={EstateType} />
        <Stack.Screen name="agent" component={EstateAgent} />
        <Stack.Screen name="profile" component={Profile} />
        <Stack.Screen name="search" component={SearchEstate} />
        <Stack.Screen name="feature" component={FeatureEstate} />
        <Stack.Screen name="document" component={DocumentUpload} />
      </Stack.Navigator>
      {/* <Footer/> */}
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})