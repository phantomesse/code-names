import * as io from 'socket.io-client';
import { environment } from '../environments/environment';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CardModel from '../models/card-model';

@Injectable({
  providedIn: 'root'
})
export default class DataController {
  public socketIoScriptPath: string;
  private _socket;
  private _backendUrlPrefix: string;

  constructor(private http: HttpClient) {
    this._backendUrlPrefix = environment.production
      ? '/api/'
      : 'http://localhost:1338/api/';
    this.socketIoScriptPath = `${this._backendUrlPrefix}socket.io/socket.io.js`;
    this._socket = io(this._backendUrlPrefix);
  }

  getCards(sessionName: string): Promise<CardModel[]> {
    return new Promise((resolve, reject) => {
      this.http
        .get(this._backendUrlPrefix + 'get?sessionName=' + sessionName)
        .subscribe(
          (response: CardModel[]) => resolve(response),
          error => reject(error)
        );
    });
  }
}
