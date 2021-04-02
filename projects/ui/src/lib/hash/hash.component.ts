import {Component, Input, OnInit} from '@angular/core'
import {BehaviorSubject, combineLatest, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {HashService} from "@services/hash/hash.service";


@Component({
  selector: 'ui-hash',
  templateUrl: './hash.component.html',
  styleUrls: ['./hash.component.scss']
})
export class HashComponent {

  private link$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  private hash$: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null)
  public validation$: BehaviorSubject<boolean | null> = new BehaviorSubject<boolean | null>(null)

  public linkStatus$: Observable<'checked' | 'changed' | 'notVerified' | 'notGitHub'> = combineLatest(
    [this.link$, this.hash$, this.validation$]
  )
    .pipe(
      map(([link, hash, validation]) => {
        if(!link || !hash){
          return 'notGitHub'
        }
        else {
          if (validation === null)
            return 'notVerified'
          else
            return validation ? 'checked' : 'changed'
        }
      })
    )

  @Input() text: string | null = null
  @Input() set link(link: string | null) {
    this.link$.next(link)
  }

  @Input() set hash(hash: string | null) {
    this.hash$.next(hash)
  }

  constructor(public hashService: HashService) {
  }

  public verify(){

    const link = this.link$.getValue()
    const hash = this.hash$.getValue()

    if (link && hash) {
      this.hashService.isHashValid(hash, link).then( res => {
        if (typeof res === "boolean") {
          this.validation$.next(res)
        } else {
          this.validation$.next(false)
        }
      })
    }

  }

}
