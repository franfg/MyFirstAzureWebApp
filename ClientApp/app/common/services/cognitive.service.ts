import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AzureHttpClient } from './azureHttpClient';
import { BingSearchResponse } from '../models/bingSearchResponse';
import { ComputerVisionRequest, ComputerVisionResponse } from '../models/computerVisionResponse';
import { FaceRecogRequest, FaceRecogResponse } from '../models/faceRecogResponse';

@Injectable()
export class CognitiveService {
    bingSearchAPIKey = '0c52d60f2f5143d7ad5de2c84abaf400';
    computerVisionAPIKey = '1e9a08051aa045f78b0698e675d9bcd6';
    facesVisionAPIKey = 'b2c2155c84d344e9aa8c3fc737ebe446';

    constructor(private http: AzureHttpClient) { }

    searchImages(searchTerm: string): Observable<BingSearchResponse> {
        return this.http.get('https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=$'+searchTerm, this.bingSearchAPIKey)
            .map(response => response.json() as BingSearchResponse)
            .catch(this.handleError);
    }

    analyzeImage(request: ComputerVisionRequest): Observable<ComputerVisionResponse> {
        return this.http.post('https://eastus2.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Description,Tags', this.computerVisionAPIKey, request)
            .map(response => response.json() as ComputerVisionResponse)
            .catch(this.handleError);
    }

    analyzeFaces(request: FaceRecogRequest): Observable<FaceRecogResponse> {
        return this.http.post('https://eastus2.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId=true&returnFaceLandmarks=false&returnFaceAttributes=age,gender', this.facesVisionAPIKey, request)
            .map(response => response.json() as FaceRecogResponse)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}