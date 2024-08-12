export interface Request {
    id: number;
    admin:string;
    subadmin:{
        id:number;
        contact:string;
        username:string;
        station:string;
    };
    status:string;
  }
  