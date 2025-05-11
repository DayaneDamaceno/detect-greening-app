import * as FileSystem from 'expo-file-system';

const API_URL = 'Informe a URL';

export const enviarZipNuvem = async () => {
  const fileUri = FileSystem.documentDirectory + 'capturas_greening.zip';

  console.log('Caminho do arquivo:', fileUri);

  const fileInfo = await FileSystem.getInfoAsync(fileUri);
  if (!fileInfo.exists) {
    console.error('Arquivo ZIP não encontrado:', fileUri);
    return;
  }

  const formData = new FormData();
  formData.append('file', {
    uri: fileUri,
    name: 'capturas_greening.zip',
    type: 'application/zip',
  } as any);

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const result = await response.text();
    console.log('Retornou: ', result);
  } catch (error) {
    console.error('Erro ao enviar o .zip:', error);
  }
};
