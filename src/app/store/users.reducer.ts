import { createReducer, on } from "@ngrx/store";
import { User } from "../models/User";
import { add, find, findAll, remove, setPaginator, update } from "./users.actions";

const users:User[]=[];
const user: User=new User();
export const userReducer=createReducer(
    {
        users,
        paginator:{},
        user

    },
    on(findAll,(state,{users})=>({
        
            users:[...users],
            paginator:state.paginator,
            user:state.user
         
    })),

    on(find, (state,{ id})=>(
        {
            users:state.users,
            paginator:state.paginator,
            user:state.users.find(user=> user.id== id) || new User()
            

        }

    )
    ),
    on(setPaginator, (state,{paginator})=>(
        {
            users:state.users,
            paginator:{...paginator},
            user:state.user
            

        }

    )
    ),
    on(add, (state,{usernew})=>(
        {
            users:[...state.users,{...usernew}],
            paginator:state.paginator,
            user:state.user
            

        }

    )
    ),
    on(update,(state,{userupdate})=>(
        {
            users:state.users.map(u=> (u.id==userupdate.id)? {...userupdate}:u),
            paginator:state.paginator,
            user:state.user


            
        }
    )
    
),
   on(remove,(state,{id})=>(
        {
            users:state.users.filter(user=>user.id!=id),
            paginator:state.paginator,
            user:state.user
           


            
        }
    )
    )
    
)