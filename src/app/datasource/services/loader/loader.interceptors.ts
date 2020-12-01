import { Injectable } from '@angular/core';
import {
    HttpResponse,
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoaderService } from './loader.service';
import { Router } from '@angular/router';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    private requests: HttpRequest<any>[] = [];
    constructor(private loaderService: LoaderService, private router: Router) { }

    removeRequest(req: HttpRequest<any>) {
        const i = this.requests.indexOf(req);
        if (i >= 0) {
            this.requests.splice(i, 1);
        }
        this.loaderService.isLoading.next(this.requests.length > 0);
    }

    public getToken() {
        const vToken = localStorage.getItem('token');
        return vToken;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //----Begin set Auth token to HTTP header
        const vToken = this.getToken() || false;
        if(vToken) {
            req = req.clone({ 
                setHeaders: { "auth-token": this.getToken() } 
            });
        }
        //----End set Auth token to HTTP header
        this.requests.push(req);
        this.loaderService.isLoading.next(true);
        return Observable.create(observer => {
            const subscription = next.handle(req)
                .subscribe(
                    event => {
                        if (event instanceof HttpResponse) {
                            this.removeRequest(req);
                            observer.next(event);
                            next.handle(req)
                        }
                    },
                    err => {
                        if(err.status == 401 && err.error.status == false){
                            this.removeRequest(req);
                            observer.complete();
                            localStorage.removeItem('token');
                            this.router.navigate(['/user/signin']);
                        }else if(err.status == 400 && err.error.status == false){
                            alert(err.error.result);
                            localStorage.removeItem('token');
                            this.router.navigate(['/user/signin']);
                        } else {
                            if(err.error.detail){
                                alert(err.error.detail);                                
                            }else{
                                alert(err.error);
                            }
                            observer.error(err);
                        }
                    },
                    () => {
                        this.removeRequest(req);
                        observer.complete();
                    });
            // remove request from queue when cancelled
            return () => {
                this.removeRequest(req);
                subscription.unsubscribe();
            };
        });
    }
}