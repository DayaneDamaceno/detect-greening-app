import React, { useState } from "react";
import { TextInput, Button, ScrollView, TouchableOpacity, StyleSheet, Platform, View, Text, StatusBar } from "react-native";
import { useRouter } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from '@react-native-firebase/auth';



export default function LoginScreen(){
  const router = useRouter();
  const [user, setUser] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");


  function entrar() {
    router.replace("/inicial");
  }

  const login = async () => {
      if (!user || !pw) {
        setError("Preencha todos os campos");
        return;
      }
  try {
    const result = await signInWithEmailAndPassword(getAuth(), user.trim(), pw);
    
    if (!result.user || !result.user.uid)
      throw new Error();

    entrar(); // função de navegação ou mudança de estado
  } catch (error) {
    setError("Usuário ou senha incorreto.")
    console.log('Erro no login:', error);
  }
};

  return (
    <View style={styles.tela}>
      <StatusBar barStyle="light-content" backgroundColor="#121212" translucent={false} />
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
              keyboardType="email-address"
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

          <View style={styles.erroArea}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        
        </View>

        <TouchableOpacity style={styles.btnAcessar} onPress={() => login()}>
          <Text style={styles.acessoText}>Acessar</Text>
        </TouchableOpacity>

        <Text style={styles.textEquecSenha}>Esqueceu a senha?</Text>

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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  login: {
    height: 450,
    width: 370,
    backgroundColor: '#1B1B1B',
    alignItems: "center",
    borderRadius: 25,
    paddingTop: 30,
    paddingBottom: 30,
    gap: 30
  },
  headerTop: {
    alignItems: 'center',
    gap: 10
  },
  textLogin: {
    fontSize: 25,
    color: 'white',
    fontWeight: 800,
  },
  textOrientacao: {
    fontSize: 15,
    color: 'white',
    fontWeight: 400,
  },
  inputs: {
    gap: 10
  },
  acessoCaixa: {
    gap: 5
  },
  acessoText: {
    fontSize: 15,
    color: 'white',
    fontWeight: 400,
  },
  acessoInput: {
    backgroundColor: "black",
    height: 50,
    width: 300,
    color: 'white',
    fontSize: 15,
    padding: 15,
    borderWidth: 1,
    borderColor: '#676767',
    borderRadius: 10
  },
  btnAcessar: {
    height: 50,
    width: 300,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F8D5B',
    alignItems: "center",
    borderRadius: 10,
  },
  erroArea: {
    height: 20,
    width: 300,
    //backgroundColor: 'red',
    marginBottom: -20,
    marginTop: -5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },

  textEquecSenha: {
    color: '#7E93E5',
    fontSize: 15,
    marginTop: -20,
    textDecorationLine: 'underline'
  }
});