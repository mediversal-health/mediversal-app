import axios, {AxiosResponse} from 'axios';
import {API_URL} from '@env';

const IP_ADDR = API_URL;

interface FileObject {
  uri: string;
  type?: string;
  name?: string;
}

interface UploadResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const uploadPrescriptions = async (
  customerId: string,
  files: FileObject | FileObject[],
): Promise<AxiosResponse<UploadResponse>> => {
  const formData = new FormData();

  formData.append('Customer_id', customerId);

  if (Array.isArray(files)) {
    files.forEach((file: FileObject, index: number) => {
      const fileType: string =
        file.type ||
        (file.uri.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

      const fileName: string =
        file.name ||
        (fileType === 'application/pdf'
          ? `document_${index}.pdf`
          : `image_${index}.jpg`);

      formData.append('images', {
        uri: file.uri,
        type: fileType,
        name: fileName,
      } as any);
    });
  } else if (files) {
    const fileType: string =
      files.type ||
      (files.uri.endsWith('.pdf') ? 'application/pdf' : 'image/jpeg');

    const fileName: string =
      files.name ||
      (fileType === 'application/pdf' ? 'document.pdf' : 'image.jpg');

    formData.append('images', {
      uri: files.uri,
      type: fileType,
      name: fileName,
    } as any);
  }

  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return axios.post<UploadResponse>(
    `${IP_ADDR}/api/prescription/Prescriptionimages`,
    formData,
    config,
  );
};
export const getPrescriptions = async (customer_id: any) => {
  return axios.get(
    `${IP_ADDR}/api/prescription/getPrescription/${customer_id}`,
  );
};
