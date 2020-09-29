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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  InputAdornment
} from '@material-ui/core';

import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import DoneIcon from '@material-ui/icons/Done';
import Forward from '../../icons/Forward';
import * as Yup from 'yup';

export const cardStyle = {
  margin: '40px'
};

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color
  },
  card: {
    ...cardStyle
  }
});

const inputValid = {
  endAdornment: (
    <InputAdornment position="end">
      <DoneIcon />
    </InputAdornment>
  )
};

const DataForm = () => {
  const [dataState, setDataState] = React.useState({
    razao_social: '',
    nome_fantasia: '',
    cnpj: '',
    inscricao_estadual: '',
    data_abertura: '',
    tipo_empresa: ''
  });
  const [validBlur, setBlur] = React.useState({ social: false, name: false });
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      ...dataState
    },

    validationSchema: Yup.object({
      razao_social: Yup.string().required('Campo Obrigatório'),
      nome_fantasia: Yup.string().required('Campo Obrigatório'),
      cnpj: Yup.string()
        .length(14, 'Quantidade de caracteres fora do padrão para CNPJ')
        .matches(/[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/)
        .required('Campo Obrigatório'),
      inscricao_estadual: Yup.string()
        .length(9)
        .matches(/^[0-9]*$/)
        .required('Campo Obrigatório'),
      data_abertura: Yup.string().required('Campo Obrigatório'),
      tipo_empresa: Yup.string().required('Campo Obrigatório')
    }),

    onSubmit: values => {
      setDataState(values);
    }
  });

 

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box alignItems="center" display="flex" flexDirection="column">
        <Card className={classes.card}>
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
                  onBlur={() => setBlur({ ...validBlur, social: true })}
                  value={formik.values.razao_social}
                  label="Razão Social"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.social &&
                    formik.values.razao_social &&
                    !formik.errors.razao_social ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="nome_fantasia"
                  name="nome_fantasia"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setBlur({ ...validBlur, name: true })}
                  value={formik.values.nome_fantasia}
                  label="Nome Fantasia"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.name &&
                    formik.values.nome_fantasia &&
                    !formik.errors.nome_fantasia ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
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
                  maxlength="14"
                  InputProps={
                    !formik.values.cnpj || formik.errors.cnpj ? (
                      <>Erro</>
                    ) : (
                      inputValid
                    )
                  }
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
                  InputProps={
                    !formik.values.inscricao_estadual ||
                    formik.errors.inscricao_estadual ? (
                      <>Erro</>
                    ) : (
                      inputValid
                    )
                  }
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
                  InputProps={
                    !formik.values.data_abertura || formik.errors.data_abertura
                      ? null
                      : inputValid
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Tipo de Empresa
                  </InputLabel>
                  <Select
                    id="tipo_empresa"
                    name="tipo_empresa"
                    value={formik.values.tipo_empresa}
                    onChange={e =>
                      formik.setFieldValue('tipo_empresa', e.target.value)
                    }
                    variant="outlined"
                    label=" Tipo de Empresa"
                    InputProps={
                      !formik.values.tipo_empresa || formik.errors.tipo_empresa
                        ? null
                        : inputValid
                    }
                  >
                    <MenuItem value={`s_a_capital_aberto`}>
                      S.A. Capital Aberto
                    </MenuItem>
                    <MenuItem value={`s_a_capital_fechado`}>
                      S.A. CApital Fechado
                    </MenuItem>
                    <MenuItem value={`sociedade_economia_mista`}>
                      Sociedade de Economia Mista
                    </MenuItem>
                    <MenuItem value={`sociedade_limitada`}>
                      Sociedade Limitada
                    </MenuItem>
                    <MenuItem value={`sociedade_simples`}>
                      Sociedade Simples
                    </MenuItem>
                    <MenuItem value={`outros`}>Outros</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Grid display="flex" direction="row-reverse" container>
            <Button
              endIcon={<Forward />}
              onClick={() => navigate('/cadastro/address')}
              item
              // disabled={}
            >
              Avançar
            </Button>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
export default DataForm;
