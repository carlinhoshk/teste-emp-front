import { useState } from 'react';
import Box from '@mui/material/Box';  
import ListItem from '@mui/material/ListItem';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import Grid3x3Icon from '@mui/icons-material/Grid3x3';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setAllUsers } from '../redux/userSlice'
import EditModal from './Edit'

interface Name {
    firstname: string,
    lastname : string
}


interface User {
    id: number
    name: Name,
    email: string,
    username: string,
    [key: string]: any;
  }

interface Props {
    user: User
}

function UserListItem(props: Props){
    const users = useAppSelector(state => state.user.value)
    const user = props.user
    const [btnLoading, setBtnLoading] = useState<number[]>([])
    const dispatch = useAppDispatch()


    async function deleteUser(userId : number){
        try {            
            setBtnLoading([...btnLoading, userId ])
            const response = await fetch(`https://fakestoreapi.com/users/${userId}`, {method: 'DELETE'})
            await response.json()
            setBtnLoading(btnLoading.filter(btn=> btn !== userId))
            dispatch(setAllUsers(users.filter(user => user.id !== userId)))
        } catch (error) {
            console.log('error deleting user!');
            console.log(error);
        }
    }

    return (
        <ListItem key={user.id} sx={{border: '0.1em solid #d3d3d3', borderRadius: '0.4em', marginBottom: '1em', display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start'}}>
                <Box sx={{fontWeight: 'bold', fontSize: '1.3em', marginBottom: '0.8em', display: 'flex', alignItems: 'center'}}> <Box sx={{marginRight: '0.5em', marginTop: '0.3em'}}><PersonIcon/></Box> {user.name.firstname + ' ' + user.name.lastname}</Box>
                <Box sx={{fontSize: '1em', marginBottom: '0.5em', display: 'flex', alignItems: 'center'}}><Box sx={{marginRight: '0.5em', marginTop: '0.3em'}}><EmailIcon/></Box> {user.email}</Box>
                <Box sx={{fontSize: '1em', marginBottom: '0.5em', display: 'flex', alignItems: 'center'}}> <Box sx={{marginRight: '0.5em', marginTop: '0.3em'}}><Grid3x3Icon/></Box>{user.username}</Box>
            </Box>
            
            <Box sx={{display: 'flex', flexDirection: 'column'}}>
                <EditModal user={user}/>
                <LoadingButton loading={btnLoading.filter(btn => btn === user.id)[0] ? true : false} onClick={()=>{deleteUser(user.id)}} variant="contained"><DeleteIcon/></LoadingButton>
            </Box>

        </ListItem>
    )
}

export default UserListItem