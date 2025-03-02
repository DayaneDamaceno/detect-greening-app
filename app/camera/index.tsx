import React from "react";
import { ImageBackground, Image, StyleSheet, Platform, View, Text} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function InicialScreen() {
  return (

<ImageBackground 
      source={{ uri: "https://i.imgur.com/mhyHNC8_d.webp?maxwidth=760&fidelity=grand" }} 
      style={styles.background}
    >

    
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
          <ImageBackground 
            source={{ uri: "https://i.imgur.com/EZJEKZu_d.webp?maxwidth=760&fidelity=grand" }} 
            style={styles.resultados}
          ></ImageBackground>
        
          <ImageBackground 
            source={{ uri: "https://i.imgur.com/3uwkFQF_d.webp?maxwidth=760&fidelity=grand" }} 
            style={styles.camera}
          ></ImageBackground>
        
        
          <ImageBackground 
            source={{ uri: "https://i.imgur.com/L7Jsylw_d.webp?maxwidth=760&fidelity=grand" }} 
            style={styles.captura}
          ></ImageBackground>
        
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
    //justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
    
  },
  conteudo: {
    height: 500,
    width: 300,
    gap: 10,
    //justifyContent: "center", // Centraliza verticalmente
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
    fontSize: 17, // Tamanho da fonte
    fontWeight: "bold", // Negrito
    textAlign: "center", // Garante centralização do texto dentro do próprio componente
    color: "#85E99A", // Cor do texto
  },
  caixaTextoRandomico:{
    width: 300,
    height: 220,
    //backgroundColor: 'green',
  },
  textoRandomico: {
    fontSize: 28, // Tamanho da fonte
    fontWeight: "900", // Negrito
    textAlign: "center", // Garante centralização do texto dentro do próprio componente
    color: "#92C29C", // Cor do texto
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
    justifyContent: "center", // Centraliza verticalmente
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
