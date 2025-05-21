import React from "react";
import {useState, useEffect} from 'react';
import {FlatList, TouchableOpacity, ScrollView, ImageBackground, Image, StyleSheet, StatusBar, View, Text} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";
import MiniaturaImagemCapturasScreen from "./miniaturaImagem";
import * as FileSystem from 'expo-file-system';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { WebView } from 'react-native-webview';

interface janelasPopUpProps {
btnClique: (x: string) => void;
janela: string
}

export default function JanelasPopUp({btnClique, janela}:janelasPopUpProps) {

  useEffect(() => {
    setJanelaDefinida(janela);
  });

  const [janelaDefinida, setJanelaDefinida] = useState(janela);

  const cancelarProcessamento = async () => {
    console.log("Processamento Cancelado")
    btnClique("CancelarProcessamento");
    setJanelaDefinida("CancelandoProcessamento");
  };

  const proceesamentoCancelando = async () => {
    btnClique("FecharPop");
  };

  const deletarImg = async () => {
    btnClique("ExcluirImagem");
  };

  const cancelar = async () => {
    btnClique("Cancelar");
  };
  const limparGaleria = async () => {
    btnClique("LimparGaleria");
  };

  return (
  <View>
    {janelaDefinida.includes("ErroAPI") && (
      <View style={styles.janelaConcluido}>
        <Text style={styles.msgAviso}>Falha na comunicação com a nuvem. Entre em contato com o suporte técnico</Text>
        
        <TouchableOpacity onPress={() => proceesamentoCancelando()} style={styles.btnVoltar}>
          <Text style={styles.txtBtn}>Ok</Text>
        </TouchableOpacity>
      </View>
    )}

    {janelaDefinida == "PorcessouSucesso" && (
      <View style={styles.janelaConcluido}>
        <Text style={styles.msgAviso}>O processamento foi concluindo</Text>
        
        <TouchableOpacity onPress={() => proceesamentoCancelando()} style={styles.btnVoltar}>
          <Text style={styles.txtBtn}>Ok</Text>
        </TouchableOpacity>
      </View>
    )}

    {janelaDefinida == "ExcluirImagem" && (
      <View style={styles.janelaLimparGaleria}>
        <Text style={[styles.msgAviso, {fontWeight: 'bold' }]}>Tem certeza que deseja excluir a imagem?</Text>
        
        <View style={styles.areaBtnjanelaLimparGaleria}>
          <TouchableOpacity onPress={() => cancelar()} style={styles.btnCancelarLimparGaleria}>
            <Text style={styles.txtBtn}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deletarImg()} style={styles.btnLimparLimparGaleria}>
            <Text style={styles.txtBtn}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}

    {janelaDefinida == "LimparGaleria" && (
      <View style={styles.janelaLimparGaleria}>
        <Text style={styles.msgAviso}><Text style={[styles.msgAviso, {fontWeight: 'bold' }]}>Deseja prosseguir com a exclusão de todas imagens da galeria? </Text>Esta ação é irreversível</Text>
        
        <View style={styles.areaBtnjanelaLimparGaleria}>
          <TouchableOpacity onPress={() => cancelar()} style={styles.btnCancelarLimparGaleria}>
            <Text style={styles.txtBtn}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => limparGaleria()} style={styles.btnLimparLimparGaleria}>
            <Text style={styles.txtBtn}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    )}

    {janelaDefinida == "CancelandoProcessamento" && (
      <View style={styles.janelaCancelando}>
        <Text style={styles.msgAviso}>Cancelando o processamento...</Text>
      </View>
    )}

    {janelaDefinida == "ProceesamentoCancelando" && (
      <View style={styles.janelaCancelar}>
        <Text style={styles.msgAviso}>O processamento foi cancelado</Text>
        
        <TouchableOpacity onPress={() => proceesamentoCancelando()} style={styles.btnVoltar}>
          <Text style={styles.txtBtn}>Ok</Text>
        </TouchableOpacity>
      </View>
    )}

    {janelaDefinida == "ProcessandoImagens" && (
    <View style={styles.janela}>
      <Text style={styles.msgAviso}>Estamos enviando suas imagens para a nuvem, não saia desta tela</Text>
      
      <Image  source={{ uri: 'https://i.imgur.com/nNqFad3.gif' }} style={styles.carregandoGIF} />

      <Text style={[styles.msgAviso, {fontWeight: 'bold' }]}> Isso pode levar alguns instantes</Text>
      
      <TouchableOpacity onPress={() => cancelarProcessamento()} style={styles.btnCancelar}>
                  <Text style={styles.txtBtn}>Cancelar</Text>
      </TouchableOpacity>
    </View>
    )}

  </View>
  );
  
}

const styles = StyleSheet.create({
  janela: {
    height: 450,
    width: 370,
    top:180,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 40,
    gap: 25,
    alignItems: 'center'
  },
  janelaCancelar: {
    height: 200,
    width: 370,
    top:280,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 40,
    gap: 25,
    alignItems: 'center',
    justifyContent: "center"
  },
    janelaConcluido: {
    height: 200,
    width: 370,
    top:280,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 40,
    gap: 25,
    alignItems: 'center',
    justifyContent: "center"
  },
  janelaCancelando: {
    height: 140,
    width: 370,
    top:295,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 50,
    alignItems: 'center',
  },
  janelaLimparGaleria: {
    height: 220,
    width: 370,
    top:200,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
  },
  msgAviso:{
    fontSize: 18, 
    //fontWeight: "500", 
    textAlign: "center", 
    color: "white", 
  },
  carregandoGIF:{
    width: 170,
    height:170,
    backgroundColor: 'black'
  },  
  btnCancelar:{
    height: 60,
    width: 140,
    borderRadius: 10,
    backgroundColor: '#A63737',
    textAlign:'center',
    justifyContent: 'center',
  },
  txtBtn:{
    fontSize: 16, 
    textAlign: "center",
    fontWeight: "500", 
    color: "white", 
  },
  btnVoltar:{
    height: 60,
    width: 140,
    borderRadius: 10,
    backgroundColor: '#919191',
    textAlign:'center',
    justifyContent: 'center',
  },
  areaBtnjanelaLimparGaleria:{
    height: '100%',
    width: 370,
    justifyContent: 'center',
    flexDirection: 'row',
    gap:10,
    marginTop:25
  },btnCancelarLimparGaler:{

  },
  btnLimparLimparGaleria:{
    height: 60,
    width: 140,
    borderRadius: 10,
    backgroundColor: '#A63737',
    textAlign:'center',
    justifyContent: 'center',
  },
  btnCancelarLimparGaleria:{
    height: 60,
    width: 140,
    borderRadius: 10,
    backgroundColor: '#919191',
    textAlign:'center',
    justifyContent: 'center',
  },

});
