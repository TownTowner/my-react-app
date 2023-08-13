interface BaseResponse {
    success: boolean;
    message: string;
    errors: string[];
}

interface CommonResponse extends BaseResponse {
    data: any;
}

interface AuthResponse extends BaseResponse {
    token: string;
}

export type { BaseResponse, CommonResponse, AuthResponse }