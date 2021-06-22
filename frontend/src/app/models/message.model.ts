export class Message {
    picture?: string;
    text?: string;
    update?: string;
    usersLiked?: number[];
    usersDisliked?: number[];
    constructor(
        public id: number, 
        public profile_id: number,
        public create: string,
    ) {}
}
