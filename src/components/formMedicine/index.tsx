import { InputText } from '../inputText';
import { Button } from '@mui/material';


interface Props {
  onSubmit: () => void;
  useForm: any;
}

export const FormMedicine = ({ onSubmit, useForm }: Props) => {
  const { register, control, reset } = useForm;

  return (
    <form onSubmit={onSubmit}>
      <div className={'md:flex w-full'}>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <InputText
            label={'Nome'}
            name={'name'}
            control={control}
          />
        </div>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <InputText
            label={'Concentração (mg)'}
            name={'concentration'}
            propsInput={{ type: 'number' }}
            control={control}
          />
        </div>
      </div>
      <div className={'md:flex w-full'}>
        <div className={'mb-5 w-full md:mr-2.5'}>
          <InputText
            label={'Descrição'}
            name={'description'}
            control={control}
          />
        </div>
      </div>
      <Button
        variant="contained"
        type={'submit'}>
        Cadastrar
      </Button>
    </form>
  );
};
