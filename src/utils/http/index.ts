import Axios, {
  type AxiosInstance,
  type AxiosError,
  type AxiosResponse,
  type AxiosRequestConfig
} from "axios";
import { ContentTypeEnum, ResultEnum } from "@/enums/requestEnum";
import NProgress from "../progress";
import { showFailToast } from "vant";
import "vant/es/toast/style";

// Configuración por defecto para las solicitudes de Axios
const configDefault = {
  headers: {
    "Content-Type": ContentTypeEnum.FORM_URLENCODED,
    "x-rapidapi-host": import.meta.env.VITE_RAPIDAPI_HOST,
    "x-rapidapi-key": import.meta.env.VITE_RAPIDAPI_KEY,
  },
  timeout: 0,
  baseURL: import.meta.env.VITE_BASE_API,
  data: {}
};

class Http {
  // Instancia actual de Axios
  private static axiosInstance: AxiosInstance;
  // Configuración por defecto de las solicitudes
  private static axiosConfigDefault: AxiosRequestConfig;

  // Interceptores de solicitud
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      config => {
        NProgress.start();
        // Antes de enviar la solicitud, puede incluirse un token aquí
        // if (token) {
        //   config.headers['token'] = token
        // }
        return config;
      },
      (error: AxiosError) => {
        showFailToast(error.message);
        return Promise.reject(error);
      }
    );
  }

  // Interceptores de respuesta
  private httpInterceptorsResponse(): void {
    Http.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        NProgress.done();
        // Campos de respuesta acordados con el backend
        const { code, result } = response.data;
        // const { message } = response.data;
        // Verificar si la solicitud fue exitosa
        const isSuccess =
          result &&
          Reflect.has(response.data, "code") &&
          code === ResultEnum.SUCCESS;
        if (isSuccess) {
          return result;
        } else {
          // Manejar errores de solicitud
          // showFailToast(message);
          return Promise.reject(response.data);
        }
      },
      (error: AxiosError) => {
        NProgress.done();
        // Manejar errores de red HTTP
        let message = "";
        // Código de estado HTTP
        const status = error.response?.status;
        switch (status) {
          case 400:
            message = "Solicitud incorrecta";
            break;
          case 401:
            message = "No autorizado, por favor inicie sesión";
            break;
          case 403:
            message = "Acceso denegado";
            break;
          case 404:
            message = `Dirección de solicitud incorrecta: ${error.response?.config?.url}`;
            break;
          case 408:
            message = "Tiempo de espera agotado";
            break;
          case 500:
            message = "Error interno del servidor";
            break;
          case 501:
            message = "Servicio no implementado";
            break;
          case 502:
            message = "Error de puerta de enlace";
            break;
          case 503:
            message = "Servicio no disponible";
            break;
          case 504:
            message = "Tiempo de espera de la puerta de enlace agotado";
            break;
          case 505:
            message = "Versión HTTP no soportada";
            break;
          default:
            message = "Falla de conexión de red";
        }

        showFailToast(message);
        return Promise.reject(error);
      }
    );
  }

  constructor(config: AxiosRequestConfig) {
    Http.axiosConfigDefault = config;
    Http.axiosInstance = Axios.create(config);
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  // Función de solicitud genérica
  public request<T>(paramConfig: AxiosRequestConfig): Promise<T> {
    const config = { ...Http.axiosConfigDefault, ...paramConfig };
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
}

export const http = new Http(configDefault);
