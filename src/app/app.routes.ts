import { Routes } from '@angular/router';
import { Dashboard } from './back-office/dashboard/dashboard';
import { Error404 } from './error404/error404';
import { LoginPage } from './back-office/login-page/login-page';
import { SelectedPost } from './back-office/selected-post/selected-post';

export const routes: Routes = [
    {path:"dashboard",title:"Admin Dashboard", component:Dashboard},
    {path:"login",title:"Sign In", component:LoginPage},
    {path:"dashboard/id",title:"Manage Post", component:SelectedPost},
    {path:"",redirectTo:"home", pathMatch:"full"}, // this is the base url, this will redirect the user to the home page of the website
    {path:"**",title:"Erreur",component:Error404}
];
