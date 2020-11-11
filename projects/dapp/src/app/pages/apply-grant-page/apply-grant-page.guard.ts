import {UserService} from "@services/user/user.service";
import {RoleEnum} from "@services/user/user.interface";
import {Inject, Injectable} from "@angular/core";
import {Router} from "@angular/router";

@Injectable()
export class ApplyGrantPageGuard implements CanActivate {

  constructor(@Inject(UserService) private userService: UserService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.userService.userData.getValue().userRole != RoleEnum.unauthorized) {
      return true
    } else {
      this.router.navigate(['/'])
      return false
    }

  }
}
