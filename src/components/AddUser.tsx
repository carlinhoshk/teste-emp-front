import { useState } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import LoadingButton from '@mui/lab/LoadingButton';
import AddIcon from '@mui/icons-material/Add';

import { useAppSelector, useAppDispatch } from '../redux/hooks'
import { setAllUsers } from '../redux/userSlice';



const style = {
  position: 'absolute' as 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '20em',
  height: '22em',
  bgcolor: 'background.paper',
  borderRadius: '0.4em',
  boxShadow: 54,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly'
};

interface Name {
  firstname: string,
  lastname : string,
}

interface User {
  id: number
  name: Name,
  email: string,
  username: string,
  [key: string]: any;
}



export default function AddUser() {
    let voidUser = {
        id: 0,
        name: {
            firstname: '',
            lastname: ''
        },
        email: '',
        username: '',
    }

    const users = useAppSelector(state => state.user.value)
    const dispatch = useAppDispatch()
    const [user, setUser] = useState<User>(voidUser)
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false)


    function handleChange(key: string, value: string) {
        if (key === "firstname" || key === "lastname") {
          user.name[key] = value;
          setUser(user);
        } else {
          user[key] = value;
          setUser(user);
        }
      }

    async function addUser(){

        try {
            setBtnLoading(true)
            user.id = users[users.length - 1].id + 1
            setUser(user)

            let res = await fetch('https://fakestoreapi.com/users',{
                method:"POST",
                body:JSON.stringify(user)
            })
            await res.json()
            setBtnLoading(false)
            handleClose()
            dispatch(setAllUsers([...users, user]))
        } catch (error) {
            setBtnLoading(false)
            handleClose()
            dispatch(setAllUsers([...users, user]))
        }
    }

    return (
        <div>
        <LoadingButton onClick={handleOpen}  sx={{display: 'flex', margin: 'auto'}} variant="contained" style={{ backgroundColor: 'green', color: 'white' }}><AddIcon/></LoadingButton>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="firstname"  label="First Name" variant="outlined" />
                <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="lastname" label="Last Name" variant="outlined" />
                <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="email" label="E-mail" variant="outlined" />
                <TextField onChange={(e)=>{handleChange(e.target.name, e.target.value)}} name="username" label="Username" variant="outlined" />
                <LoadingButton loading={btnLoading} onClick={addUser} variant="contained" style={{ backgroundColor: 'green', color: 'white' }}>Save</LoadingButton>
            </Box>
        </Modal>
        </div>
    );
}
