export class Message {
    picture?: string;
    text?: string;
    update?: string;
    usersLiked?: number[];
    usersDisliked?: number[];
    likes?: number;     // calculé lors de la requête
    dislikes?: number;  // calculé lors de la requête
    comments?: number;  // nombre de commentaires, calculé lors de la requête
    constructor(
        public id: number, 
        public create: string,

        public profile_id: number,
        public profile_prenom: string,
        public profile_nom: string,
        public profile_photo: string
    ) {}
}

export interface Message_post {
    file?: File;
    article?: string;
    user_id: number;
}
