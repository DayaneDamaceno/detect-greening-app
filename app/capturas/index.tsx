import React from "react";
import { TouchableOpacity, ScrollView, ImageBackground, Image, StyleSheet, Platform, View, Text} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";


export default function CapturasScreen() {
  const router = useRouter();

  return (

  <ImageBackground 
        source={{ uri: "https://i.imgur.com/mhyHNC8_d.webp?maxwidth=760&fidelity=grand" }} 
        style={styles.background}
  >

    
    <View style={styles.tela}>
      <View style={styles.menuJanela}>
        <TouchableOpacity style={styles.sair} onPress={() => router.back()}>
          <Text style={styles.x}>X</Text>
        </TouchableOpacity>

        <Text style={styles.tituloTela}>Capturas</Text>
      </View>
      <ImageBackground 
        source={{ uri: "https://i.imgur.com/wNVr4HC_d.webp?maxwidth=760&fidelity=grand" }} 
        style={styles.conteudoFundo}
      >
        <ScrollView  style={styles.conteudo}>

          <View style={styles.addFoto}>
            <Image  source={{ uri: 'https://i.imgur.com/OBbbd2y_d.webp?maxwidth=760&fidelity=grand' }} style={styles.imgAlbum} />
            <Text style={styles.textGaleria}>Galeria</Text>
          </View>

        </ScrollView >
      </ImageBackground>
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
  menuJanela:{
    height: 55,
    width: '100%',
    position: "relative", 
    top: 50,
    backgroundColor: 'black',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: "row",
    paddingTop:10,
  },
  sair:{
    position: "absolute", 
    left: 15,
    top:15,
    width:40,
    height:40,
    borderRadius: '100%',
    backgroundColor: '#3C3C3C',
    alignItems: "center",
    justifyContent: 'center',
  },
  x:{
    fontSize: 17, 
    fontWeight: "400", 
    textAlign: "center", 
    color: "#ffffff", 
  },
  tituloTela:{
    fontSize: 20, 
    fontWeight: "500", 
    textAlign: "center", 
    color: "#ffffff", 
  },
  conteudoFundo: {
    height: '100%',
    width: '100%',
    position: "relative", 
    top: 50,

  },
  conteudo: {
    height: '100%',
    width: '100%',
    padding: 20,
  },
  addFoto: {
    height: 110,
    width: 110,
    borderRadius: 30,
    backgroundColor: '#1B1B1B',
    alignItems: "center",
    justifyContent: 'center',   
  },
  imgAlbum:{
    height: 60,
    width: 60,
    marginBottom: -3,
  },
  textGaleria:{
    fontSize: 14, 
    fontWeight: "500", 
    textAlign: "center", 
    color: "white", 
  }
});
