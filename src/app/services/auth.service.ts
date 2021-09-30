import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UsuarioModel} from '../models/usuario.model';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apikey = 'AIzaSyAr2R7QX64PQ_jMxZ2KXP3ygk-k8z2nFiI';

  userToken: string;

  // EndPoint: Registro
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // EndPoint: Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
  }

  nuevoUsuario(usuario: UsuarioModel) {
    const datos = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signUp?key=${this.apikey}`,
      datos
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  login(usuario: UsuarioModel) {
    const datos = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}:signInWithPassword?key=${this.apikey}`,
      datos
    ).pipe(
      map(resp => {
        this.guardarToken(resp['idToken']);
        return resp;
      })
    );
  }

  logout() {

  }

  private guardarToken(token: string) {
    this.userToken = token;
    localStorage.setItem('token', token);
  }

  leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }
}
