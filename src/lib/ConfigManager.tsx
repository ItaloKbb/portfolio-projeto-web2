import configData from "../config/config.json";

class ConfigManager {
  private static instance: ConfigManager;
  private _url_api: string;
  private _url_data: string;
  private _isProducao: boolean;
  private _versao: string;
  private _datarelease: Date;

  private constructor() {
    this._url_api = configData.url_api;
    this._url_data = configData.url_data;
    this._isProducao = configData.isProducao;
    this._versao = configData.versao;
    this._datarelease = new Date(configData.datarelease);
  }

  // Getters
  get url_api(): string {
    return this._url_api;
  }

  get url_data(): string {
    return this._url_data;
  }

  get isProducao(): boolean {
    return this._isProducao;
  }

  get versao(): string {
    return this._versao;
  }

  get datarelease(): Date {
    return this._datarelease;
  }

  // Método estático para acessar a instância Singleton
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }
}

export default ConfigManager;