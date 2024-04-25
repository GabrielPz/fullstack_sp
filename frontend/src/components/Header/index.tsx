import { Inter } from "next/font/google";
import Grid from '@mui/material/Grid';
import { useEffect } from "react";
import { Box, Button, InputBase, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import SearchIcon from '@mui/icons-material/Search';

interface HeaderProps {
    onOpenModal: () => void;
}
export default function Header({onOpenModal}: HeaderProps) {
  const theme = useTheme();
  const materialStyles = getStyles(theme);

  return (
    <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="black" variant="h3" align="left">
            My Data
            </Typography>
            <Button variant="contained" onClick={(e) => {e.preventDefault(); onOpenModal()}}>Add CSV</Button>
        </Stack>
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
        <Typography color="gray" variant="h6" align="left">
            See all your csv data
        </Typography>
        </Grid>
    </Grid>
  );
}
