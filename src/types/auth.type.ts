export interface IAuth{
    tokens: {
        access_token: string;
        refresh_token: string;
    }| null;
}