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
  InputLabel
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import MaskedInput from 'react-text-mask';

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

function TextMaskCustom() {
  return (
    <MaskedInput
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ]}
      placeholderChar={'\u2000'}
      variant={'outlined'}
      showMask
    />
  );
}

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
                  // label="CNPJ"
                  variant="outlined"
                  fullWidth
                  inputComponent={TextMaskCustom}
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
                {/* <TextField
                  id="tipo_empresa"
                  name="tipo_empresa"
                  type="select"
                  onChange={formik.handleChange}
                  value={formik.values.tipo_empresa}
                  label="Tipo de Empresa"
                  variant="outlined"
                  fullWidth
                /> */}
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
