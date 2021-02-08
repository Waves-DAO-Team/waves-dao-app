import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { VotingSquareComponent } from './voting-square.component'
import {TranslocoModule} from '@ngneat/transloco'



@NgModule({
  declarations: [VotingSquareComponent],
    imports: [
        CommonModule,
        TranslocoModule
    ],
  exports: [VotingSquareComponent]
})
export class VotingSquareModule { }
