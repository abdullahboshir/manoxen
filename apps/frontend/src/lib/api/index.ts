import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react"; // Adjust based on actual auth lib

// Environment Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_BACKEND_BASE_API_URL ||
  "http://localhost:5000/api/v1";

// Standard API Response Wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class ApiGateway {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: API_BASE_URL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request Interceptor: Attach Token
    this.instance.interceptors.request.use(
      async (config) => {
        // Logic to get token from storage/session
        // const session = await getSession();
        // if (session?.accessToken) {
        //   config.headers.Authorization = `Bearer ${session.accessToken}`;
        // }

        // Temporary: Check localStorage for legacy support
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("accessToken");
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }

        return config;
      },
      (error) => Promise.reject(error),
    );

    // Response Interceptor: Error Handling
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error) => {
        // Centralized Error Logging / Toast could go here
        if (error.response?.status === 401) {
          // Handle Unauthorized (Redirect to login)
          if (typeof window !== "undefined") {
            // window.location.href = '/auth/login';
          }
        }
        return Promise.reject(error);
      },
    );
  }

  // Allow raw instance access for RTK Query baseQuery
  public getInstance(): AxiosInstance {
    return this.instance;
  }

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.post<ApiResponse<T>>(
      url,
      data,
      config,
    );
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  public async delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<ApiResponse<T>> {
    const response = await this.instance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }
}

export const api = new ApiGateway();
