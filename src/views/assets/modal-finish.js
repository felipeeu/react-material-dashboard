import React from 'react';
import {
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles({
  box: {
    position: 'absolute',
    left: '45%',
    top: '30%'
  }
});

const ModalFinish = ({ setOpenModal, openModal }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Box
      className={classes.box}
      alignItems="center"
      display="flex"
      flexDirection="column"
    >
      <Card>
        <CardHeader
          subheader=""
          title={openModal.error ? 'ERRO!' : 'Sucesso no registro'}
        />

        <CardContent>
          <Grid container spacing={3}>
            {openModal.error
              ? 'Falha ao tentar salvar seus dados. Revalide seus dados e Tente novamente!'
              : 'Seus dados foram salvos e em breve entraremos em contato. Para maiores informações ...'}
          </Grid>
        </CardContent>
        <Grid display="flex" direction="row-reverse" container>
          <Button
            onClick={() => {
              setOpenModal({ open: false, error: false });
              navigate('/app')
            }}
            item
          >
            Sair
          </Button>
        </Grid>
      </Card>
    </Box>
  );
};

export default ModalFinish;
