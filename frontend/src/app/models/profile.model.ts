export class Profile {
    photo?: string;
    nom?: string;
    prenom?: string;
    bio?: string;
    constructor(public email: string, public password: string) {}
}
