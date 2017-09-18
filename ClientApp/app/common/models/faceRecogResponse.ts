export interface FaceRecogRequest {
    url: string;
}
export interface FaceRecogResponse {
    faceAttributes: Array<{
        age: number;
        gender: string;
    }>;
    faceId: string;
}