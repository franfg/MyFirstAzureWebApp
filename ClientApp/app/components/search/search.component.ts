import { Component } from '@angular/core';
import { CognitiveService } from '../../common/services/cognitive.service';
import { ImageResult } from '../../common/models/bingSearchResponse';
import { ComputerVisionRequest, ComputerVisionResponse } from '../../common/models/computerVisionResponse';
import { FaceRecogRequest, FaceRecogResponse } from '../../common/models/faceRecogResponse';

 @Component({
     selector: 'search',
     templateUrl: './search.component.html',
     styleUrls: ['./search.component.css']
 })

 export class SearchComponent {
    searchResults: ImageResult[] | null;
    searchResultNum: number;
    isSearching = false;

    currentAnalytics: ComputerVisionResponse | null;
    currentItem: ImageResult | null;
    isAnalyzing = false;

    currentFaces: FaceRecogResponse | null;
    isAnalyzingFaces = false;

    constructor(private cognitiveService: CognitiveService) { };

    search(searchTerm: string) {
        this.searchResults = null;
        this.currentAnalytics = null;
        this.searchResultNum = 0;
        this.isSearching = true;
        this.cognitiveService.searchImages(searchTerm).subscribe(result => {
            this.searchResults = result.value;
            this.searchResultNum = result.totalEstimatedMatches;
            this.isSearching = false;
        });
    }

    analyze(result: ImageResult) {
        this.currentItem = result;
        this.currentAnalytics = null;
        this.isAnalyzing = true;
        this.isAnalyzingFaces = true;
        this.cognitiveService.analyzeImage({ url: result.thumbnailUrl } as ComputerVisionRequest).subscribe(result => {
            this.currentAnalytics = result;
            this.isAnalyzing = false;
        });

        this.cognitiveService.analyzeFaces({ url: result.thumbnailUrl } as FaceRecogRequest).subscribe(result => {
            this.currentFaces = result;
            this.isAnalyzingFaces = false;
        });

        window.scroll(0, 0);
    }
 }