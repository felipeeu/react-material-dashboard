import React from 'react';
import {
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  Paper,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  box: {
    position: 'absolute',
    top: '20px',
    left: '45%',
    top: '30%'
  }
});

const ModalFinish = ({ setOpenModal }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.box}
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Card>
        <CardHeader subheader="" title="Dados armazenados com sucesso" />

        <CardContent>
          <Grid container spacing={3}></Grid>
        </CardContent>
        <Grid display="flex" direction="row-reverse" container>
          <Button onClick={() => setOpenModal(false)} item>
            Sair
          </Button>
        </Grid>
      </Card>
    </Box>
  );
};

export default ModalFinish;
