import { Routes } from '@angular/router';
import { HomeComponent } from './Admin/pages/home/home.component';
import { EventPageComponent } from './Admin/pages/event-page/event-page.component';
import { RequestsComponent } from './Admin/pages/requests/requests.component';
import { SubadminsComponent } from './Admin/pages/subadmins/subadmins.component';

export const routes: Routes = [
    {
        path:"",
        component:HomeComponent
    },
    {
        path:"events",
        component:EventPageComponent
    },
    {
        path:"requests",
        component:RequestsComponent
    },
    {
        path:"subadmins",
        component:SubadminsComponent
    }
];
