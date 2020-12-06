import { Component, Inject, OnInit } from '@angular/core'
import { APP_CONSTANTS, AppConstantsInterface } from '@constants'
import { ActivatedRoute } from '@angular/router'
import { map } from 'rxjs/operators'

@Component({
  selector: 'ui-contract-menu',
  templateUrl: './contract-menu.component.html',
  styleUrls: ['./contract-menu.component.scss']
})
export class ContractMenuComponent implements OnInit {
  public readonly contractType = this.route.params.pipe(map(({ contractType }) => {
    return contractType
  }));

  constructor (
      @Inject(APP_CONSTANTS) public readonly constants: AppConstantsInterface,
      private route: ActivatedRoute
  ) { }

  ngOnInit (): void {}
}
