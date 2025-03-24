
import React from "react";
import {Button, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet, Platform, View, Text, StatusBar} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraMode, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {useState, useRef } from 'react';
import { useRouter } from "expo-router";

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);
  const router = useRouter();


if (!permission) {
  // Camera permissions are still loading.
  return <View />;
}

if (!permission.granted) {
  // Camera permissions are not granted yet.
  return (
    <View style={styles.containerPermissao}>
      <Text style={styles.messagePermissao}>Precisamos da sua permissão para acessar a câmera</Text>
      <Button onPress={requestPermission} title="CONCEDER PERMISSÃO" />
    </View>
  );
}

/* --Será permetido apenas foto com a camera traseira
function virarCamera() {
  setFacing(current => (current === 'back' ? 'front' : 'back'));
}
*/

const tirarFoto = async () => {
    const photo = await ref.current?.takePictureAsync();
    console.log(photo?.uri);
}

function fecharCamera(){
  router.back();
}

return (
  <View style={styles.container}>
    <CameraView style={styles.camera} ref={ref} facing={facing} mode={'picture'} responsiveOrientationWhenOrientationLocked>

        <TouchableOpacity style={styles.fecharCamera} onPress={fecharCamera}>
          <ImageBackground 
            source={{ uri: "https://cdn-icons-png.flaticon.com/256/458/458595.png" }} 
            style={styles.x}
          ></ImageBackground>
        </TouchableOpacity>
      
        <TouchableOpacity style={styles.buttonCamera} onPress={tirarFoto}>
          <ImageBackground 
            // VENRDE source={{ uri: "https://i.imgur.com/hD6QEap.png" }} 
            source={{ uri: "https://i.imgur.com/qkSV6k6.png" }} 
            style={styles.cameraImgBotaoCaptura}
          ></ImageBackground>
        </TouchableOpacity>

          
      
    </CameraView>
  </View>
);
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
},
containerPermissao:{
  flex: 1,
  padding:60,
  justifyContent: 'center',
  alignContent: 'center'
},
messagePermissao: {
  textAlign: 'center',
  paddingBottom: 10,
  fontSize: 18
},
camera: {
  flex: 1,
},
fecharCamera: {
  position: "absolute", 
  left: 22,
  top:22,
  width:60,
  height:40,
},
x: {
  width:25,
  height:25,
},
buttonCamera: {
  position:"absolute",
  bottom: 30,
  left:"37%",
  height: 100,
  width: 100,
},
cameraImgBotaoCaptura: {
  height: 100,
  width: 100,
},
});