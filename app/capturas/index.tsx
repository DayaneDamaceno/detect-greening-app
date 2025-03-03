import React from "react";
import { ImageBackground, Image, StyleSheet, Platform, View, Text} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';


export default function CapturasScreen() {
  return (

  <ImageBackground 
        source={{ uri: "https://i.imgur.com/mhyHNC8_d.webp?maxwidth=760&fidelity=grand" }} 
        style={styles.background}
  >

    
    <View style={styles.tela}>
      <View style={styles.menuJanela}>
        <View style={styles.sair}>
          <Text style={styles.x}>X</Text>
        </View>

        <Text style={styles.tituloTela}>Capturas</Text>
      </View>
      <LinearGradient
        colors={[

          '#000000', // Mantém o preto até perto de 70%
          '#010603',
          '#010D04',
          '#021206',
          '#021706',
          '#031807',
          '#031A08',
          '#031B08', // Tom final mais esverdeado
        ]}
        locations={[0, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1]} // Gradiente só começa a mudar depois de 70%
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.conteudo}
      >
      
      
      </LinearGradient>

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
  conteudo: {
    height: '100%',
    width: '100%',
    position: "relative", 
    top: 50,
    backgroundColor: 'black',
    alignItems: "center",
  },
});
