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

export const inputValid = {
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
  const localDataJson = localStorage.getItem('data');
  const localData = JSON.parse(localDataJson) || dataState;
  const [validBlur, setBlur] = React.useState({ social: false, name: false });

  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: dataState,
    validationSchema: Yup.object({
      razao_social: Yup.string().required('Campo Obrigatório'),
      nome_fantasia: Yup.string().required('Campo Obrigatório'),
      cnpj: Yup.string()
        .length(14, 'Quantidade de caracteres fora do padrão para CNPJ')
        .matches(
          /[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}\-?[0-9]{2}/,
          'Quantidade de caracteres fora do padrão para CNPJ'
        )
        .required('Campo Obrigatório'),
      inscricao_estadual: Yup.string()
        .matches(/^[0-9]*$/, 'Você precisa digitar somente números')
        .length(9, 'Quantidade digitos fora do padrão')
        .required('Campo Obrigatório'),
      data_abertura: Yup.string().required('Campo Obrigatório'),
      tipo_empresa: Yup.string().required('Campo Obrigatório')
    }),

    onSubmit: values => {
      localStorage.setItem('data', JSON.stringify(values, null, 2));
      navigate('/cadastro/address');
      // alert(JSON.stringify(values, null, 2));
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
                  value={formik.values.razao_social || localData.razao_social}
                  label="Razão Social"
                  variant="outlined"
                  helperText={formik.errors.razao_social}
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
                  value={formik.values.nome_fantasia || localData.nome_fantasia}
                  label="Nome Fantasia"
                  variant="outlined"
                  helperText={formik.errors.nome_fantasia}
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
                  value={formik.values.cnpj || localData.cnpj}
                  label="CNPJ"
                  variant="outlined"
                  fullWidth
                  maxlength="14"
                  helperText={formik.errors.cnpj}
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
                  value={
                    formik.values.inscricao_estadual ||
                    localData.inscricao_estadual
                  }
                  label="Inscrição Est./Munic"
                  variant="outlined"
                  fullWidth
                  helperText={formik.errors.inscricao_estadual}
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
                  value={formik.values.data_abertura || localData.data_abertura}
                  variant="outlined"
                  helperText={formik.errors.data_abertura}
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
                    value={formik.values.tipo_empresa || localData.tipo_empresa}
                    onChange={e =>
                      formik.setFieldValue('tipo_empresa', e.target.value)
                    }
                    variant="outlined"
                    helperText={formik.errors.tipo_empresa}
                    label=" Tipo de Empresa"
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
              item
              type="submit"
              disabled={!formik.isValid || !formik.dirty}
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
