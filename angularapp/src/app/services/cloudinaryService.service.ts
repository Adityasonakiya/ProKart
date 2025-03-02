import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dhxeijcdi/image/upload'; // Replace with your Cloudinary details
  private uploadPreset = 'Gladiator_preset'; // Replace with your upload preset

  constructor(private http: HttpClient) {}

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post<any>(this.cloudinaryUrl, formData);
  }
}
