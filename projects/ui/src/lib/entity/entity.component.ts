import {Component, Input, OnInit, ViewChild} from '@angular/core'
import { ContractGrantModel } from '@services/contract/contract.model'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'
import { GrantStatusEnum } from '../../../../services/src/interface'
import {ModalComponent} from "@ui/modal/modal.component";

@Component({
  selector: 'ui-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.scss']
})
export class EntityComponent implements OnInit {

  @Input() grant: ContractGrantModel = {}
  grantStatusEnum = GrantStatusEnum
  userRoleEnum = RoleEnum
  isDAOVote = false
  @ViewChild(ModalComponent) modal?: ModalComponent

  constructor (public userService: UserService) {}

  ngOnInit (): void {

  }

  vote () {
    this.isDAOVote = true
  }

}
