import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams
} from "@angular/common/http";
import { of } from "rxjs";
//import { Empresas } from "../models/Empresas";
import { Materias } from './materias';

@Injectable(
  {providedIn: "root"}
)

export class MateriasService {
  resourceUrl: string;
  constructor(private httpClient: HttpClient) { 
    this.resourceUrl = "https://pavii.ddns.net/api/Materias/";
  }

  get() {
    return this.httpClient.get(this.resourceUrl);
  }

  post(obj:Materias) {
    return this.httpClient.post(this.resourceUrl, obj);
  }

    put(Id: number, obj:Materias) {
    return this.httpClient.put(this.resourceUrl + Id, obj);
  }

}