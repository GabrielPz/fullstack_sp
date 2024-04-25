import { Inter } from "next/font/google";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { Box, Button, Card, InputBase, Modal, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import SearchIcon from '@mui/icons-material/Search';
import Header from "@/components/Header";
import CloseIcon from '@mui/icons-material/Close';
import Dropzone from "react-dropzone";
import { FileInput } from "@/components/DropZone";

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

  useEffect(() => {
    
  },[])

  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      padding: '5%',
      // backgroundImage: 'linear-gradient(to bottom right, black, #0e0e0e)'
      backgroundColor: 'white',
      overflowY: 'auto'
    }}>
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: "absolute",
          top: "50%",  // Centraliza verticalmente
          left: "50%",  // Centraliza horizontalmente
          transform: "translate(-50%, -50%)",  // Compensa a posição absoluta
          width: "65%", 
          height: "65%", 
          backgroundColor: "white", 
          borderRadius: "15px",
          display: 'flex',
          flexDirection: 'column',
          padding: "1.5rem"
        }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h4" color="black">
              Upload CSV
            </Typography>
            <CloseIcon onClick={handleCloseModal} fontSize="large" sx={{color: 'black', cursor: 'pointer'}}/>
          </Stack>
          <FileInput/>
        </Box>
      </Modal>
      <Box gap={3}>
          <Header onOpenModal={handleOpenModal}/>
          <Card sx={{height: '10rem', marginTop: '1rem'}} elevation={5}>
            oi
          </Card>
      </Box>
    </Box>
  );
}
