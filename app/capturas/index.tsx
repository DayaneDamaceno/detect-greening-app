import React from "react";
import {useState, useEffect, useRef} from 'react';
import {InteractionManager, FlatList, TouchableOpacity, ScrollView, ImageBackground, Image, StyleSheet, StatusBar, View, Text} from "react-native";
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
import JanelasPopUp from "./janelasPopUp"
import JSZip from 'jszip';
import EnviarZipNuvem from "./chamadaAPI";


export default function CapturasScreen() {
  const router = useRouter();
  const [abrirImgSelecionada, setAbrirImgSelecionada] = useState<"none" | "flex">("none");
  const [popUpProcessandoImg, setPopUpProcessandoImg] = useState<"none" | "flex">("none");
  const [listaImg, setListImg] = useState("");
  const [caminhoImgSelecionada, setCaminhoImgSelecionada] = useState("");
  const [localDiretorioFotos, setLocalDiretorioFotos] = useState("");
  const cancelarProcessamentoRef = useRef(false);
  const [janelaPop, setJanelaPop ] = useState("")
  const [imgSerDeletada, setImgSerDeletada ] = useState("")

  useEffect(() => {

      carregarImagens();
      obterLocalDiretorioCache();

    });

  const obterLocalDiretorioCache = async () => {
    const diretorio = await AsyncStorage.getItem("@localFotos");
    setLocalDiretorioFotos(diretorio || "");
  };

  const carregarImagens = async () => {
    const imagens = await AsyncStorage.getItem("@geoFotos");
    setListImg(imagens || "");
  };

  const handleImagemSelecionada = (imagemUri: string, visualizar: boolean) => {
    setCaminhoImgSelecionada(imagemUri);
    
    if(visualizar)
      setAbrirImgSelecionada("flex");
    else
      setAbrirImgSelecionada("none");
  };

  const retornoJanela = (retorno:string) => {
    setJanelaPop("");
    if(retorno == "CancelarProcessamento")
      cancelarProcessamentoRef.current = true;
    else if (retorno == "FecharPop" || retorno == "Cancelar")
      setPopUpProcessandoImg("none");
    else if (retorno == "ExcluirImagem")
    {
      deletarImagem(imgSerDeletada);
      setPopUpProcessandoImg("none");
    }
    else if (retorno == "LimparGaleria")
    {
      setPopUpProcessandoImg("none");
      limparImagens();
    }
  };

  const handleImagemDeletada = (imagemUri: string) => {
    setJanelaPop("ExcluirImagem");
    setImgSerDeletada(imagemUri);
    setPopUpProcessandoImg("flex");
  };

  const deletarImagem = async (imagemUri: string) => {
    const conteudoJson = await AsyncStorage.getItem("@geoFotos");
    const imagens = conteudoJson ? JSON.parse(conteudoJson) : [];
    const separarBarra = imagemUri.split('/');

    if(imagens){
      for (let index = 0; index < imagens.length; index++) 
        if(separarBarra[separarBarra.length - 1] == imagens[index].uri){
          imagens.splice(index, 1);
          break;
        }
      

      if(imagens.length == 0)
        await limparCache();
      else
        await AsyncStorage.setItem("@geoFotos", JSON.stringify(imagens));
      
      carregarImagens();
    }
  };

  const processarImagensPopUp = () => {
    setJanelaPop("ProcessandoImagens");
    
    InteractionManager.runAfterInteractions(async () => {
      processarImagens(localDiretorioFotos, listaImg);
 
    });

  };

  const perguntarPopUpLimparGaleria = async () => {
    if(localDiretorioFotos){
      setJanelaPop("LimparGaleria");
      setPopUpProcessandoImg("flex");
    }
    else
    {
      console.log("Não há registro a ser limpo");
    }
  };

  const limparCache = async () => {
    await AsyncStorage.setItem("@geoFotos", "");
    await AsyncStorage.setItem("@localFotos", "");

    setListImg("");
    setLocalDiretorioFotos("");

    console.log("Cache Deletado")
  };


  const limparImagens = async () => {
    try {

      let localImg = localDiretorioFotos

      if(localImg)
      {
        const files = await FileSystem.readDirectoryAsync(localImg);
        
        for (const file of files) {
          const fileUri = `${localImg}/${file}`;
          await FileSystem.deleteAsync(fileUri, { idempotent: true });
        }

        await limparCache();
        
        console.log('Todos os arquivos foram deletados');
      }

    } catch (error) {
      console.error('Erro ao deletar arquivos: ', error);
    }
  };

  const processarImagens = async (caminhoImagens: string, imagens: string) => {
    
    if(caminhoImagens && imagens)
    {
      try {
        setPopUpProcessandoImg("flex");
        cancelarProcessamentoRef.current = false

        while(true)
        {
          const zip = new JSZip();

          const listaImagens = imagens ? JSON.parse(imagens) : [];

          for (let i = 0; i < listaImagens.length; i++) 
          {
            const nomeArquivo = listaImagens[i].uri;
            const uri = caminhoImagens + nomeArquivo;

            console.log("1 " + cancelarProcessamentoRef.current);
            if(cancelarProcessamentoRef.current)
              {
                setJanelaPop("ProceesamentoCancelando");
                break;
              }

            // Lê o arquivo como base64
            const base64 = await FileSystem.readAsStringAsync(uri, {
              encoding: FileSystem.EncodingType.Base64,
            });

            console.log("2 " + cancelarProcessamentoRef.current);

            // Adiciona ao zip
            zip.file(nomeArquivo, base64, { base64: true });

            //console.log(uri);
          }


          //Cria o arquivo metadata.json, que tem a geolocalização
          const caminhoMetadataJson = await criarArquivoJson();
          const metaDataJson = await FileSystem.readAsStringAsync(caminhoMetadataJson || "" , {
            encoding: FileSystem.EncodingType.Base64,
          });
          zip.file("metadata.json", metaDataJson, { base64: true });
          
          
          console.log("3 " + cancelarProcessamentoRef.current);
          
          if(cancelarProcessamentoRef.current)
          {
            setJanelaPop("ProceesamentoCancelando");
            break;
          }

          // Gera o conteúdo do zip em base64
          const zipBase64 = await zip.generateAsync({ type: 'base64' });


          // Caminho onde o zip será salvo
          const zipPath = FileSystem.documentDirectory + 'capturas_greening.zip';
          
          console.log("4 " + cancelarProcessamentoRef.current);
          if(cancelarProcessamentoRef.current)
            {
              setJanelaPop("ProceesamentoCancelando");
              break;
            }

          // Salva o zip no sistema de arquivos
          await FileSystem.writeAsStringAsync(zipPath, zipBase64, {
            encoding: FileSystem.EncodingType.Base64,
          });

          console.log('Arquivo criado em:', zipPath);
          
          console.log("5 " + cancelarProcessamentoRef.current);
          if(cancelarProcessamentoRef.current)
            {
              setJanelaPop("ProceesamentoCancelando");
              break;
            }


            await EnviarZipNuvem.EnviarZipNuvem();
            setJanelaPop("PorcessouSucesso");
          
          break;
        }

      } catch (error) {
        console.log("Erro ao enviar processar: ", error)
        setJanelaPop("ErroAPI");
      }
    }
    else
    {
      console.log("Não foi possivel processar a img")
    }

  };

  const criarArquivoJson = async () => {
    const path = FileSystem.documentDirectory + 'metadata.json';

    const substituidoUriFilename = listaImg.replace(/"uri":/g, '"filename":');
    const arquivo = `{"locations": [ ${substituidoUriFilename} ]}`;

    try {
      await FileSystem.writeAsStringAsync(path, arquivo, {
        encoding: FileSystem.EncodingType.UTF8,
      });
      console.log('Arquivo metadata.json criado com sucesso');
      
      return path;

    } catch (error) {
      console.error('Erro ao criar arquivo: ', error);
    }
  };

  return (

  <ImageBackground 
        source={{ uri: "https://i.imgur.com/mhyHNC8_d.webp?maxwidth=760&fidelity=grand" }} 
        style={styles.background}
  >
    <StatusBar barStyle="light-content" backgroundColor="#121212" translucent={false} />
    
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
        <View  style={styles.conteudo}>
          {/*Caso não encontre a foto*/}
          {!listaImg && (
            <View style={styles.localMsgGaleriaVazia}>
              <Text style={styles.msgGaleriaVazia}>Galeria vazia</Text>
            </View>
          )}
          {/*Se encontrar a foto*/}
          {listaImg && (
            <FlatList
            style={styles.listaFoto}
              data={JSON.parse(listaImg)}
              keyExtractor={(item, index) => index.toString()}
              numColumns={3} // 3 Fotos por linha - TESTAR EM OUTRO CELULAR A CENTRALIZAÇÃO
              columnWrapperStyle={{     
                justifyContent: 'flex-start',
                marginBottom: 10,
                gap: 10 }}
              contentContainerStyle={{ paddingBottom: 165 }}
              renderItem={({ item }) => (
                <MiniaturaImagemCapturasScreen
                  caminhoImagem={localDiretorioFotos + item.uri}
                  onImagemDeletada={handleImagemDeletada}
                  onImagemSelecionada={handleImagemSelecionada}
                />
              )}
            />
          )}
          
        </View >

        <View style={styles.btnRodape}>
          <TouchableOpacity onPress={() => processarImagensPopUp()}  style={styles.btnProcessarImg}>
            <Text style={styles.textGaleria}>Processar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => perguntarPopUpLimparGaleria()} style={styles.btnLimparImg}>
            <Text style={styles.textGaleria}>Limpar</Text>
          </TouchableOpacity>
        </View>
          
      </ImageBackground>

      <Image  source={{ uri: caminhoImgSelecionada }} style={[styles.imgTelaCheia, { display: abrirImgSelecionada }]} />
          
      <View style={[styles.janelaProcessamento, {display: popUpProcessandoImg}]}>
          <JanelasPopUp btnClique={(x) => retornoJanela(x)} janela={janelaPop} />
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
    //backgroundColor: 'white',
  },
  conteudo: {
    height: '100%',
    width: '100%',
    padding: 10,
    //backgroundColor:'#fff',
  },
  listaFoto:{
    paddingTop: 15,
    paddingLeft:16,
    paddingRight:10,
  },
  localMsgGaleriaVazia: {
    height: 500,
    width: '100%',
    //backgroundColor: '#1B1B1B',
    alignItems: "center",
    justifyContent: 'center',   
  },
  msgGaleriaVazia:{
    fontSize: 17, 
    //fontWeight: "500", 
    textAlign: "center", 
    color: "#747575", 
  },
  textGaleria:{
    fontSize: 14, 
    fontWeight: "500", 
    textAlign: "center", 
    color: "white", 
  },
  imgTelaCheia:{
    position: 'absolute',
    top:200,
    height: 470,
    width: 370,
    borderRadius: 10,
    display: "none",
  },
  btnRodape:{
    position: 'absolute',
    top: '78%',
    height: 60,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
    gap:5,
  },
  btnProcessarImg:{
    height: 60,
    width: 220,
    borderStartEndRadius: 10,
    borderStartStartRadius: 10,
    backgroundColor: '#4F8D5B',
    textAlign:'center',
    justifyContent: 'center'
  },
  btnLimparImg:{
    height: 60,
    width: 100,
    borderEndStartRadius: 10,
    borderBottomEndRadius: 10,
    backgroundColor: '#A63737',
    textAlign:'center',
    justifyContent: 'center',
  },
  janelaProcessamento:{
    position: 'absolute',
    height: "100%",
    width: "100%",
    backgroundColor: 'rgba(36, 36, 36, 0.55)',
    alignItems: 'center',
    display: "none",
  },
});
