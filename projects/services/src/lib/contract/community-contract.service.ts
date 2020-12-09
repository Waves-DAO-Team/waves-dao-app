import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class CommunityContractService {

  public addTask(name: string, link: string): void {
    console.log('-CommunityContractService addTask()', name, link)
  }

}
