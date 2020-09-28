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

const ContactForm = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      pessoa_contato: '',
      cargo: '',
      telefone: '',
      celular: '',
      email: '',
      site: ''
    },
    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Card>
          <CardHeader
            subheader="Preencha aqui com os dados de contato"
            title="Dados de Contato"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={4} xs="auto">
                <TextField
                  id="pessoa_contato"
                  name="pessoa_contato"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.pessoa_contato}
                  label="Pessoa de Contato"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="cargo"
                  name="cargo"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.cargo}
                  label="Cargo"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="telefone"
                  name="telefone"
                  // type="telefone"
                  onChange={formik.handleChange}
                  value={formik.values.telefone}
                  label="Telefone"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="celular"
                  name="celular"
                  // type="text"
                  onChange={formik.handleChange}
                  value={formik.values.celular}
                  label="Celular"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  label="E-mail"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="site"
                  name="site"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.site}
                  label="Site"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </CardContent>
          <Grid display="flex" direction="row-reverse" container>
            <Button onClick={() => navigate('/cadastro/assets')} item>
              Avançar
            </Button>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
export default ContactForm;