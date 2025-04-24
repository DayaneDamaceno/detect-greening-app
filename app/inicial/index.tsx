import React from "react";
import {Button, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet, Platform, View, Text, StatusBar} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";


export default function InicialScreen() {
  const router = useRouter();
  
  return (
    <ImageBackground 
      source={{ uri: "https://i.imgur.com/mhyHNC8_d.webp?maxwidth=760&fidelity=grand" }} 
      style={styles.background}
    >
    <StatusBar barStyle="light-content" backgroundColor="#121212" translucent={false} />
    <View style={styles.tela}>
      
      <View style={styles.conteudo}>
        <View style={styles.caixaTextoPergunta}>
          <Text style={styles.textoPergunta}>Posso explorar sua plantação?</Text>
        </View>
        <View style={styles.caixaTextoRandomico}>
          <MaskedView maskElement={<Text style={styles.textoRandomico}>"A greening é considerada uma das doenças mais graves do mundo"</Text>}>
            <LinearGradient
              colors={["#5f966a", "#dfede2"]}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            />
          </MaskedView>
        </View>
        <ImageBackground 
          source={{ uri: "https://i.imgur.com/bTqw8Xg_d.webp?maxwidth=760&fidelity=grand" }} 
          style={styles.imgPlanta}
        ></ImageBackground>
      </View>
      
      <View style={styles.menu}>
        <TouchableOpacity>
          <ImageBackground 
            source={{ uri: "" }} 
            style={styles.resultados}
          ></ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/camera")}>
          <ImageBackground 
            source={{ uri: "https://i.imgur.com/FDOsCkG.png" }} 
            style={styles.camera}
          ></ImageBackground>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => router.push("/capturas")}>
          <ImageBackground 
            source={{ uri: "https://i.imgur.com/L7Jsylw_d.webp?maxwidth=760&fidelity=grand" }} 
            style={styles.captura}
          ></ImageBackground>
        </TouchableOpacity>
      </View>

    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',    
  },
  tela: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: "center", 
    
  },
  conteudo: {
    height: 500,
    width: 300,
    gap: 10,
    position: "relative", 
    top: 80,
    //backgroundColor: 'black',
    alignItems: "center",
  },
  caixaTextoPergunta:{
    width: 300,
    height: 30,
   //backgroundColor: 'blue',
  },
  textoPergunta: {
    fontSize: 17, 
    fontWeight: "bold", 
    textAlign: "center", 
    color: "#85E99A", 
  },
  caixaTextoRandomico:{
    width: 300,
    height: 220,
    //backgroundColor: 'green',
  },
  textoRandomico: {
    fontSize: 28, 
    fontWeight: "900", 
    textAlign: "center", 
    color: "#92C29C", 
  },
  gradient: {
    width: 300,
    height: 170,
},
  imgPlanta: {
    marginTop: 5,
    height: 150,
    width: 160,
    //backgroundColor: '#20b2aa',
  
  },
  menu: {
    height: 130,
    width: 350,
    //backgroundColor: '#5f9ea0',
    justifyContent: "center", 
    position: "relative", 
    top: 120,
    flexDirection: "row",
    gap: 70,
  },
  resultados: {
    height: 35,
    width: 35,
    marginTop: 80
  },
  camera: {
    height: 100,
    width: 100,
  },
  captura: {
    height: 45,
    width: 45,
    marginTop: 80
  },
});
