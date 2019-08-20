import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';
import { DevicewiseApiService } from './devicewise-api.service';
import { DevicewiseSubscribeService } from './devicewise-subscribe.service';
import { DevicewiseMultisubscribeService } from './devicewise-multisubscribe.service';
import * as DwResponse from './models/dwresponse';

@Injectable({
  providedIn: 'root'
})
export class DevicewiseAngularService {
  private url = 'http://localhost:88';
  private loggedIn = false;

  constructor(
    private cookieService: CookieService,
    private api: DevicewiseApiService,
    private subscribe: DevicewiseSubscribeService,
    private multisubscribe: DevicewiseMultisubscribeService
  ) {
  }

  setEndpoint(endpoint: string): void {
    this.url = endpoint;
    this.api.setEndpoint(endpoint);
    this.subscribe.setEndpoint(endpoint);
    this.multisubscribe.setEndpoint(endpoint);
  }

  getEndpoint(): string {
    return this.url;
  }

  setLoginStatus(status: boolean) {
    this.loggedIn = status;
  }

  getLoginStatus(): boolean {
    return this.loggedIn;
  }

  easyLogin(endpoint: string, username: string, password: string): Observable<DwResponse.Login> {
    const loginSubject: Subject<DwResponse.Login> = new Subject();

    this.setEndpoint(endpoint);
    this.api.ping('localhost', 4).subscribe((ping) => {
      if (ping.success) {
        this.setLoginStatus(true);
        this.subscribe.unsubscribeAll();
        loginSubject.next({ success: true, sessionId: this.cookieService.get('sessionId'), roles: [''], requirePasswordChange: false });
      } else {
        this.api.login(endpoint, username, password).subscribe((login) => {
          if (login.success) {
            this.setLoginStatus(true);
            this.cookieService.deleteAll();
            this.cookieService.set('sessionId', login.sessionId);
            this.subscribe.unsubscribeAll();
          }
          loginSubject.next(login);
          loginSubject.complete();
        }, (error) => {
          loginSubject.next({ success: false, sessionId: '', roles: [''], requirePasswordChange: false });
        });
      }
    }, (error) => {
      this.api.login(endpoint, username, password).subscribe((login) => {
        if (login.success) {
          this.setLoginStatus(true);
          this.cookieService.deleteAll();
          this.cookieService.set('sessionId', login.sessionId);
          this.subscribe.unsubscribeAll();
        }
        loginSubject.next(login);
        loginSubject.complete();
      }, (error2) => {
        loginSubject.next({ success: false, sessionId: '', roles: [''], requirePasswordChange: false });
      });
    });

    return loginSubject.asObservable();
  }

  logout(): Observable<DwResponse.Logout> {
    return this.api.logout().pipe(
      tap((response) => {
        if (response.success) {
          this.cookieService.delete('sessionId');
        }
      }));
  }
}
