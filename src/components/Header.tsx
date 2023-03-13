
import Box from '@mui/material/Box';  

function Header(){

    return(
        <Box sx={{height: '13vh', width: '100vw', backgroundColor: '#ffffff', display: 'grid', placeItems: 'center',  borderBottom: '0.1em solid #d3d3d3', marginBottom: '1em'}}>
            <img src="https://edesoft.com.br/wp-content/uploads/logo-edesoft-1-1.png" alt="" />
        </Box>
    )
}

export default Header