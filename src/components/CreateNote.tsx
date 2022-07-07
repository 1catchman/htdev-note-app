import React, { useEffect, useState } from 'react';
import {
  useForm,
  Controller,
  SubmitErrorHandler
} from 'react-hook-form';
import {
  Box,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Snackbar,
  Alert
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { useLocalStorage } from 'usehooks-ts';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { addNote, getNotes } from '../redux/notesSlice';
import { NoteType } from './Notes';

interface FormInput {
  noteText: string;
  noteSign: string;
  noteTimezone: string;
}

interface initialAlertStateProps {
  success?: boolean;
  error?: boolean;
}

const initialAlertState: initialAlertStateProps = {
  success: false,
  error: false
};

export default function CreateNote() {
  const dispatch = useAppDispatch();
  const { notes } = useAppSelector(getNotes);

  const {
    control,
    handleSubmit,
    resetField,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm<FormInput>({ mode: 'onChange' });

  const [timezone, setTimezone] = useLocalStorage('timezone', '');
  const [fields, setFields] = useLocalStorage('fields', {
    text: '',
    sign: ''
  });

  const [timezones, setTimezones] = useState<string[]>([]);
  const [date, setDate] = useState({} as any);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = React.useState(initialAlertState);

  const handleChange = (event: SelectChangeEvent) => {
    setTimezone(event.target.value as string);
  };

  const handleCloseAlert = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(initialAlertState);
  };

  const onSubmit = (data: FormInput) => {
    const { noteText, noteSign } = data;
    const newNote: NoteType = {
      id: notes.length + 1,
      text: noteText,
      sign: noteSign,
      tz: timezone,
      date
    };
    setLoading(true);
    // setNote([...note, newNote]);
    dispatch(addNote(newNote));
    resetField('noteText');
    setLoading(false);
    setOpen({ success: true });
  };

  const onError: SubmitErrorHandler<FormInput> = (errors, e) =>
    setOpen({ error: true });

  useEffect(() => {
    fetch('https://worldtimeapi.org/api/timezone')
      .then((response) => response.json())
      .then((data) => {
        setTimezones(data);
      });
    setValue('noteText', fields.text);
    setValue('noteSign', fields.sign);
  }, []);

  useEffect(() => {
    if (isValid && timezone.length) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isValid, timezone]);

  useEffect(() => {
    fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
      .then((response) => response.json())
      .then((data) => {
        setDate({ [data.timezone]: data.datetime });
        if (isValid && timezone.length) {
          setDisabled(false);
        }
      });
  }, [timezone]);

  useEffect(() => {
    const subscription = watch((value) =>
      setFields({ text: value.noteText, sign: value.noteSign })
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <Grid
      onSubmit={handleSubmit(onSubmit, onError)}
      component="form"
      container
      spacing={1}
      noValidate
      autoComplete="off"
    >
      <Grid item xs={12}>
        <Controller
          render={({ field }) => (
            <TextField
              {...field}
              id="note-text"
              label="Запись"
              multiline
              rows={4}
              fullWidth
              margin="normal"
            />
          )}
          name="noteText"
          control={control}
          defaultValue=""
        />
      </Grid>
      <Grid
        item
        xs={12}
        container
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
      >
        <Grid item xs={8}>
          <Box>
            <Controller
              render={({ field }) => (
                <TextField
                  {...field}
                  required
                  id="note-sign"
                  label="Подпись"
                  fullWidth
                  error={errors.noteSign ? true : false}
                />
              )}
              name="noteSign"
              control={control}
              defaultValue=""
              rules={{ required: true, maxLength: 100 }}
            />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Точное время по:
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="note-date"
              value={timezone}
              label="Точное время по:"
              onChange={handleChange}
            >
              <MenuItem value={''} sx={{ height: '40px' }}></MenuItem>
              {timezones.map((tz, index) => (
                <MenuItem key={`timezone-${index}`} value={tz}>
                  {tz}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid item xs={12} container justifyContent="flex-end">
        <LoadingButton
          disabled={disabled}
          endIcon={<SendIcon />}
          loading={loading}
          loadingPosition="end"
          type="submit"
          variant="contained"
        >
          Создать
        </LoadingButton>
      </Grid>
      <Snackbar
        open={open.success || open.error}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={open.success ? 'success' : 'error'}
          sx={{ width: '100%' }}
        >
          {open.success
            ? 'Your form was submitted successfully!'
            : 'Something went wrong.'}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
