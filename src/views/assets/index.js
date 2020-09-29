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
import { makeStyles } from '@material-ui/core/styles';
import { cardStyle } from '../data/index';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color
  },
  card: { ...cardStyle }
});

const AssetsForm = () => {
  const classes = useStyles();

  const formik = useFormik({
    initialValues: {
      ramo_atividade: '',
      faturamento_mensal: '',
      faturamento_2019: '',
      faturamento_2018: '',
      instalacoes: '',
      valor_aluguel: '',
      numero_funcionarios: '',
      valor_folha: '',
      outros: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Card className={classes.card}>
          <CardHeader subheader="" title="Dados Financeiros" />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs="auto">
                <TextField
                  id="ramo_atividade"
                  name="ramo_atividade"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.ramo_atividade}
                  label="Ramo de Atividade"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="faturamento_mensal"
                  name="faturamento_mensal"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.faturamento_mensal}
                  label="Faturamento Médio Mensal"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="faturamento_2019"
                  name="faturamento_2019"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.faturamento_2019}
                  label="Faturamento 2019"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="faturamento_2018"
                  name="faturamento_2018"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.faturamento_2018}
                  label="Faturamento 2018"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="instalacoes"
                  name="instalacoes"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.instalacoes}
                  label="Instalações"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="valor_aluguel"
                  name="valor_aluguel"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.valor_aluguel}
                  label="Valor Aluguel"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="numero_funcionarios"
                  name="numero_funcionarios"
                  type="select"
                  onChange={formik.handleChange}
                  value={formik.values.numero_funcionarios}
                  label="Quantidade de Funcionários"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="valor_folha"
                  name="valor_folha"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.valor_folha}
                  label="Valor da folha"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="outros"
                  name="outros"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.outros}
                  label="Outros"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <Grid display="flex" direction="row-reverse" container>
            <Button startIcon={<SaveIcon />} type="submit" item>
              Finalizar
            </Button>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
export default AssetsForm;
