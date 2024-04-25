import { Inter } from "next/font/google";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { Box, Button, Card, InputBase, Modal, Skeleton, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import SearchIcon from '@mui/icons-material/Search';
import Header from "@/components/Header";
import CloseIcon from '@mui/icons-material/Close';
import Dropzone from "react-dropzone";
import { FileInput } from "@/components/DropZone";
import UploadCSV from "@/components/UploadCSV";
import { Data } from "@/types/data";
import { getData } from "@/services/backendCalls";
import Cards from "@/components/Cards";

const inter = Inter({ subsets: ["latin"] });

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  border: `1px solid ${alpha(theme.palette.common.black, 0.5)}`,  // Borda mais escura quando não focado
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  '&:focus-within': {
    border: `1px solid ${alpha(theme.palette.common.black, 0.85)}`,  // Borda mais clara quando focado
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'black',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Home() {
  const theme = useTheme();
  const materialStyles = getStyles(theme);
  const[openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const[data, setData] = useState<Data[]>([]);
  const[fetchedData, setFetchedData] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      const response = await getData();
      setData(response.data);
    };
    fetchData();
    // setFetchedData(true);
  },[])

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      padding: '5%',
      backgroundColor: 'white',
      overflowY: 'auto'
    }}>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <UploadCSV handleCloseModal={handleCloseModal}/>
      </Modal>
      <Header onOpenModal={handleOpenModal}/>
      {fetchedData && (
        <Cards data={data}/>
      )}
      {!fetchedData && (
        <>
          <Skeleton variant="rectangular" width="100%" height="25%" sx={{marginTop: '1rem'}}/>
          <Skeleton variant="rectangular" width="100%" height="25%" sx={{marginTop: '1rem'}}/>
          <Skeleton variant="rectangular" width="100%" height="25%" sx={{marginTop: '1rem'}}/>
        </>
      )}
    </Box>
  );
}
