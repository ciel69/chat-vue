export interface ApolloHelpers {
    onLogout(): void;
    onLogin(token: string|number): void;
    getToken(): string;
}
