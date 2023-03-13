import { useEffect, useState } from "react";
import List from '@mui/material/List';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box'

import UserListItem from "./UserListItem";
import AddUser from './AddUser'

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setAllUsers } from '../redux/userSlice'

function UserList(){
    const [loading, setLoading] = useState<boolean>(false)
    const users = useAppSelector(state => state.user.value)
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchAllUsers()
    }, []);

    async function fetchAllUsers() {
        setLoading(true)
        const response = await fetch('https://fakestoreapi.com/users');
        const data = await response.json()
    
        dispatch(setAllUsers(data))
        setLoading(false)
    }

    return(
        <>
            { !loading && (<AddUser/>)}
            

            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', display: 'block', margin: '0.6em auto auto auto'}}>

            { loading && (<Box sx={{ display: 'grid', placeItems: 'center'}}><CircularProgress /></Box>)}
            
            
                {users.map((user)=>{
                    return(
                        <UserListItem key={user.id} user={user}/>
                    )
                })}

            </List>

        </>
    )
}

export default UserList