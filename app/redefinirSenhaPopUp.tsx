import React from "react";
import {useState} from 'react';
import {TextInput, TouchableOpacity, StyleSheet, View, Text} from "react-native";
import { getAuth, sendPasswordResetEmail } from '@react-native-firebase/auth';
interface redefinirSenhaPopUpPopUpProps {
btnFecharJanela: () => void;
}

const RedefinirSenhaPopUp = ({btnFecharJanela}:redefinirSenhaPopUpPopUpProps) => {

const [janelaEmailEnviado, setJanelaEmailEnviado] = useState(false);
const [email, setEmail] = useState("");
const [error, setError] = useState("");

const fecharJanela = async () => {
    setJanelaEmailEnviado(false);
    setError("");
    setEmail("");
    btnFecharJanela()
  };

const redefinirSenha = async () => {
    if(email)
    {
  
        await sendPasswordResetEmail(getAuth(),email).then(() => {
          setJanelaEmailEnviado(true);
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/user-not-found':
              setError("Esse e-mail não está cadastrado.");
              break;
            case 'auth/invalid-email':
              setError("O e-mail informado é inválido.");
              break;
            case 'auth/too-many-requests':
              setError("Muitas tentativas. Tente novamente mais tarde.");
              break;
            default:
              setError("Erro ao enviar o e-mail. Tente novamente.");
              break;
          }
        });

    }
    else
      setError("Informe seu E-mail");
  };


  return (
  <View>
    {janelaEmailEnviado && (
      <View style={styles.janelaConcluido}>
        <Text style={styles.msgAviso}>E-mail enviado com sucesso. Verifique sua caixa de entrada.</Text>
        
        <TouchableOpacity onPress={() => fecharJanela()} style={styles.btnVoltar}>
          <Text style={styles.txtBtn}>Ok</Text>
        </TouchableOpacity>
      </View>
    )}

    {!janelaEmailEnviado && (
      <View style={styles.janelaEnviarEmail}>
        <Text style={styles.msgAviso}>Informe o E-mail de cadastro</Text>
        
        <View style={styles.acessoCaixa}>
              <TextInput
                style={styles.acessoInput}
                placeholder="usuario@email.com"
                value={email}
                onChangeText={(userDigitado) => setEmail(userDigitado)}
                keyboardType="email-address"
              />
        </View>

        <View style={styles.erroArea}>
        {error && <Text style={styles.errorText}>{error}</Text>}
        </View>

        <View style={styles.areaBtn}>
          <TouchableOpacity onPress={() => btnFecharJanela()} style={styles.btnVoltar}>
            <Text style={styles.txtBtn}>Voltar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => redefinirSenha()} style={styles.btnEnviarEmail}>
            <Text style={styles.txtBtn}>Enviar E-mail</Text>
          </TouchableOpacity>
        </View>
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
    janelaConcluido: {
    height: 200,
    width: 370,
    top:200,
    backgroundColor: 'black',
    borderRadius: 10,
    padding: 40,
    gap: 25,
    alignItems: 'center',
    justifyContent: "center"
  },
  janelaEnviarEmail: {
    height: 240,
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
  txtBtn:{
    fontSize: 16, 
    textAlign: "center",
    fontWeight: "500", 
    color: "white", 
  },
  areaBtn:{
    height: '100%',
    width: 370,
    justifyContent: 'center',
    flexDirection: 'row',
    gap:10,
    marginTop:25
  },
  btnEnviarEmail:{
    height: 60,
    width: 140,
    borderRadius: 10,
    backgroundColor: '#0373fc',
    textAlign:'center',
    justifyContent: 'center',
  },
  btnVoltar:{
    height: 60,
    width: 140,
    borderRadius: 10,
    backgroundColor: '#919191',
    textAlign:'center',
    justifyContent: 'center',
  },
  acessoCaixa: {
    marginTop:15
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
  },erroArea: {
    height: 20,
    width: 300,
    //backgroundColor: 'red',
    marginBottom: -18,
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});

export default (RedefinirSenhaPopUp)