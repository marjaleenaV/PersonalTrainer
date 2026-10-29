import Container from '@mui/material/Container';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css'

function App() {

  return (
    <>

      <Container maxWidth="lg">
        <AppBar position="static" sx={{ mb: 2 }}>
          <Toolbar>
            <Typography variant="h6" >PersonalTrainer</Typography>
          </Toolbar>
        </AppBar>
        <CssBaseline /> {/*Shows elements similar regardless of browser*/}
      </Container>

    </>
  )
}

export default App
