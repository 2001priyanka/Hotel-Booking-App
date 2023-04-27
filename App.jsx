import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {persistor, store} from './screen/Redux/Store';
import {PersistGate} from 'redux-persist/integration/react';
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
import Details from './screen/Details';
import RoomList from './screen/RoomList';
import EditProfile from './screen/EditProfile';
import DocumentList from './screen/DocumentList';
import PendingBills from './screen/PendingBills';
import BillsDetails from './screen/BillsDetails';





const Stack = createNativeStackNavigator();
const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="profile"
            screenOptions={{
              headerTitleAlign: 'center',
              headerShadowVisible: false,
              headerShown: false,
            }}>
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
            <Stack.Screen name="Details" component={Details} />
            <Stack.Screen name="RoomList" component={RoomList} />
            <Stack.Screen name="EditProfile" component={EditProfile} />
            <Stack.Screen name="DocumentList" component={DocumentList} />
            <Stack.Screen name="PendingBills" component={PendingBills} />
            <Stack.Screen name="BillsDetails" component={BillsDetails} />

          </Stack.Navigator>
          {/* <Footer/> */}
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}

export default App

const styles = StyleSheet.create({})