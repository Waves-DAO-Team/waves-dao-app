import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProposalComponent } from './add-proposal.component';
import {ReactiveFormsModule} from "@angular/forms";
import {TranslocoModule} from "@ngneat/transloco";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";



@NgModule({
  declarations: [AddProposalComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    CommonModule,
    ReactiveFormsModule,
    TranslocoModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [AddProposalComponent]
})
export class AddProposalModule { }
