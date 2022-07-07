import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../redux/store';
import { NoteType } from '../components/Notes';

const initialState: NoteType[] =
  JSON.parse(localStorage.getItem('notes')) || [];

export const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<NoteType>) => {
      let data = [...state, action.payload];
      localStorage.setItem('notes', JSON.stringify(data));
      return data;
    }
  }
});

export const { addNote } = notesSlice.actions;

export const getNotes = (state: RootState) => state;

export default notesSlice.reducer;
