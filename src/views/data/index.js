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
import SaveIcon from '@material-ui/icons/Save';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color
  }
});

const DataForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      razao_social: '',
      nome_fantasia: '',
      cnpj: '',
      inscricao_estadual: '',
      data_abertura: '',
      tipo_empresa: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Card>
          <CardHeader subheader="" title="Dados cadastrais" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs="auto">
                <TextField
                  id="razao_social"
                  name="razao_social"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.razao_social}
                  label="Razão Social"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="nome_fantasia"
                  name="nome_fantasia"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.nome_fantasia}
                  label="Nome Fantasia"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="cnpj"
                  name="cnpj"
                  type="cnpj"
                  onChange={formik.handleChange}
                  value={formik.values.cnpj}
                  label="CNPJ"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="inscricao_estadual"
                  name="inscricao_estadual"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.inscricao_estadual}
                  label="Inscrição Est./Munic"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="data_abertura"
                  name="data_abertura"
                  type="date"
                  onChange={formik.handleChange}
                  value={formik.values.data_abertura}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="tipo_empresa"
                  name="tipo_empresa"
                  type="select"
                  onChange={formik.handleChange}
                  value={formik.values.tipo_empresa}
                  label="Tipo de Empresa"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <Grid display="flex" direction="row-reverse" container>
            <Button onClick={() => navigate('/cadastro/address')} item>
              Avançar
            </Button>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
export default DataForm;
