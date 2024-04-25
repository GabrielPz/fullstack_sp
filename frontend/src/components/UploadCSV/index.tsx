import { Inter } from "next/font/google";
import { Box, Button, Card, InputBase, Modal, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
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

interface UploadCSVProps {
    handleCloseModal: () => void;
}

export default function UploadCSV({handleCloseModal}: UploadCSVProps) {

  return (
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
        padding: "1.5rem",
        justifyContent: 'space-around'
    }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" color="black">
            Upload CSV
        </Typography>
        <CloseIcon onClick={handleCloseModal} fontSize="large" sx={{color: 'black', cursor: 'pointer'}}/>
        </Stack>
        <FileInput/>
        <Button sx={{width: '80%', alignSelf: 'center'}} variant="contained" onClick={(e) => {e.preventDefault();}}>Upload</Button>
    </Box>
  );
}
