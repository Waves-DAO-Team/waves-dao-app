import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private readonly message$ = new BehaviorSubject<string[]>([])

  public async add (text: string, title?: string) {
    if (text && text.length > 5) {
      const message = text.slice(0, 50) + (text.length > 50 ? '...' : '')
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
