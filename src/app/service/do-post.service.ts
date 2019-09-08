import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITableMeta } from '../modal/table-meta';
import { IAppResponseModal } from '../modal/app-response-modal';

@Injectable({
  providedIn: 'root'
})
export class DoPostService {
  hostUrl = 'http://localhost:9786/compareTableMetaData';

  constructor(private http: HttpClient) {}

  validatehelloWorld() {
    return this.http.get<string>('http://localhost:9786/helloworld')
                .subscribe(response => console.log(response));
  }

  validateTableMetadata(tableObject: ITableMeta) {
    console.log(JSON.stringify(tableObject));
    const  headers = new  HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<IAppResponseModal>(this.hostUrl, JSON.stringify(tableObject), {headers})
                    .subscribe((response: IAppResponseModal) => console.log(response.outputList[1]));
  }
}
