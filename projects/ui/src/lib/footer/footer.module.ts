import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FooterComponent } from './footer.component'
import {TranslocoModule} from "@ngneat/transloco";

@NgModule({
  declarations: [FooterComponent],
    imports: [
        CommonModule,
        TranslocoModule
    ],
  exports: [FooterComponent]
})
export class FooterModule { }
