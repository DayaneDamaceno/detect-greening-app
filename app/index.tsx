import React, { useState } from "react";
import {TextInput, Button, ScrollView, TouchableOpacity, ImageBackground, Image, StyleSheet, Platform, View, Text, StatusBar} from "react-native";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useRouter } from "expo-router";


export default function LoginScreen() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");

  function autenticar(){
    router.push("/inicial")

  }
  
  return (
    
    <View style={styles.tela}>
      
      <View style={styles.login}>
        <View style={styles.headerTop}>
          <Text style={styles.textLogin}>Login</Text>
          <Text style={styles.textOrientacao}>Realize o login para ter acesso aos recursos</Text>
        </View>
        
        <View style={styles.inputs}>
          
          <View style={styles.acessoCaixa}>
            <Text style={styles.acessoText}>Usuário</Text>
            <TextInput
            style={styles.acessoInput}
            placeholder="usuario@email.com"
            value={user}
            onChangeText={(userDigitado) => setUser(userDigitado)}
            />
          </View>

          <View style={styles.acessoCaixa}>
            <Text style={styles.acessoText}>Senha</Text>
            <TextInput
            style={styles.acessoInput}
            placeholder="**********"
            value={pw}
            onChangeText={(pwDigitado) => setPw(pwDigitado)}
            secureTextEntry={true}          
            />
          </View>
        </View>
        <TouchableOpacity style={styles.btnAcessar} onPress={() => autenticar()}>
          <Text style={styles.acessoText}>Acessar</Text>
        </TouchableOpacity>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  tela: {
    height: '100%',
    width: '100%',
    flex: 1,
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "black",
  },
  login: {
    height: 400,
    width: 370,
    backgroundColor: '#1B1B1B',
    alignItems: "center",
    borderRadius: 25,
    paddingTop: 30,
    paddingBottom: 30,
    gap: 30
  },
  headerTop:{
    alignItems: 'center',
    gap:10
  },
  textLogin:{
    fontSize: 25,
    color: 'white',
    fontWeight: 800, 
  },
  textOrientacao:{
    fontSize: 15,
    color: 'white',
    fontWeight: 400,
  },
  inputs:{
    gap: 10
  },
  acessoCaixa:{
    gap:5
  },
  acessoText:{
    fontSize: 15,
    color: 'white',
    fontWeight: 400,
  },
  acessoInput:{
    backgroundColor: "black",
    height: 50,
    width: 300,
    color: 'white',
    fontSize: 15,
    padding:15,
    borderWidth: 1, 
    borderColor: '#676767',
    borderRadius: 10
  },
  btnAcessar:{
    height: 50,
    width: 300,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#5C7B63',
    alignItems: "center",
    borderRadius: 10,
  }
});
