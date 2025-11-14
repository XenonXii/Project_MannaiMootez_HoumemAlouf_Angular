import { Comment } from "./comment";
import { Location } from "./location";

export interface Post {
    id:string;
    title:string;
    image:string;
    date:string;
    description:string;
    location:Location;
    comments:Comment[];
    visible:boolean;
    draft:boolean;
    hot:boolean;
    tags:string[];

}
