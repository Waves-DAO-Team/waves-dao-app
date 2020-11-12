import { CanActivate, Router } from '@angular/router'
import { Injectable } from '@angular/core'
import { UserService } from '@services/user/user.service'
import { RoleEnum } from '@services/user/user.interface'

@Injectable()
export class ApplyGrantPageGuard
implements CanActivate {
  constructor (private userService: UserService, public router: Router) {}

  canActivate (): boolean {
    if (this.userService.data.getValue().userRole !== RoleEnum.unauthorized) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }
  }
}
