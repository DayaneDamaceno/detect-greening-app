import { Buffer } from 'buffer';
import * as FileSystem from 'expo-file-system';

global.Buffer = Buffer;

const API_URL = 'INFORME O LINK';

const EnviarZipNuvem = async () => {
  
    const fileUri = FileSystem.documentDirectory + 'capturas_greening.zip';

    const fileInfo = await FileSystem.getInfoAsync(fileUri);
    if (!fileInfo.exists) {
      console.error('Arquivo ZIP não encontrado:', fileUri);
      return;
    }

    const fileContent = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const response = await fetch(API_URL, {
      method: 'PUT',
      headers: {
        'x-ms-blob-type': 'BlockBlob',
        'Content-Type': 'application/zip',
      },
      body: Buffer.from(fileContent, 'base64'),
    });

    if (response.ok) {
      console.log('Upload realizado com sucesso');
    } else {
      const errorText = await response.text();
      console.error('Erro no upload:', errorText);
    }
};

export default { EnviarZipNuvem };
