import React from "react";
import { TouchableOpacity, ScrollView, ImageBackground, Image, StyleSheet, Platform, View, Text} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";
import * as FileSystem from 'expo-file-system';

interface MiniaturaImagemCapturasScreenProps {
  caminhoImagem: string
  onImagemDeletada: (caminhoImagem: string) => void;
  onImagemSelecionada: (caminhoImagem: string, visualizar: boolean) => void
}

export default function  MiniaturaImagemCapturasScreen({ caminhoImagem, onImagemDeletada, onImagemSelecionada }: MiniaturaImagemCapturasScreenProps) {

  return (
<View style={styles.img}>

  <TouchableOpacity onLongPress={() => onImagemSelecionada(caminhoImagem, true)} onPressOut={() => onImagemSelecionada(caminhoImagem, false)} style={styles.btnAbrirImg}>
     {/*<Image  source={{ uri: 'file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fdetect-greening-app-a9aa5a6a-ce09-405b-b11a-1be8adf9945c/Camera/5bf28766-31e0-487d-9166-6d13e3ca3882.jpg' }} style={styles.imgAlbum} />*/}
     <Image  source={{ uri: caminhoImagem }} style={styles.imgAlbum} />
  </TouchableOpacity>
  <TouchableOpacity onPress={() => onImagemDeletada(caminhoImagem)} style={styles.btnDeletar}>
    <Image  source={{ uri: 'https://i.imgur.com/pfyoKgT_d.webp?maxwidth=760&fidelity=grand' }} style={styles.imgDeletar} />
  </TouchableOpacity>
</View>

  );
}

const styles = StyleSheet.create({
  img: {
    height: 110,
    width: 110,
    alignItems: "center",
    justifyContent: 'center',   
  },
  imgDeletar:{
    height: 30,
    width: 30,
  },
  btnDeletar:{
    position: 'absolute',
    top: -7,
    right: -7,
    height: 30,
    width: 30,
  },
  btnAbrirImg:{
    height: 110,
    width: 110,
    borderRadius: 30,
  },
  imgAlbum:{
    height: 110,
    width: 110,
    borderRadius: 30,
    backgroundColor: '#1B1B1B',
  },
});

