import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class RecognizeApiService {

    constructor(private http: HttpClient) {
    }

    recognize(file: File): Observable<{success: boolean, chords: string[]}> {
        const formData = new FormData();

        formData.append('file', new Blob([file]));

        return this.http.post<{success: boolean, chords: string[]}>('/api/v1/recognize', formData);
    }
}
