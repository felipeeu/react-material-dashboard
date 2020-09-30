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
  FormControl,
  InputLabel,
  Select,
  MenuItem
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

const states = [
  { initials: 'AC', name: 'Acre' },
  { initials: 'AL', name: 'Alagoas' },
  { initials: 'AP', name: 'Amapá' },
  { initials: 'AM', name: 'Amazonas' },
  { initials: 'BA', name: 'Bahia' },
  { initials: 'CE', name: 'Ceará' },
  { initials: 'DF', name: 'Distrito Federal' },
  { initials: 'ES', name: 'Espírito Santo' },
  { initials: 'GO', name: 'Goiás' },
  { initials: 'MA', name: 'Maranhão' },
  { initials: 'MT', name: 'Mato Grosso' },
  { initials: 'MS', name: 'Mato Grosso do Sul' },
  { initials: 'MG', name: 'Minas Gerais' },
  { initials: 'PA', name: 'Pará' },
  { initials: 'PB', name: 'Paraíba' },
  { initials: 'PR', name: 'Paraná' },
  { initials: 'PE', name: 'Pernambuco' },
  { initials: 'PI', name: 'Piauí' },
  { initials: 'RJ', name: 'Rio de Janeiro' },
  { initials: 'RN', name: 'Rio Grande do Norte' },
  { initials: 'RS', name: 'Rio Grande do Sul' },
  { initials: 'RO', name: 'Rondônia' },
  { initials: 'RR', name: 'Roraima' },
  { initials: 'SC', name: 'Santa Catarina' },
  { initials: 'SP', name: 'São Paulo' },
  { initials: 'SE', name: 'Sergipe' },
  { initials: 'TO', name: 'Tocantins' }
];

const AddressForm = () => {
  const addressData = {
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cep: '',
    cidade: '',
    estado: '',
    pais: ''
  };
  const localDataJson = localStorage.getItem('address');
  const localData = JSON.parse(localDataJson) || addressData;
  const [validBlur, setValid] = React.useState({
    endereco: false,
    numero: false,
    complemento: false,
    bairro: false,
    cidade: false,
    estado: false,
    pais: false
  });
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cep: '',
      cidade: '',
      estado: '',
      pais: ''
    },
    validationSchema: Yup.object({
      endereco: Yup.string().required('Campo Obrigatório'),
      numero: Yup.string().required('Campo Obrigatório'),
      complemento: Yup.string().required('Campo Obrigatório'),
      bairro: Yup.string().required('Campo Obrigatório'),
      cep: Yup.string()
        .matches(/^[0-9]*$/, 'Você precisa digitar somente números')
        .length(8, 'Quantidade de dígitos fora do padrão para CEP')
        .required('Campo Obrigatório'),
      cidade: Yup.string().required('Campo Obrigatório'),
      estado: Yup.string().required('Campo Obrigatório'),
      pais: Yup.string().required('Campo Obrigatório')
    }),
    onSubmit: values => {
      localStorage.setItem('address', JSON.stringify(values, null, 2));
      navigate('/cadastro/contact');
      // alert(JSON.stringify(values, null, 2));
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
                  onBlur={() => setValid({ ...validBlur, endereco: true })}
                  value={formik.values.endereco || localData.endereco}
                  label="Endereço"
                  variant="outlined"
                  helperText={formik.errors.endereco}
                  fullWidth
                  InputProps={
                    validBlur.endereco &&
                    formik.values.endereco &&
                    !formik.errors.endereco ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={2} xs="auto">
                <TextField
                  id="numero"
                  name="numero"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, numero: true })}
                  value={formik.values.numero || localData.numero}
                  label="Número"
                  variant="outlined"
                  helperText={formik.errors.numeros}
                  fullWidth
                  InputProps={
                    validBlur.numero &&
                    formik.values.numero &&
                    !formik.errors.numero ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="complemento"
                  name="complemento"
                  type="text"
                  onChange={formik.handleChange || localData.complemento}
                  onBlur={() => setValid({ ...validBlur, complemento: true })}
                  value={formik.values.complemento || localData.complemento}
                  label="Complemento"
                  variant="outlined"
                  helperText={formik.errors.complemento}
                  fullWidth
                  InputProps={
                    validBlur.complemento &&
                    formik.values.complemento &&
                    !formik.errors.complemento ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="bairro"
                  name="bairro"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, bairro: true })}
                  value={formik.values.bairro || localData.bairro}
                  label="Bairro"
                  variant="outlined"
                  helperText={formik.errors.bairro}
                  fullWidth
                  InputProps={
                    validBlur.bairro &&
                    formik.values.bairro &&
                    !formik.errors.bairro ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="cep"
                  name="cep"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.cep || localData.cep}
                  label="CEP"
                  variant="outlined"
                  helperText={formik.errors.cep}
                  fullWidth
                  InputProps={
                    !formik.values.cep || formik.errors.cep ? (
                      <>Erro</>
                    ) : (
                      inputValid
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="cidade"
                  name="cidade"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, cidade: true })}
                  value={formik.values.cidade || localData.cidade}
                  label="Cidade"
                  variant="outlined"
                  helperText={formik.errors.cidade}
                  fullWidth
                  InputProps={
                    validBlur.cidade &&
                    formik.values.cidade &&
                    !formik.errors.cidade ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-outlined-label">
                    Estado
                  </InputLabel>
                  <Select
                    id="estado"
                    name="estado"
                    type="select"
                    onChange={formik.handleChange}
                    value={formik.values.estado || localData.estado}
                    label="Estado"
                    variant="outlined"
                    helperText={'Selecione um estado'}
                    InputLabelProps={{ shrink: true }}
                    // fullWidth
                  >
                    {states.map((state, idx) => (
                      <MenuItem key={idx} value={state.initials}>
                        {state.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="pais"
                  name="pais"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, pais: true })}
                  value={formik.values.pais || localData.pais}
                  label="País"
                  variant="outlined"
                  helperText={formik.errors.pais}
                  fullWidth
                  InputProps={
                    validBlur.pais &&
                    formik.values.pais &&
                    !formik.errors.pais ? (
                      inputValid
                    ) : (
                      <>Erro</>
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
              onClick={() => navigate('/cadastro/data')}
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
export default AddressForm;
