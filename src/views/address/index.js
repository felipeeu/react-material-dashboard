import React from 'react';
import { useFormik } from 'formik';
import {
  Button,
  Box,
  Card,
  CardHeader,
  CardContent,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';
import Forward from '../../icons/Forward';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { cardStyle } from '../data/index';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color
  },
  card: { ...cardStyle }
});

const AddressForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Card className={classes.card}>
          <CardHeader
            subheader="Preencha aqui com os dados de localização"
            title="Endereço"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={10} xs={10}>
                <TextField
                  id="endereco"
                  name="endereco"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.endereco}
                  label="Endereço"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={2} xs="auto">
                <TextField
                  id="numero"
                  name="numero"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.numero}
                  label="Número"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="complemento"
                  name="complemento"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.complemento}
                  label="Complemento"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="bairro"
                  name="bairro"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.bairro}
                  label="Bairro"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="cep"
                  name="cep"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.cep}
                  label="CEP"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="cidade"
                  name="cidade"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.cidade}
                  label="Cidade"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="estado"
                  name="estado"
                  type="select"
                  onChange={formik.handleChange}
                  value={formik.values.estado}
                  label="Estado"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="pais"
                  name="pais"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.pais}
                  label="País"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <Grid
            display="flex"
            direction="row"
            justify="space-between"
            container
          >
            <Button onClick={() => navigate('/cadastro/data')} item>
              Voltar
            </Button>
            <Button
              endIcon={<Forward />}
              onClick={() => navigate('/cadastro/contact')}
              item
            >
              Avançar
            </Button>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
export default AddressForm;
