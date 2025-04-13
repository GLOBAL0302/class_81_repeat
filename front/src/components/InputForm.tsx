import { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useAppDispatch } from '../store/hooks';
import { submitLink } from './linksComponents/linksThunk';




const initialState = {
  originalUrl: ""
}

const InputForm = () => {
  const [formValue, setFormValue] = useState(initialState);
  const dispatch = useAppDispatch();

  const onSubmit = async (e:React.ChangeEvent<HTMLFormElement>)=>{
    e.preventDefault();

    await dispatch(submitLink(formValue))
    setFormValue(initialState);
  }
  const onChange = (e:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
   const {name, value} = e.target
    setFormValue(prevState => ({...prevState, [name]: value}))
  }

  return (
    <Grid marginBottom={3} container onSubmit={onSubmit} component="form" flexDirection="column" alignItems="center" gap={3}>
      <Typography  variant="h3" component="h3" > Shorten your link!</Typography>
      <Grid width="60%">
        <TextField required value={formValue.originalUrl}  fullWidth onChange={onChange} id="originalUrl" name='originalUrl' label="URL" variant="filled" />
      </Grid>
      <Grid>
        <Button variant="outlined" type="submit">ShorTen</Button>
      </Grid>
    </Grid>
  );
};

export default InputForm;