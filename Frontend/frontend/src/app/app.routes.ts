import { Routes } from '@angular/router';
import { HomeComponent } from './Admin/pages/home/home.component';
import { RequestsComponent } from './Admin/pages/requests/requests.component';
import { SubadminsComponent } from './Admin/pages/subadmins/subadmins.component';
import { CreateEventComponent } from './Admin/pages/create-event/create-event.component';
import { adminGuard } from './Admin/gaurds/admin.guard';
import { LoginComponent } from './Admin/pages/login/login.component';
import { SubadminPageComponent } from './Admin/pages/subadmin-page/subadmin-page.component';
import { CreateSubeventComponent } from './Admin/pages/create-subevent/create-subevent.component';
import { SubadminHomeComponent } from './SubAdmin/pages/subadmin-home/subadmin-home.component';
import { SubAdminSignupComponent } from './SubAdmin/pages/sub-admin-signup/sub-admin-signup.component';
import { AppAdminComponent } from './Admin/app-admin/app-admin.component';
import { AppSubadminComponent } from './SubAdmin/app-subadmin/app-subadmin.component';
import { PolicePageComponent } from './SubAdmin/pages/police-page/police-page.component';
import { EventsPageComponent } from './SubAdmin/pages/events-page/events-page.component';
import { EventPageComponent } from './Admin/pages/event-page/event-page.component';
import { subadminGuard } from './SubAdmin/gaurds/subadmin.guard';
import { SubadminLoginComponent } from './SubAdmin/pages/login/subadmin-login.component';
import { SubadminEventPageComponent } from './SubAdmin/pages/subadmin-event-page/subadmin-event-page.component';
import { EventComponent } from './Admin/pages/event/event.component';
import { SubeventComponent } from './Admin/pages/subevent/subevent.component';


export const routes: Routes = [
    {
        path: "",
        component: AppAdminComponent,
        children: [
            {
                path:"",
                component:HomeComponent
            },
            {
                path: "events",
                children: [
                    {
                        path: "",
                        component: EventPageComponent,
                        canActivate: [adminGuard]
                    },
                    {
                        path: "create",
                        canActivate: [adminGuard],
                        children: [
                            {
                                path:"",
                                component:CreateEventComponent,
                            },
                            {
                                path:"subevent",
                                component:CreateSubeventComponent,
                
                            }
                        ]

                    },
                    {
                        path: ":name",
                        // component: EventComponent,
                        canActivate: [adminGuard],
                        children: [
                            {
                                path:"",
                                component:EventComponent,
                            },
                            {
                                path:"edit",
                                component:CreateEventComponent,
                            },
                            {
                                path:"subevent",
                                children: [
                                    {
                                        path:"edit",
                                        component:CreateEventComponent,
                                    },
                                    {
                                        path:":name",
                                        component:SubeventComponent,
                                    }
                                ]
                            }
                        ]
                    },
                ]
            },
            {
                path: "requests",
                component: RequestsComponent,
                canActivate: [adminGuard]
            },
            {
                path: "subadmins",
                canActivate: [adminGuard],
                children: [
                    {
                        path: "",
                        component: SubadminsComponent,
                    },
                    {
                        path: ":subadmin",
                        component: SubadminPageComponent,
                    }
                ]
            },
            {
                path: "login",
                component: LoginComponent
            },
        ]
    },

    {
        path: "subadmin",
        component:AppSubadminComponent,
        children: [
            {
                path: "",
                canActivate:[subadminGuard],
                component: SubadminHomeComponent
            },
            {
                path: "events",
                canActivate:[subadminGuard],
                children:[
                    {
                        path:"",
                        component: EventsPageComponent
                    },
                    {
                        path:":event-name",
                        component: SubadminEventPageComponent
                    },
                ],
            },
            {
                path: "police",
                canActivate:[subadminGuard],
                component: PolicePageComponent
            },
            {
                path: "signup",
                component: SubAdminSignupComponent
            },
            {
                path: "login",
                component: SubadminLoginComponent
            }
        ]
    }
];
