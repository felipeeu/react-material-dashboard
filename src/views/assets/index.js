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
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Modal
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import SaveIcon from '@material-ui/icons/Save';
import Back from '../../icons/Back';
import { makeStyles } from '@material-ui/core/styles';
import { cardStyle } from '../data/index';
import * as Yup from 'yup';
import { inputValid } from '../data/index';
import NumberFormat from 'react-number-format';
import ModalFinish from './modal-finish';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'red',
    color: props => props.color
  },
  card: { ...cardStyle },
  radioGroup: { flexDirection: 'row' }
});

const NumberFormatCustom = props => {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onChange={onChange}
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale={true}
    />
  );
};

const AssetsForm = () => {
  const assetData = {
    ramo_atividade: '',
    faturamento_mensal: '',
    faturamento_2019: '',
    faturamento_2018: '',
    instalacoes: '',
    valor_aluguel: '',
    numero_funcionarios: '',
    valor_folha: '',
    outros: ''
  };
  const parseCurrency = value =>
    Number(
      value
        .split(',')[0]
        .slice(2)
        .split('.')
        .join('')
    );
  const [openModal, setOpenModal] = React.useState(false);
  const saveData = values => {
    let parseDataPayload = JSON.parse(localStorage.getItem('data'));
    let addressPayload = JSON.parse(localStorage.getItem('address'));
    let contactPayload = JSON.parse(localStorage.getItem('contact'));

    fetch('https://boiling-hollows-66640.herokuapp.com/empresas', {
      method: 'post',
      body: JSON.stringify({
        ...parseDataPayload,
        ...addressPayload,
        ...contactPayload,
        ramo_atividade: values.ramo_atividade,
        instalacoes: values.instalacoes,
        numero_funcionarios: values.numero_funcionarios,
        outros: values.outros,
        faturamento_mensal: parseCurrency(values.faturamento_mensal),
        faturamento_2019: parseCurrency(values.faturamento_2019),
        faturamento_2018: parseCurrency(values.faturamento_2018),
        valor_aluguel: parseCurrency(values.valor_aluguel),
        valor_folha: parseCurrency(values.valor_folha)
      })
    })
      .then(function(response) {
        if (response) {
          setOpenModal(true);
          localStorage.clear();
        }
      })
      .then(function(data) {
        console.log(data);
      });
  };

  const localDataJson = localStorage.getItem('asset');
  const noParsedlocalData = JSON.parse(localDataJson) || assetData;
  const localData = {
    ...noParsedlocalData,
    numero_funcionarios: Number(noParsedlocalData.numero_funcionarios)
  };
  const [validBlur, setValid] = React.useState({
    ramo_atividade: false,
    numero_funcionarios: false,
    outros: false,
    faturamento_mensal: false,
    faturamento_2019: false,
    faturamento_2018: false,
    valor_aluguel: false,
    valor_folha: false
  });
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      ramo_atividade: '',
      faturamento_mensal: 0,
      faturamento_2019: 0,
      faturamento_2018: 0,
      instalacoes: 'alugada',
      valor_aluguel: 0,
      numero_funcionarios: 0,
      valor_folha: 0,
      outros: ''
    },

    validationSchema: Yup.object({
      ramo_atividade: Yup.string().required('Campo Obrigatório'),
      faturamento_mensal: Yup.string().required('Campo Obrigatório'),

      faturamento_2019: Yup.string().required('Campo Obrigatório'),

      faturamento_2018: Yup.string().required('Campo Obrigatório'),

      instalacoes: Yup.string(), //.required('Campo Obrigatório'),
      valor_aluguel: Yup.string(),
      numero_funcionarios: Yup.number()
        .required('Campo Obrigatório')
        .positive()
        .integer(),
      valor_folha: Yup.string().required('Campo Obrigatório'),

      outros: Yup.string()
    }),

    onSubmit: values => {
      saveData(values);
      localStorage.setItem('asset', JSON.stringify(values, null, 2));
      
      // alert(JSON.stringify(values, null, 2));
    }
  });

  console.log('isValid ', formik.isValid);
  return (
    <form onSubmit={formik.handleSubmit}>
      <Modal open={openModal}>
        <ModalFinish setOpenModal={setOpenModal}></ModalFinish>
      </Modal>

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
                  onBlur={() =>
                    setValid({ ...validBlur, ramo_atividade: true })
                  }
                  value={
                    formik.values.ramo_atividade || localData.ramo_atividade
                  }
                  label="Ramo de Atividade"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.ramo_atividade &&
                    formik.values.ramo_atividade &&
                    !formik.errors.ramo_atividade ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="faturamento_mensal"
                  name="faturamento_mensal"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() =>
                    setValid({ ...validBlur, faturamento_mensal: true })
                  }
                  value={
                    formik.values.faturamento_mensal ||
                    localData.faturamento_mensal
                  }
                  label="Faturamento Médio Mensal"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.faturamento_mensal &&
                    formik.values.faturamento_mensal &&
                    !formik.errors.faturamento_mensal
                      ? inputValid
                      : <>Erro</> && { inputComponent: NumberFormatCustom }
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="faturamento_2019"
                  name="faturamento_2019"
                  onChange={formik.handleChange}
                  onBlur={() =>
                    setValid({ ...validBlur, faturamento_2019: true })
                  }
                  value={
                    formik.values.faturamento_2019 || localData.faturamento_2019
                  }
                  label="Faturamento 2019"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.faturamento_2019 &&
                    formik.values.faturamento_2019 &&
                    !formik.errors.faturamento_2019
                      ? inputValid
                      : <>Erro</> && {
                          inputComponent: NumberFormatCustom
                        }
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="faturamento_2018"
                  name="faturamento_2018"
                  // type="text"
                  onChange={formik.handleChange}
                  onBlur={() =>
                    setValid({ ...validBlur, faturamento_2018: true })
                  }
                  value={
                    formik.values.faturamento_2018 || localData.faturamento_2018
                  }
                  label="Faturamento 2018"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.faturamento_2018 &&
                    formik.values.faturamento_2018 &&
                    !formik.errors.faturamento_2018
                      ? inputValid
                      : <>Erro</> && {
                          inputComponent: NumberFormatCustom
                        }
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <FormControl component="fieldset">
                  <FormLabel component="legend">Instalações</FormLabel>

                  <RadioGroup
                    id="instalacoes"
                    name="instalacoes"
                    value={formik.values.instalacoes || localData.instalacoes}
                    onChange={formik.handleChange}
                    container
                    className={classes.radioGroup}
                  >
                    <FormControlLabel
                      value="propria"
                      control={<Radio />}
                      label="Própria"
                      item
                    />
                    <FormControlLabel
                      value="alugada"
                      control={<Radio />}
                      label="Alugada"
                      item
                    />
                    <FormControlLabel
                      value="outras"
                      control={<Radio />}
                      label="Outras"
                      item
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item md={4} xs="auto">
                <TextField
                  id="valor_aluguel"
                  name="valor_aluguel"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, valor_aluguel: true })}
                  value={formik.values.valor_aluguel || localData.valor_aluguel}
                  disabled={
                    localData.instalacoes === 'propria' ||
                    localData.instalacoes === 'outras' ||
                    formik.values.instalacoes === 'outras' ||
                    formik.values.instalacoes === 'propria'
                  }
                  label="Valor Aluguel"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.valor_aluguel &&
                    formik.values.valor_aluguel &&
                    !formik.errors.valor_aluguel
                      ? inputValid
                      : <>Erro</> && {
                          inputComponent: NumberFormatCustom
                        }
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="numero_funcionarios"
                  name="numero_funcionarios"
                  onChange={formik.handleChange}
                  onBlur={() =>
                    setValid({ ...validBlur, numero_funcionarios: true })
                  }
                  value={
                    formik.values.numero_funcionarios ||
                    localData.numero_funcionarios
                  }
                  label="Quantidade de Funcionários"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.numero_funcionarios &&
                    formik.values.numero_funcionarios &&
                    !formik.errors.numero_funcionarios ? (
                      inputValid
                    ) : (
                      <>Erro</>
                    )
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="valor_folha"
                  name="valor_folha"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, valor_folha: true })}
                  value={formik.values.valor_folha || localData.valor_folha}
                  label="Valor da folha"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.valor_folha &&
                    formik.values.valor_folha &&
                    !formik.errors.valor_folha
                      ? inputValid
                      : <>Erro</> && {
                          inputComponent: NumberFormatCustom
                        }
                  }
                />
              </Grid>
              <Grid item md={4} xs="auto">
                <TextField
                  id="outros"
                  name="outros"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={() => setValid({ ...validBlur, outros: true })}
                  value={formik.values.outros || localData.outros}
                  label="Outros"
                  variant="outlined"
                  fullWidth
                  InputProps={
                    validBlur.outros &&
                    formik.values.outros &&
                    !formik.errors.outros ? (
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
              onClick={() => navigate('/cadastro/contact')}
              item
            >
              Voltar
            </Button>
            <Button
              disabled={!formik.isValid || !formik.dirty}
              startIcon={<SaveIcon />}
              type="submit"
              item
            >
              Finalizar
            </Button>
          </Grid>
        </Card>
      </Box>
    </form>
  );
};
export default AssetsForm;
