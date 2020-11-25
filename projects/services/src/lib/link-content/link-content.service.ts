import { Injectable } from '@angular/core';
import {PopupService} from "@services/popup/popup.service";
import {LinkContentDataInterface, ReposResponseInterface} from "@services/link-content/link-content.interface";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {ContractRawData} from "@services/contract/contract.model";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LinkContentService {

  bodyMd = new Subject()
  lastUr = ''

  data: LinkContentDataInterface =  {
    response: null,
    apiUrl: "",
    url: null,
    isGitHub: false,
    isGitHubIssues: false
  }

  constructor(private popupService: PopupService, private readonly http: HttpClient) { }

  public init(url: string): void {
    if(this.lastUr != url){
      if(this.validURL(url)) {
        this.reset()
        this.data.url = new URL(url)
        this.parseGitHub(this.data.url.host, this.data.url.pathname)
        console.log('LinkContentService init(url)', this.data)
      } else {
        this.popupService.add('url is not valid', 'LinkContentService init')
      }
      this.lastUr = url
    }
  }

  private parseGitHub(url: string, pathname: string): void {
    this.data.isGitHub = url.includes('github.com')
    if(this.data.isGitHub) {
      this.data.isGitHubIssues = pathname.toLowerCase().includes('issues')
      if(this.data.isGitHubIssues && this.data.url?.pathname) {
        this.data.apiUrl = `https://api.github.com/repos${this.data.url?.pathname}`
        this.http.get<ReposResponseInterface>(this.data.apiUrl, {
          headers: { accept: 'application/json; charset=utf-8' }
        }).subscribe((e: ReposResponseInterface)=>{
          this.data.response = e
          this.bodyMd.next(e.body)
        })
      }
    }
  }

  private reset() {
    this.data = {
      response: null,
      apiUrl: "",
      url: null,
      isGitHub: false,
      isGitHubIssues: false
    }
  }

  private validURL(str: string) {
    let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

}
