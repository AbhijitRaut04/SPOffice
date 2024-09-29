import { Routes } from '@angular/router';
import { adminGuard } from './Admin/gaurds/admin.guard';
import { subadminGuard } from './SubAdmin/gaurds/subadmin.guard';
import { HomeComponent } from './Admin/pages/home/home.component';
import { AppAdminComponent } from './Admin/app-admin/app-admin.component';
import { LoginComponent } from './Admin/pages/auth/login/login.component';
import { RequestsComponent } from './Admin/pages/requests/requests.component';
import { EventPageComponent } from './Admin/pages/event-page/event-page.component';
import { AppSubadminComponent } from './SubAdmin/app-subadmin/app-subadmin.component';
import { SubadminLoginComponent } from './SubAdmin/pages/login/subadmin-login.component';
import { PolicePageComponent } from './SubAdmin/pages/police-page/police-page.component';
import { EventsPageComponent } from './SubAdmin/pages/events-page/events-page.component';
import { PageNotFoundComponent } from './Admin/pages/page-not-found/page-not-found.component';
import { AdminSignupComponent } from './Admin/pages/auth/admin-signup/admin-signup.component';
import { SubadminHomeComponent } from './SubAdmin/pages/subadmin-home/subadmin-home.component';
import { PoliceSignupComponent } from './SubAdmin/pages/police-signup/police-signup.component';
import { AreaComponent } from './Admin/pages/event-collection/area/area/area.component';
import { SubadminsComponent } from './Admin/pages/subadmin-tab/subadmins/subadmins.component';
import { EventComponent } from './Admin/pages/event-collection/event/event/event.component';
import { SubAdminSignupComponent } from './SubAdmin/pages/sub-admin-signup/sub-admin-signup.component';
import { SectorComponent } from './Admin/pages/event-collection/sector/sector/sector.component';
import { SubadminPageComponent } from './Admin/pages/subadmin-tab/subadmin-page/subadmin-page.component';
import { SubadminEventPageComponent } from './SubAdmin/pages/subadmin-event-page/subadmin-event-page.component';
import { SubeventComponent } from './Admin/pages/event-collection/subevent/subevent/subevent.component';
import { LocationComponent } from './Admin/pages/event-collection/location/location/location.component';
import { EditEventComponent } from './Admin/pages/event-collection/event/edit-event/edit-event.component';
import { CreateAreaComponent } from './Admin/pages/event-collection/area/create-area/create-area.component';
import { EditSectorComponent } from './Admin/pages/event-collection/sector/edit-sector/edit-sector.component';
import { CreateEventComponent } from './Admin/pages/event-collection/event/create-event/create-event.component';
import { CreateSectorComponent } from './Admin/pages/event-collection/sector/create-sector/create-sector.component';
import { EditSubeventComponent } from './Admin/pages/event-collection/subevent/edit-subevent/edit-subevent.component';
import { CreateSubeventComponent } from './Admin/pages/event-collection/subevent/create-subevent/create-subevent.component';
import { CreateLocationComponent } from './Admin/pages/event-collection/location/create-location/create-location.component';
import { EditAreaComponent } from './Admin/pages/event-collection/area/edit-area/edit-area.component';
import { EditLocationComponent } from './Admin/pages/event-collection/location/edit-location/edit-location.component';
import { SubeventPreviewComponent } from './Admin/pages/event-collection/subevent/subevent-preview/subevent-preview.component';

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
                canActivate: [adminGuard],
                children: [
                    // events
                    {
                        path: "",
                        component: EventPageComponent,
                    },
                    {
                        path: "create-event",
                        component:CreateEventComponent
                    },
                    {
                        path: ":eventname",
                        children: [
                            {
                                path:"",
                                children: [
                                    {
                                        path:"",
                                        component:EventComponent,
                                    },
                                    {
                                        path:"add-subevent",
                                        component:CreateSubeventComponent
                                    },
                                    {
                                        path: "edit",
                                        component:EditEventComponent
                                    },
                                    {
                                        path:":subeventname",
                                        children:[
                                            {
                                                path:"",
                                                component:SubeventComponent,
                                            },
                                            {
                                                path: "edit",
                                                component:EditSubeventComponent
                                            },
                                            {
                                                path: "preview",
                                                component:SubeventPreviewComponent
                                            },
                                            {
                                                path:"add-area",
                                                component:CreateAreaComponent
                                            },
                                            {
                                                path:":areaname",
                                                children:[
                                                    {
                                                        path:"",
                                                        component:AreaComponent
                                                    },
                                                    {
                                                        path: "edit",
                                                        component:EditAreaComponent
                                                    },
                                                    {
                                                        path:"add-sector",
                                                        component:CreateSectorComponent
                                                    },
                                                    {
                                                        path:":sectorname",
                                                        children:[
                                                            {
                                                                path:"",
                                                                component:SectorComponent
                                                            },
                                                            {
                                                                path: "edit",
                                                                component:EditSectorComponent
                                                            },
                                                            {
                                                                path:"add-location",
                                                                component:CreateLocationComponent
                                                            },
                                                            {
                                                                path:":locationname",
                                                                children:[
                                                                    {
                                                                        path:"",
                                                                        component:LocationComponent
                                                                    },
                                                                    {
                                                                        path: "edit",
                                                                        component:EditLocationComponent
                                                                    },
                                                                    // edit location

                                                                    // nested routing routing ends
                                                                ]
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            },
                            // {
                            //     path:"edit",
                            //     component:CreateEventComponent,
                            // },
                            // {
                            //     path:"",
                            //     children: [
                            //         {
                            //             path:"edit",
                            //             component:CreateEventComponent,
                            //         },
                            //         {
                            //             path:":name",
                            //             component:SubeventComponent,
                            //         }
                            //     ]
                            // }
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
            {
                path: "signup",
                component: AdminSignupComponent
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
                children:[
                    {
                        path:"",
                        component: PolicePageComponent
                    },
                    {
                        path:"register-police",
                        component:PoliceSignupComponent
                    }
                ],
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
    },
    {
        path: "**",
        component: PageNotFoundComponent
    }
];