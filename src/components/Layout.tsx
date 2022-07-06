import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CreateNote from './CreateNote';
import Notes from './Notes';
import { Link, Route, Routes } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function Layout() {
  const [value, setValue] = React.useState(0);

  const handleChange = (
    event: React.SyntheticEvent,
    newValue: number
  ) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab
            label="Создать запись"
            {...a11yProps(0)}
            component={Link}
            to="/"
          />
          <Tab
            label="Записи"
            {...a11yProps(1)}
            component={Link}
            to="/notes"
          />
        </Tabs>
      </Box>
      <Routes>
        <Route
          path="/"
          element={
            <TabPanel value={value} index={0}>
              <CreateNote />
            </TabPanel>
          }
        />
        <Route
          path="/notes"
          element={
            <TabPanel value={value} index={1}>
              <Notes />
            </TabPanel>
          }
        />
      </Routes>
    </Box>
  );
}
