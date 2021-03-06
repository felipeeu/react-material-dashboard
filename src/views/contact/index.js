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
import Back from '../../icons/Back';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { cardStyle } from '../data/index';
import * as Yup from 'yup';
import { inputValid } from '../data/index';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color
  },
  card: { ...cardStyle }
});

const ContactForm = () => {
  const contactData = {
    pessoa_contato: '',
    cargo: '',
    telefone: '',
    celular: '',
    email: '',
    site: ''
  };
  const localDataJson = localStorage.getItem('contact');
  const localData = JSON.parse(localDataJson) || contactData;
  const [validBlur, setValid] = React.useState({
    pessoa_contato: false,
    cargo: false
  });
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
      localStorage.setItem('contact', JSON.stringify(values, null, 2));
      navigate('/cadastro/assets');
    },

    validationSchema: Yup.object({
      pessoa_contato: Yup.string().required('Campo Obrigatório'),
      cargo: Yup.string().required('Campo Obrigatório'),
      telefone: Yup.string()
        .matches(/^[0-9]*$/, 'Você precisa digitar somente números')
        .length(10, 'Precisa de 10 digitos incluindo o DDD')
        .required('Campo Obrigatório'),
      celular: Yup.string()
        .matches(/^[0-9]*$/, 'Você precisa digitar somente números')
        .length(11, 'Precisa de 11 digitos incluindo o DDD')
        .required('Campo Obrigatório'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('Campo Obrigatório'),
      site: Yup.string().matches(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        'Digite um site válido'
      )
    })
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Card className={classes.card}>
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
                  onBlur={() =>
                    setValid({ ...validBlur, pessoa_contato: true })
                  }
                  value={
                    formik.values.pessoa_contato || localData.pessoa_contato
                  }
                  label="Pessoa de Contato"
                  variant="outlined"
                  helperText={formik.errors.pessoa_contato}
                  fullWidth
                  InputProps={
                    validBlur.pessoa_contato &&
                    formik.values.pessoa_contato &&
                    !formik.errors.pessoa_contato ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="cargo"
                  name="cargo"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, cargo: true })}
                  value={formik.values.cargo || localData.cargo}
                  label="Cargo"
                  variant="outlined"
                  helperText={formik.errors.cargo}
                  fullWidth
                  InputProps={
                    validBlur.cargo &&
                    formik.values.cargo &&
                    !formik.errors.cargo ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="telefone"
                  name="telefone"
                  type="tel"
                  onChange={formik.handleChange}
                  value={formik.values.telefone || localData.telefone}
                  label="Telefone"
                  variant="outlined"
                  helperText={formik.errors.telefone}
                  fullWidth
                  InputProps={
                    !formik.values.telefone || formik.errors.telefone ? (
                      <>Erro</>
                    ) : (
                      inputValid
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="celular"
                  name="celular"
                  // type="text"
                  onChange={formik.handleChange}
                  value={formik.values.celular || localData.celular}
                  label="Celular"
                  variant="outlined"
                  helperText={formik.errors.celular}
                  fullWidth
                  InputProps={
                    !formik.values.celular || formik.errors.celular ? (
                      <>Erro</>
                    ) : (
                      inputValid
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email || localData.email}
                  label="E-mail"
                  variant="outlined"
                  helperText={formik.errors.email}
                  fullWidth
                  InputProps={
                    !formik.values.email || formik.errors.email ? (
                      <>Erro</>
                    ) : (
                      inputValid
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="site"
                  name="site"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.site || localData.site}
                  label="Site"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.site}
                  InputProps={
                    !formik.values.site || formik.errors.site ? (
                      <>Erro</>
                    ) : (
                      inputValid
                    )
                  }
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
            <Button
              startIcon={<Back />}
              onClick={() => navigate('/cadastro/address')}
              item
            >
              Voltar
            </Button>
            <Button
              endIcon={<Forward />}
              disabled={!formik.isValid || !formik.dirty}
              item
              type="submit"
            >
              Avançar
            </Button>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
export default ContactForm;
