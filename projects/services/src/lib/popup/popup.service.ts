import { Injectable } from '@angular/core'
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs'
import { delay, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  message$ = new BehaviorSubject<string[]>([])

  constructor () {}

  public async add (text: string, title?: string) {
    this.message$.next([...this.message$.getValue(), text.toString()])
    console.log(`---------------------------------------------------------LOG ${title || ''}`)
    console.log(text)
    console.log(`---------------------------------------------------------LOG ${title || ''}`)
    setTimeout(() => {
      this.rmLast()
    }, 5000)
  }

  rmLast () {
    this.message$.next(this.message$.getValue().slice(0, -1))
  }

  rm (text: string) {
    const roomArr: string[] = this.message$.getValue()
    roomArr.forEach((item, index) => {
      if (item === text) { roomArr.splice(index, 1) }
    })
    this.message$.next(roomArr)
  }
}
