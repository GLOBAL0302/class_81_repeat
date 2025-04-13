import './App.css'
import InputForm from './components/InputForm'
import { selectOneLink } from './components/linksComponents/linksSlice'
import { redirect } from './components/linksComponents/linksThunk';
import { useAppDispatch, useAppSelector } from './store/hooks'
import {Button, Grid } from '@mui/material';

const App = () =>{
  const dispatch  = useAppDispatch();
  const link = useAppSelector(selectOneLink);

  const onCLickLink = ()=>{
    if(link){
      window.location.href = link.originalUrl
    }
  }

  return (
    <>
    <InputForm/>
    <Grid display="flex" flexDirection="column" alignItems="center">
      {link && <>
        <p>your URL is </p>
        <Button onClick={onCLickLink} variant="contained">{`http://localhost:8000/${link?.shortUrl}`}</Button>
      </>}
    </Grid>
    </>
  )
}

export default App
