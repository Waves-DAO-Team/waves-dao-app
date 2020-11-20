import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs'
import { delay, tap } from 'rxjs/operators'
import { AddTextInterface, AddTextObjInterface } from '@services/popup/popup.interface'

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  message$ = new BehaviorSubject<string[]>([])

  constructor () {
  }

  public async add (text: AddTextObjInterface, title?: string) {
    let JSONtext
    if (text?.message) {
      JSONtext = JSON.stringify(text.message).slice(0, 50) + (text.message.length > 50 ? '...' : '')
    } else if (text) {
      JSONtext = JSON.stringify(text).slice(0, 50) + ((text as unknown as string).length > 50 ? '...' : '')
    }
    if (text && JSONtext && JSONtext.length > 5) {
      this.message$.next([...this.message$.getValue(), JSONtext])
      console.log(`---------------------------------------------------------LOG ${title || ''}`)
      console.log(text)
      console.log(`---------------------------------------------------------LOG ${title || ''}`)
      setTimeout(() => {
        this.rmLast()
      }, 5000)
    }
  }

  rmLast () {
    this.message$.next(this.message$.getValue().slice(0, -1))
  }

  rm (text: string) {
    const roomArr: string[] = this.message$.getValue()
    roomArr.forEach((item, index) => {
      if (item === text) {
        roomArr.splice(index, 1)
      }
    })
    this.message$.next(roomArr)
  }
}
