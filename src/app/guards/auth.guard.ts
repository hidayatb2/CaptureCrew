import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  let AccService = inject(AccountService);
  let res = AccService.isUserAuthenticated();
  console.log(res)
  return res;
};
