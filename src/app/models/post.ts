import { Comment } from "./comment";
import { Location } from "./location";

export interface Post {
    id:string;
    title:string;
    decription:string;
    location:Location;
    comments:Comment[];
    visible:boolean;
    draft:boolean;

}
