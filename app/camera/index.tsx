
import React from "react";
import {Button, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet, Platform, View, Text, StatusBar} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { CameraMode, CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import {useState, useRef, useEffect } from 'react';
import { useRouter } from "expo-router";
import * as Location from 'expo-location';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [uri, setUri] = useState<string | null>(null);
  const ref = useRef<CameraView>(null);
  const router = useRouter();
  //const [localizacao, setLocalizacao] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [statusLocalizacao, setStatusLocalizacao] = useState('');

  type Foto = {
    uri: string;
    latitude: string;
    longitude: string
  };
  

  useEffect(() => {
    
    if ((permission && !permission.granted) || statusLocalizacao !== 'granted') {
      requestPermission();
      permissaoPegarLocalizacao();
    }

  }, [permission, Location]);

  const salvarFoto = async (caminho:string, latitude:string, longitude:string) => {
    const listaFotos = await descarregarGeoFotos();
    
    let captura: Foto = {
      uri: caminho,
      latitude: latitude,
      longitude: longitude
    };
    
    let ultimoIndex =  listaFotos.length;
    listaFotos[ultimoIndex] = captura;

    carregarGeoFotos(listaFotos);
  };

  const descarregarGeoFotos = async () => {
      const conteudoJson = await AsyncStorage.getItem("@geoFotos");
      return conteudoJson ? JSON.parse(conteudoJson) : [];
  };

  const carregarGeoFotos = async (listaFotos:string) => {
    await AsyncStorage.setItem("@geoFotos", JSON.stringify(listaFotos));
  };

  async function permissaoPegarLocalizacao() {
    if(statusLocalizacao !== 'granted'){
      let { status } = await Location.requestForegroundPermissionsAsync();
      setStatusLocalizacao(status);
    }
  }
  async function pegarLocalizacao() {
    let local = await Location.getLastKnownPositionAsync();
    return local;
  }

  async function salvarLocalDiretorioCache(uriFoto:string) {
    const caminhoDaPasta = await uriFoto.substring(0, uriFoto.lastIndexOf('/') + 1);
    await AsyncStorage.setItem("@localFotos", caminhoDaPasta);
    //console.log(caminhoDaPasta);
  }

  const tirarFoto = async () => {

    const photo = await ref.current?.takePictureAsync();

    let localizacao = await pegarLocalizacao();
    
    //console.log(localizacao);
    //console.log(photo?.uri);

    await salvarLocalDiretorioCache(photo?.uri || "")
    
    let separarBarra = photo?.uri.split("/");
    if(photo?.uri && separarBarra && localizacao)
    {
      salvarFoto(separarBarra[separarBarra.length - 1], localizacao?.coords.latitude.toString(), localizacao?.coords.longitude.toString());
    }
    
    //let valor = await descarregarGeoFotos()
    //const conteudoJson = await AsyncStorage.getItem("@geoFotos");
      //console.log(conteudoJson);
      
  }

  function fecharCamera(){
    router.back();
  }

  if ((permission && !permission.granted) || statusLocalizacao !== 'granted') {
    // Quando a permissão foi negada, retornará essa tela com uma msg indicando ao usuario para habilitar a permissao
    return (
    
      <View style={styles.containerPermissao}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" translucent={false} />
        <TouchableOpacity style={styles.fecharCamera} onPress={fecharCamera}>
          <ImageBackground 
            source={{ uri: "https://cdn-icons-png.flaticon.com/256/458/458595.png" }} 
            style={styles.x}
          ></ImageBackground>
        </TouchableOpacity>

        <Text style={styles.messagePermissao}>Vá em "Configurações" para ativar as permissões de câmera e de localização. <Text style={{ fontWeight: 'bold' }}>Sem essas permissões, não é possível tirar fotos.</Text> </Text>

      </View>
      
    );
  }
  else
  {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#121212" translucent={false} />
        <CameraView style={styles.camera} ref={ref} facing={'back'} mode={'picture'} responsiveOrientationWhenOrientationLocked>

            <TouchableOpacity style={styles.fecharCamera} onPress={fecharCamera}>
              <ImageBackground 
                source={{ uri: "https://cdn-icons-png.flaticon.com/256/458/458595.png" }} 
                style={styles.x}
              ></ImageBackground>
            </TouchableOpacity>
          
            <TouchableOpacity style={styles.buttonCamera} onPress={tirarFoto}>
              <ImageBackground 
                // btn Verde source={{ uri: "https://i.imgur.com/hD6QEap.png" }} 
                source={{ uri: "https://i.imgur.com/qkSV6k6.png" }} 
                style={styles.cameraImgBotaoCaptura}
              ></ImageBackground>
            </TouchableOpacity>

              
          
        </CameraView>
      </View>
    );
}
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
  alignContent: 'center',
  backgroundColor: 'black'
},
messagePermissao: {
  textAlign: 'center',
  paddingBottom: 10,
  fontSize: 18,
  color: 'white',
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