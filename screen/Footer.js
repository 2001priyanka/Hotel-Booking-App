import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
// import {CheckBox, Icon, SearchBar} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFa1 from 'react-native-vector-icons/Ionicons';
import IconFa2 from 'react-native-vector-icons/MaterialIcons';
import IconFa3 from 'react-native-vector-icons/FontAwesome';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
const Footer = () => {
  const navigation = useNavigation();
  const onNextPressed = () => {
    navigation.navigate('profile');
  };
  const onNextPressed1 = () => {
    navigation.navigate('dashboard');
  };
  const onNextPressed2 = () => {
    navigation.navigate('PendingBills');
  };
  const onNextPressed3 = () => {
    navigation.navigate('Request');
  };
  const onNextPressed4 = () => {
    navigation.navigate('WishList');
  };
  return (
    <View
      style={{
        // flex: 1,
        height: vh(8),
        borderWidth: 0,
        // height: 60,
        width: vw(100),
        backgroundColor: 'white',
        // backgroundColor: 'lightgray',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignSelf: 'center',
          //   backgroundColor: '#465790',
          width: vw(100),
          height: vh(10),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={onNextPressed1}
          style={{alignItems: 'center'}}>
          <IconFa name="home-city-outline" style={{color: 'black'}} size={25} />
          
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNextPressed2}
          style={{alignItems: 'center'}}>
          <IconFa3 name="rupee" style={{color: 'black'}} size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNextPressed}
          style={{alignItems: 'center'}}>
          <IconFa name="heart-outline" style={{color: 'black'}} size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNextPressed3}
          style={{alignItems: 'center'}}>
          <IconFa1 name="warning-outline" style={{color: 'black'}} size={25} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={onNextPressed}
          style={{alignItems: 'center'}}>
          <IconFa name="account-outline" style={{color: 'black'}} size={25} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Footer;
