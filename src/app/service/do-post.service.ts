import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAppModal } from '../modal/app-modal';

@Injectable({
  providedIn: 'root'
})
export class DoPostService {
  constructor(private http: HttpClient) {  }

  getTableMetaData(appObject: IAppModal) {
    console.log(appObject);
  }

  getAllPostData(): Observable<IAppModal[]> {
    return this.http.get<IAppModal[]>(AppConstants.doPostUrl);
  }

  createPost(newPost: IAppModal): Observable<IAppModal> {
    return this.http.post<IAppModal>(AppConstants.doPostUrl, JSON.stringify(newPost));
  }

  updatePost(post: IAppModal): Observable<IAppModal> {
    return this.http.post<IAppModal>(AppConstants.doPostUrl + '/' + post.id, JSON.stringify(post));
  }

  deletePost(post: IAppModal) {
    return this.http.delete(AppConstants.doPostUrl + '/' + post.id);
  }
}
