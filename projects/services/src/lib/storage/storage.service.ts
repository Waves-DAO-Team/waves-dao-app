import { Inject, Injectable } from '@angular/core'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private currentContractAddress = this.constants.production
    ? 'ZwPjcEZtNHD9TRVUUiyR'
    : 'contactAddress';

  private userDataSession = this.constants.production
    ? 'ZwPjcakdaYYHJ73snb'
    : 'userData';

  private localStorage: { [s: string]: string } = {};
  private sessionStorage: { [s: string]: string } = {};

  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface
  ) {}

  // Storage
  private getLocal (name: string): string | null {
    const value =
        this.localStorage[name] || window.localStorage.getItem(name) || null
    if (value) {
      return (this.localStorage[name] = value)
    }
    return null
  }

  // SetLocal
  private setLocal (name: string, value: string): void {
    this.localStorage[name] = value
    window.localStorage.setItem(name, value)
  }

  public deleteLocal (name: string): void {
    if (this.getLocal(name)) {
      delete this.localStorage[name]
      window.localStorage.removeItem(name)
    }
  }

  // Session
  private getSession (name: string): string | null {
    const value =
        this.sessionStorage[name] || window.sessionStorage.getItem(name) || null
    if (value) {
      return (this.sessionStorage[name] = value)
    }
    return null
  }

  private setSession (name: string, value: string): void {
    this.sessionStorage[name] = value
    window.sessionStorage.setItem(name, value)
  }

  private deleteSession (name: string): void {
    if (this.getSession(name)) {
      delete this.sessionStorage[name]
      window.sessionStorage.removeItem(name)
    }
  }

  // Access token
  public get contactAddress (): string | null {
    return this.getLocal(this.currentContractAddress)
  }

  public set contactAddress (value: string | null) {
    if (!value) {
      this.deleteLocal(this.currentContractAddress)
      return
    }

    this.setLocal(this.currentContractAddress, value)
  }

  // Access token
  public get userData (): object | null {
    const data = this.getSession(this.userDataSession)
    if (data) {
      return JSON.parse(data)
    }

    return null
  }

  public set userData (value: object | null) {
    if (!value) {
      this.deleteSession(this.userDataSession)
      return
    }

    this.setSession(this.userDataSession, JSON.stringify(value))
  }
}
