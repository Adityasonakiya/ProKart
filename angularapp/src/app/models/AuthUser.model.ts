export class AuthUser {
    constructor(public username: string,
        public token: string,
        public role: string,
        public userId: number,
        public email: string) { }
}