export interface Profile {
    id: number;
    photo: string;
    nom: string;
    prenom: string;
    bio: string;
    email: string, 
    password: string;
    is_admin: boolean;
}
