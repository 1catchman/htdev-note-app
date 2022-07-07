import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  Grid,
  Typography,
  CardContent,
  Pagination,
  PaginationItem,
  TablePagination
} from '@mui/material';
import { useLocalStorage } from 'usehooks-ts';
import { useAppSelector } from '../redux/hooks';
import { getNotes } from '../redux/notesSlice';

export type NoteType = {
  id: number;
  text: string;
  sign: string;
  tz: string;
  date: Record<string, any>;
};

export default function Notes() {
  const { notes } = useAppSelector(getNotes);

  let navigate = useNavigate();
  const ref = React.useRef<HTMLDivElement>(null);
  const [rowsPerPage, setRowsPerPage] = useLocalStorage(
    'notes-per-page',
    10
  );

  let totalPage = Math.ceil(notes.length / rowsPerPage);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentPage = parseInt(query.get('page') || '1', 10);
  const initialValue = (currentPage - 1) * rowsPerPage;
  const selectedProducts = notes.slice(
    initialValue,
    initialValue + rowsPerPage
  );

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    newPage && navigate(`/notes?page=${newPage}`, { replace: true });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    totalPage = Math.ceil(notes.length / rowsPerPage);
    if (currentPage > totalPage) {
      navigate(`/notes?page=${totalPage}`, {
        replace: true
      });
    }
  };

  return (
    <Box ref={ref}>
      <TablePagination
        component="div"
        count={notes.length}
        page={currentPage}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Grid container spacing={2}>
        {notes.length
          ? selectedProducts.map((note, index) => (
              <Grid xs={6} item key={`note-${index}`}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Box>
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                        component="span"
                      >
                        {note.sign}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="h5" component="span">
                        Запись №:{note.id}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        sx={{ mb: 1.5 }}
                        color="text.secondary"
                        component="span"
                      >
                        {`${note.date[note.tz]}`}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" component="span">
                        {note.text ? note.text : 'Текста нет'}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : 'Записей нет'}
      </Grid>
      <Pagination
        sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}
        page={currentPage}
        count={totalPage}
        renderItem={(item) => (
          <PaginationItem
            component={Link}
            to={`/notes${
              item.page === 1 ? '' : `?page=${item.page}`
            }`}
            {...item}
            onClick={() =>
              ref.current !== null
                ? ref.current.scrollIntoView()
                : null
            }
          />
        )}
      />
    </Box>
  );
}
