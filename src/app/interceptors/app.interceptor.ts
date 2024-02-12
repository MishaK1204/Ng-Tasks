import {HttpInterceptorFn} from '@angular/common/http';

const authToken = 'c6b5ac88f7msh192c3d2e63a0e92p17799djsn375994122d42';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const request = req.clone({
    headers: req.headers.set('X-RapidAPI-Key', authToken)
  })
  return next(request);
};
