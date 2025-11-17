import { Routes } from '@angular/router';
import { Dashboard } from './back-office/dashboard/dashboard';
import { Error404 } from './error404/error404';
import { LoginPage } from './back-office/login-page/login-page';
import { SelectedPost } from './back-office/selected-post/selected-post';
import { ControlPanel } from './back-office/control-panel/control-panel';
import { AddPost } from './back-office/add-post/add-post';
import { EditPost } from './back-office/edit-post/edit-post';
import { AdminSettings } from './back-office/admin-settings/admin-settings';
import { adminAuthGuard } from './guards/admin-auth-guard';

export const routes: Routes = [
    {path:"dashboard",title:"Admin Dashboard", component:Dashboard,canActivate:[adminAuthGuard],
        children:[
            {path:"controlpanel",title:"Control Panel",component:ControlPanel},
            {path:"edit/:id",title:"Control Panel",component:EditPost},
            {path:"add",title:"New Post",component:AddPost},
            {path:"settings",title:"Settings",component:AdminSettings},
            {path:"controlpanel/:id",title:"Manage Post",component:SelectedPost},
            {path:"",redirectTo:"controlpanel",pathMatch:"full"}
        ]
    },
    {path:"login",title:"Sign In", component:LoginPage},
    {path:"",redirectTo:"home", pathMatch:"full"}, // this is the base url, this will redirect the user to the home page of the website
    {path:"**",title:"Erreur",component:Error404}
];
