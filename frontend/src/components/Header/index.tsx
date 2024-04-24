import { Inter } from "next/font/google";
import Grid from '@mui/material/Grid';
import { useEffect } from "react";
import { Box, Button, InputBase, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import SearchIcon from '@mui/icons-material/Search';

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

export default function Header() {
  const theme = useTheme();
  const materialStyles = getStyles(theme);

  useEffect(() => {
    
  },[])

  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="black" variant="h3" align="left">
            My Data
            </Typography>
            <Button variant="contained">Add CSV</Button>
        </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
        <Typography color="gray" variant="h6" align="left">
            See all your csv data
        </Typography>
        </Grid>
        <Grid item >
        <Search>
            <SearchIconWrapper>
            <SearchIcon sx={{color: 'gray'}}/>
            </SearchIconWrapper>
            <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            />
        </Search>
        </Grid>
    </Grid>
  );
}
