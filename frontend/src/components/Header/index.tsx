import { Inter } from "next/font/google";
import Grid from '@mui/material/Grid';
import { useEffect, useState } from "react";
import { Box, Button, InputBase, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import SearchIcon from '@mui/icons-material/Search';
import ConfirmDalog from "../confirmDialog";

interface HeaderProps {
    onOpenModal: () => void;
    handleRefreshState: () => void;
}
export default function Header({onOpenModal, handleRefreshState}: HeaderProps) {
  const theme = useTheme();
  const materialStyles = getStyles(theme);
  const[open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2}>
        <ConfirmDalog handleClose={handleClose} open={open} handleRefreshState={handleRefreshState}/>
        <Grid item xs={12} sm={12} md={12}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography color="black" variant="h3" align="left">
            My Data
            </Typography>
            <Stack direction="column" gap={1} alignItems="center">
              <Button variant="contained" onClick={(e) => {e.preventDefault(); onOpenModal()}}>Add CSV</Button>
              <Button variant="contained" color="error" onClick={(e) => {e.preventDefault(); handleOpen()}}>Delete</Button>

            </Stack>
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
