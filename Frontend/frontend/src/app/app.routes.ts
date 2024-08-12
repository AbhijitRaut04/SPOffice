import { Routes } from '@angular/router';
import { HomeComponent } from './Admin/pages/home/home.component';
import { EventPageComponent } from './Admin/pages/event-page/event-page.component';
import { RequestsComponent } from './Admin/pages/requests/requests.component';
import { SubadminsComponent } from './Admin/pages/subadmins/subadmins.component';
import { CreateEventComponent } from './Admin/pages/create-event/create-event.component';
import { adminGuard } from './Admin/gaurds/admin.guard';
import { LoginComponent } from './Admin/pages/login/login.component';
import { SubadminPageComponent } from './Admin/pages/subadmin-page/subadmin-page.component';


export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"events",

        children: [
            {
                path:"",
                component:EventPageComponent,
                canActivate: [adminGuard]
            },
            {
                path:"create",
                component:CreateEventComponent,
                canActivate: [adminGuard]

            }
        ]
    },
    {
        path:"requests",
        component:RequestsComponent,
        canActivate: [adminGuard]
    },
    {
        path:"subadmins",
        canActivate: [adminGuard],
        children:[
            {
                path:"",
                component:SubadminsComponent,
            },
            {
                path:":subadmin",
                component: SubadminPageComponent,
            }
        ]
    },
    {
        path:"login",
        component:LoginComponent
    }
];
