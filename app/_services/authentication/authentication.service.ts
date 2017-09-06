import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { UrlConfig } from '../../_config/index';

@Injectable()
export class AuthenticationService {
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http) { }

    // login by email and storage token recieve form backend to browsers
    login(email: string, password: string) {
        let contentHeaders = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(UrlConfig.API_URL+'authenticate', JSON.stringify({ email: email, password: password }), {headers: this.headers})
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            });
    }

    // logout by delete token
    logout() {
        localStorage.removeItem('currentUser');
    }
}