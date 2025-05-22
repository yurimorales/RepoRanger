export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
}

export interface Post {
    id: number;
    title: string;
    content: string;
    authorId: number;
}

export interface Comment {
    id: number;
    postId: number;
    content: string;
    authorId: number;
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}