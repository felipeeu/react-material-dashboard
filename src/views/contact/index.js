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
    validationSchema: Yup.object({
      pessoa_contato: Yup.string().required('Campo Obrigatório'),
      cargo: Yup.string().required('Campo Obrigatório'),
      telefone: Yup.string().required('Campo Obrigatório'),
      celular: Yup.string().required('Campo Obrigatório'),
      email: Yup.string()
        .email('Digite um e-mail válido')
        .required('Campo Obrigatório'),
      site: Yup.string().matches(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        'Digite um site válido'
      )
    }),

    onSubmit: values => {
      alert(JSON.stringify(values, null, 2));
    }
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
                  value={formik.values.pessoa_contato}
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
                  value={formik.values.cargo}
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
                  // type="telefone"
                  onChange={formik.handleChange}
                  value={formik.values.telefone}
                  label="Telefone"
                  variant="outlined"
                  helperText={formik.errors.telefone}
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
                  helperText={formik.errors.celular}
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
                  value={formik.values.site}
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
              onClick={() => navigate('/cadastro/assets')}
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
export default ContactForm;
