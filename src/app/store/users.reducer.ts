import { createReducer, on } from "@ngrx/store";
import { User } from "../models/User";
import { add, addSuccess, find, findAll, findAllPageable, load, remove, removeSuccess, resetUser, setErrors, setPaginator, setUserForm, update, updateSucess } from "./users.actions";

const users:User[]=[];
const user: User=new User();
export const userReducer=createReducer(
    {
        users,
        paginator:{},
        user,
        errors:{}

    },
  on(findAll, (state, { users }) => ({
        users: [...users],
        paginator: state.paginator,
        user: state.user,
        errors: state.errors
    }
    )),
     on(findAllPageable, (state, { users,paginator }) => ({
        users: [...users],
        paginator: { ...paginator },
        user: state.user,
        errors: state.errors
    }
    )),

    on(find, (state,{ id})=>(
        {
        users:state.users,
        paginator:state.paginator,
        user:state.users.find(user=> user.id== id) || new User(),
        errors: state.errors
            
            

        }

    )
    ),
      on(setPaginator, (state, { paginator }) => ({
        users: state.users,
        paginator: { ...paginator },
        user: state.user,
        errors: state.errors
    })),

     on(addSuccess, (state, { userNew }) => ({
        users: [...state.users, { ...userNew }],
        paginator: state.paginator,
        user: { ...user },
        errors: {}
    })),
    on(resetUser, (state)=>(
{
            users:state.users,
            paginator:state.paginator,
            user:{...user},
            errors: {}
}
        
    )),
 
    on(setUserForm, (state, { user }) => (
{
            users:state.users,
            paginator:state.paginator,
            user: { ...user  },
            errors: state.errors
}
        
    )),
 
    on(updateSucess,(state,{updatedUser})=>(
        {
            users:state.users.map(u=> (u.id==updatedUser.id)? {...updatedUser}:u),
            paginator:state.paginator,
            user:state.user,
            errors: state.errors

            
        }
    )
    
),
   on(removeSuccess,(state,{id})=>(
        {
            users:state.users.filter(user=>user.id!=id),
            paginator:state.paginator,
            user:state.user,
            errors: state.errors


            
        }
    )
    ),
  
    on(setErrors,(state,{errors})=>({
          users:state.users,
        paginator:state.paginator,
        user:state.user,
        errors:errors

    }

      
    ),
    
            
    )
    
)