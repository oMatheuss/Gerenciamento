import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";
import { ActivitiesStatus } from "../Types/ApiTypes";

class Api {
    public axios: AxiosInstance;
    private apiKey: string = "";
    constructor() {
        this.axios = axios.create({
            timeout: 5000,
        });

        const tokenInterceptor = (config: AxiosRequestConfig) => {
            if (!this.apiKey) {
                this.apiKey = localStorage.getItem("apiKey") as string;
            }
            if (config.headers && this.apiKey)
                config.headers.Authorization = this.apiKey;
            return config;
        }
        tokenInterceptor.bind(this);

        this.axios.interceptors.request.use(tokenInterceptor,
            (error) => Promise.reject(error),
        );

        this.login = this.login.bind(this);
        this.setApiKey = this.setApiKey.bind(this);
        this.getUser = this.getUser.bind(this);
        this.getActivities = this.getActivities.bind(this);
    }

    public login(email: string, password: string) {
        return this.axios.post("/api/login", { email, password });
    }

    public setApiKey(token: string) {
        this.apiKey = `Bearer ${token}`;
        localStorage.setItem("apiKey", this.apiKey);
        this.axios.defaults.headers["Authorization"] = this.apiKey;
    }

    public async getUser() {
        let ret = await this.axios.get("/api/User");
        return ret.data;
    }

    public async getActivities() {
        let ret = await this.axios.get("/api/User/Activities");
        return ret.data;
    }

    public async getActivityUsers(activityId: number) {
        let ret = await this.axios.get("/api/Activity/Users", {
            params: { activityId }
        });
        return ret.data;
    }

    public async getActivitiesStatus() {
        let ret = await this.axios.get("/api/User/ActivitiesStatus");
        return ret.data as ActivitiesStatus;
    }

    public async signup(name: string, email: string, password: string) {
        return this.axios.post("/api/SignUp", { name, email, password });
    }

    public async addUserToActivity(email: string) {
        return this.axios.post("/api/Activity/User", { email });
    }

    public async deleteActivity(id: number) {
        return this.axios.delete("/api/Activity", {
            params: { id }
        });
    }

    public async setActivityStatus(activityId: number, status: number) {
        return this.axios.put("/api/Activity/Status", { activityId, status });
    }
}

const ApiInstance = new Api();

const useLogin = (onError: (message : string) => void) => {
    const [onLoad, setOnLoad] = useState(false);
    const [isLogged, setLogged] = useState(false);
    const [response, setResponse] = useState<AxiosResponse | null>(null);

    const login = (email: string, password: string) => {
        setOnLoad(true);

        ApiInstance.login(email, password).then(response => {
            setResponse(response);
            ApiInstance.setApiKey(response.data);
            setLogged(true);
        }).catch(e => {
            onError(e?.response?.data || "Erro na resposta da api");
        }).finally(() => {
            setOnLoad(false);
        });
    }

    return [login, onLoad, isLogged, response] as const;
}

const useSignUp = (onError: (message: string) => void) => {
    const [onLoad, setOnLoad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);

    const signup = (name: string, email: string, password: string) => {
        setOnLoad(true);

        ApiInstance.signup(name, email, password).then(response => {
            ApiInstance.setApiKey(response.data);
            setSuccess(true);
        }).catch(e => {
            onError(e?.response?.data || "Erro na resposta da api");
        }).finally(() => {
            setOnLoad(false);
        });
    }

    return [signup, onLoad, isSuccess] as const;
}

const useEndpoint = (onError: (message: string) => void) => {
    const [onLoad, setOnLoad] = useState(false);
    const [isSuccess, setSuccess] = useState(false);
    const [response, setResponse] = useState<AxiosResponse | null>(null);

    const call = (url: string, method: string, params: object) => {
        setOnLoad(true);

        if (method === "POST") {
            ApiInstance.axios.post(url, params).then(response => {
                setResponse(response.data);
                setSuccess(true);
            }).catch(e => {
                onError(e?.response?.data || "Erro na resposta da api");
            }).finally(() => {
                setOnLoad(false);
            });
        } else if (method === "GET") {
            ApiInstance.axios.get(url, {
                params: params,
            }).then(response => {
                setResponse(response.data);
                setSuccess(true);
            }).catch(e => {
                onError(e?.response?.data || "Erro na resposta da api");
            }).finally(() => {
                setOnLoad(false);
            });
        }
    }

    const reset = () => {
        setResponse(null);
        setSuccess(false);
        setOnLoad(false);
    }

    return [call, response, onLoad, isSuccess, reset] as const;
}

export { useLogin, useSignUp, useEndpoint, ApiInstance as Api };