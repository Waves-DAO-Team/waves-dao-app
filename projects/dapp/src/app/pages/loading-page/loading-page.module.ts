import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { LoadingPageComponent } from './loading-page.component'
import { TranslocoModule } from '@ngneat/transloco'

@NgModule({
  declarations: [LoadingPageComponent],
  imports: [
    CommonModule,
    TranslocoModule
  ],
  exports: [
    LoadingPageComponent
  ]
})
export class LoadingPageModule { }
