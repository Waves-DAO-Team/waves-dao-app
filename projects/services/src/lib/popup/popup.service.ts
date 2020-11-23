import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs'
import { delay, tap } from 'rxjs/operators'
import { AddTextInterface, AddTextObjInterface } from '@services/popup/popup.interface'

class IInvokeScriptTransaction<T> {
}

class IWithApiMixin {
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  message$ = new BehaviorSubject<string[]>([])

  constructor () {
  }

  public async add (text: string, title?: string) {
    const message = text.slice(0, 50) + (text.length > 50 ? '...' : '')
    if (message.length > 5) {
      this.message$.next([...this.message$.getValue(), message])
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
