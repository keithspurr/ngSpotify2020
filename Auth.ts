export class Auth  {
        access_token: string;
        token_type: string;
        expires_in: number;
        scope: string;



    constructor() {
        this.access_token = null;
        this.token_type = null;
        this.expires_in = null;
        this.scope = null;
    }
}
