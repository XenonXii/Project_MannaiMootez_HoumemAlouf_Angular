import { Comment } from "./comment";

export interface Post {
    id:string;
    title:string;
    image:string;
    date:string;
    description:string;
    location:string;
    comments:Comment[];
    visible:boolean;
    hot:boolean;
    tags:string[];

}
