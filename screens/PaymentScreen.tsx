import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View, Dimensions, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { useRoute } from '@react-navigation/native';
import { RootStackParams } from '../navigation/StackNavigator';
import { StackScreenProps } from '@react-navigation/stack';
import { styles } from '../navigation/CustomDrawerNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import foodMonksApi from '../api/foodMonksApi';
import { API_URL } from '@env';
import { obtenerUri } from '../services/actions';
import * as Animatable from 'react-native-animatable';

const {width,height} = Dimensions.get('screen');
interface Props extends StackScreenProps<RootStackParams, 'PaymentScreen'>{};

export default function PaymentScreen({ route, navigation }: Props) {

    const monto = route.params.amt;
    const [uri, setUri]:any = useState()
    const [token, setToken] = useState('')
    
   
  
    useEffect(() =>{
      obtenerUri(monto,setUri )
     
      
  }, [] )


  const stateChng = (navState : any) => {
    //console.log(navState);
   const { url, title, loading } = navState ;
   if(title == "PayPal Checkout" && loading == true && url.includes("token")){
      console.log("url",url);
      let spliturl = url.split('?');
      // console.log("spliturl",spliturl);
      let splitotherhalf = spliturl[1].split('&');
      console.log("splitotherhalf",splitotherhalf);
      let token = splitotherhalf[0].replace("token=","");
      let PayerID = splitotherhalf[1].replace("PayerID=","");
      navigation.replace('HomeDrawer')
       console.log("token", token);
       console.log("PayerID", PayerID);
   }
  }

  return uri ? (

     <WebView 
     startInLoadingState={true}
     onNavigationStateChange={stateChng}
     renderLoading={() => <Loading />}
     source={{ uri :uri}}
     originWhitelist={['*']}
    />    
 ): <Loading />
}

const Loading = () => {
  return(
    <View style={{height:height,width:width,justifyContent:'center',alignItems:'center'}}>
        <Animatable.Image
            animation="pulse"
            easing="ease-out"
            iterationCount="infinite"
            style={{
              width: '70%',
              height: 250,
              padding: 10,
              resizeMode: 'contain'
            }}
            source={require('../images/paypal.png')}
          />
    </View>
  )
}