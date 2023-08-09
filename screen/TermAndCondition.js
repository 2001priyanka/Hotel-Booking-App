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
import {CheckBox} from 'react-native-elements';
import React, {useEffect, useState} from 'react';
import IconFa from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  responsiveHeight as vh,
  responsiveWidth as vw,
  responsiveFontSize as vf,
} from 'react-native-responsive-dimensions';
import {Dropdown} from 'react-native-element-dropdown';
// import {MimeTypeMap} from '../../MimeTypeMap';
import {MimeTypeMap} from '../MimeTypeMap';
import DocumentPicker from 'react-native-document-picker';
import {PermissionsAndroid} from 'react-native';
import * as RNFS from 'react-native-fs';
// import {API_URI, BASE_URL} from '../../config/Config';
import {API_URI, BASE_URL} from '../config/Config';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const TermAndCondition = ({route}) => {
  // const {data: roomId} = route?.params;
  // console.log('data', roomId.key);

  const navigation = useNavigation();

  const docType = route?.params;

  const [check1, setCheck1] = useState(false);
  const [feedbackData, setFeedbackData] = useState({
    message: '',
  });
  // userId = '6422b8e68d924ec8e15ea7e4';
  // console.log(, check1);
  const onpressRegister = () => {
    if (check1) {
      navigation.navigate('register');
    } else {
      Alert.alert(
        'Terms & Conditions',
        'Please Accept the terms and conditions to use the app',
      );
    }
  };
  // const submitHandler = async () => {
  //   console.log('submitHandler called');
  //   if (
  //     feedbackData.user_id != '' &&
  //     feedbackData.mobile != '' &&
  //     feedbackData.email != '' &&
  //     feedbackData.message
  //   ) {
  //     console.log('CALL API');

  //     try {
  //       const feedbackRes = await axios({
  //         url: API_URI + '/admin/feedback',
  //         method: 'POST',
  //         data: {
  //           ...feedbackData,
  //         },
  //       });

  //       if (feedbackRes) {
  //         console.log('feedbackRes ', feedbackRes?.data?.data?._id);
  //         // if (feedbackRes?.data?.success) {
  //         //   //   navigate("/roomImages");
  //         //   // uploadFilesToAPI(feedbackRes?.data?.data?._id);
  //         // }
  //       }
  //     } catch (error) {
  //       console.log('API error', error);
  //     }
  //   } else {
  //     window.alert('Required Fields Missing');
  //   }
  // };

  // console.log(imageUri);
  return (
    <View style={{height: vh(95)}}>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{fontSize: vf(3), color: '#000', fontWeight: '500'}}>
          Nikharstayz
        </Text>
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        <Text style={{fontSize: vf(3), color: '#000', fontWeight: '500'}}>
          Term and Conditions
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            // height: vh(100),
          }}>
          <Text
            style={{
              fontSize: vf(2),
              color: '#000',
              fontWeight: '300',
              padding: 20,
            }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
            congue velit facilisis sapien hendrerit dignissim. Pellentesque
            hendrerit nibh sed ligula dignissim, sed sagittis sem pellentesque.
            Aenean nunc arcu, elementum vitae venenatis nec, aliquam sed leo. In
            hac habitasse platea dictumst. Quisque dui nunc, auctor sit amet
            dapibus eget, sollicitudin non lectus. Vivamus porta quam lacus. Nam
            ac urna finibus dolor aliquam facilisis sed non libero. Integer
            feugiat faucibus ullamcorper. Pellentesque lorem arcu, sodales non
            fermentum in, accumsan et nisl. Nunc eu orci in dui ultricies
            rhoncus. Praesent vulputate euismod nunc, vitae imperdiet purus
            aliquam non. Cras nec orci sit amet nulla dapibus porta. Morbi
            sagittis laoreet ex. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Morbi porta non arcu ut
            venenatis. Ut eget aliquam libero, et laoreet felis. Vivamus
            pellentesque dictum quam, in porttitor metus ultricies quis. Proin
            id placerat lacus. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Vivamus consectetur tellus ultricies tortor auctor
            mattis. Suspendisse ullamcorper, eros quis bibendum rhoncus, massa
            eros auctor libero, et commodo dui dolor id nisl. Integer non sapien
            sagittis, tincidunt nunc quis, ultrices est. Proin sit amet rhoncus
            ligula, ornare maximus elit. Duis ac porttitor erat, porttitor
            mattis massa. Pellentesque elementum leo auctor tincidunt tincidunt.
            porttitor erat, porttitor mattis massa. Pellentesque elementum leo
            auctor tincidunt tincidunt. id nisl. Integer non sapien sagittis,
            tincidunt nunc quis, ultrices est. Proin sit amet rhoncus ligula,
            ornare maximus elit. Duis ac porttitor erat, porttitor mattis massa.
            Pellentesque elementum leo auctor tincidunt tincidunt. porttitor
            erat, porttitor mattis massa. Pellentesque elementum leo auctor
            tincidunt tincidunt. accumsan et nisl. Nunc eu orci in dui ultricies
            rhoncus. Praesent vulputate euismod nunc, vitae imperdiet purus
            aliquam non. Cras nec orci sit amet nulla dapibus porta. Morbi
            sagittis laoreet ex. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Morbi porta non arcu ut
            venenatis. Ut eget aliquam libero, et laoreet felis. Vivamus
            pellentesque dictum quam, in porttitor metus ultricies quis. Proin
            id placerat lacus. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Vivamus consectetur tellus ultricies tortor auctor
            mattis. Suspendisse ullamcorper, eros quis bibendum rhoncus, massa
            eros auctor libero, et commodo dui dolor id nisl. Integer non sapien
            sagittis, tincidunt nunc quis, ultrices est. Proin sit amet rhoncus
            ligula, ornare maximus elit. Duis ac porttitor erat, porttitor
            mattis massa. Pellentesque elementum leo auctor tincidunt tincidunt.
            porttitor erat, porttitor mattis massa. Pellentesque elementum leo
            auctor tincidunt tincidunt. id nisl. Integer non sapien sagittis,
            tincidunt nunc quis, ultrices est. Proin sit amet rhoncus ligula,
            ornare maximus elit. Duis ac porttitor erat, porttitor mattis massa.
            Pellentesque elementum leo auctor tincidunt tincidunt. porttitor
            erat, porttitor mattis massa. Pellentesque elementum leo auctor
            tincidunt tincidunt. Lorem ipsum dolor sit amet, consectetur
            adipiscing elit. Fusce congue velit facilisis sapien hendrerit
            dignissim. Pellentesque hendrerit nibh sed ligula dignissim, sed
            sagittis sem pellentesque. Aenean nunc arcu, elementum vitae
            venenatis nec, aliquam sed leo. In hac habitasse platea dictumst.
            Quisque dui nunc, auctor sit amet dapibus eget, sollicitudin non
            lectus. Vivamus porta quam lacus. Nam ac urna finibus dolor aliquam
            facilisis sed non libero. Integer feugiat faucibus ullamcorper.
            Pellentesque lorem arcu, sodales non fermentum in, accumsan et nisl.
            Nunc eu orci in dui ultricies rhoncus. Praesent vulputate euismod
            nunc, vitae imperdiet purus aliquam non. Cras nec orci sit amet
            nulla dapibus porta. Morbi sagittis laoreet ex. Class aptent taciti
            sociosqu ad litora torquent per conubia nostra, per inceptos
            himenaeos. Morbi porta non arcu ut venenatis. Ut eget aliquam
            libero, et laoreet felis. Vivamus pellentesque dictum quam, in
            porttitor metus ultricies quis. Proin id placerat lacus. Interdum et
            malesuada fames ac ante ipsum primis in faucibus. Vivamus
            consectetur tellus ultricies tortor auctor mattis. Suspendisse
            ullamcorper, eros quis bibendum rhoncus, massa eros auctor libero,
            et commodo dui dolor id nisl. Integer non sapien sagittis, tincidunt
            nunc quis, ultrices est. Proin sit amet rhoncus ligula, ornare
            maximus elit. Duis ac porttitor erat, porttitor mattis massa.
            Pellentesque elementum leo auctor tincidunt tincidunt. porttitor
            erat, porttitor mattis massa. Pellentesque elementum leo auctor
            tincidunt tincidunt. id nisl. Integer non sapien sagittis, tincidunt
            nunc quis, ultrices est. Proin sit amet rhoncus ligula, ornare
            maximus elit. Duis ac porttitor erat, porttitor mattis massa.
            Pellentesque elementum leo auctor tincidunt tincidunt. porttitor
            erat, porttitor mattis massa. Pellentesque elementum leo auctor
            tincidunt tincidunt. accumsan et nisl. Nunc eu orci in dui ultricies
            rhoncus. Praesent vulputate euismod nunc, vitae imperdiet purus
            aliquam non. Cras nec orci sit amet nulla dapibus porta. Morbi
            sagittis laoreet ex. Class aptent taciti sociosqu ad litora torquent
            per conubia nostra, per inceptos himenaeos. Morbi porta non arcu ut
            venenatis. Ut eget aliquam libero, et laoreet felis. Vivamus
            pellentesque dictum quam, in porttitor metus ultricies quis. Proin
            id placerat lacus. Interdum et malesuada fames ac ante ipsum primis
            in faucibus. Vivamus consectetur tellus ultricies tortor auctor
          </Text>
        </View>
      </ScrollView>
      <CheckBox
        center
        title="I Agree"
        checked={check1}
        onPress={() => setCheck1(!check1)}
      />
      <TouchableOpacity onPress={onpressRegister}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: '#0A82D5',
            width: vw(30),
            height: vh(5),
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <Text style={{fontSize: vf(2.2), color: '#fff'}}>Confirm</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TermAndCondition;

const styles = StyleSheet.create({
  dropdown: {
    margin: vw(4),
    height: vh(8),
    borderBottomColor: '#234459',
    borderBottomWidth: 0.5,
    width: vw(70),
    backgroundColor: '#234459',
    paddingHorizontal: vw(5),
    borderRadius: vw(2),
    // color:'#fff'
  },
  icon: {
    marginRight: 10,
    color: '#fff',
  },
  placeholderStyle: {
    fontSize: vf(2),
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  iconStyle: {
    width: vw(5),
    height: vh(3),
    // color:'#fff'
  },
  inputSearchStyle: {
    height: vh(5),
    fontSize: vf(2),
  },
  title: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textArea: {
    // height: 100,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    textAlignVertical: 'top',
    borderColor: '#A09C9C',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#204D6C',
    width: vw(15),
    height: vh(5),
    borderRadius: 10,
  },
});
