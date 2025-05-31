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

  const filesArray = Array.isArray(files) ? files : [files];

  for (const file of filesArray) {
    const fileExtension = file.uri.split('.').pop()?.toLowerCase();

    const fileType =
      file.type || (fileExtension === 'pdf' ? 'application/pdf' : 'image/jpeg');

    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const fileName =
      file.name ||
      (fileType === 'application/pdf'
        ? `document_${timestamp}_${randomString}.pdf`
        : `image_${timestamp}_${randomString}.${fileExtension || 'jpg'}`);

    const fileObject = {
      uri: file.uri,
      type: fileType,
      name: fileName,
    };

    formData.append('images', fileObject as any);
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

export const deletePrescription = async (
  customer_id: any,
  prescription_id: any,
) => {
  return axios.delete(
    `${IP_ADDR}/api/prescription/deletePrescription/${customer_id}/${prescription_id} }`,
  );
};
