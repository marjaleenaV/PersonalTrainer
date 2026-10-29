import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import { Link, Outlet } from 'react-router';

import './App.css'
import Box from '@mui/material/Box';



function App() {

  return (
    <>

      <Container maxWidth="lg">
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" >PersonalTrainer</Typography>
          </Toolbar>
        </AppBar>
                  {/*Links between pages*/}
          <Box>
            <Box sx={{
              margin: 2,
              display: 'inline'
            }}>
              <Link to={"/"}>{'Customer'}</Link>
            </Box>
            <Box sx={{
              display: 'inline'
            }}>
              <Link to={"/training"}>Training</Link>
            </Box>
          </Box>
            <br></br>
            {/*Page Content*/}
        <Outlet />
        <CssBaseline /> {/*Shows elements similar regardless of browser*/}
      </Container>

    </>
  )
}

export default App
