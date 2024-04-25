import { Inter } from "next/font/google";
import { Box, Button, Card, InputBase, Modal, Stack, Typography, alpha, styled, useMediaQuery, useTheme } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { FileInput } from "@/components/DropZone";
import { useState } from "react";
import { useFileContext } from "@/contexts/FileContext";
import { sendCsv } from "@/services/backendCalls";
import { showToast } from "@/services/toast";
import { UploadCSVProps } from "@/types/data";
import { LoadingButton } from '@mui/lab';

export default function UploadCSV({handleCloseModal, handleRefreshState}: UploadCSVProps) {
  const[loading, setLoading] = useState(false);
  const { files, setFiles } = useFileContext();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const handleSendCsv = async () => {
    if(files.length == 0){
      showToast("warning", <p>Select a File</p>);
      return;
    }
    setLoading(true);
    const response = await sendCsv(files[0]);
    if(response.status != 200){
      showToast("error", <p>Error Uploading CSV</p>);
      setLoading(false);
      return
    }
    setLoading(false);
    showToast("success", <p>CSV uploaded!</p>)
    setFiles([]);
    handleRefreshState();
    handleCloseModal();
  }

  return (
    <Box sx={{
        position: "absolute",
        top: "50%", 
        left: "50%", 
        transform: "translate(-50%, -50%)", 
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
        <Typography variant={isMobile ? 'h6' : 'h4'} color="black">
            Upload CSV
        </Typography>
        <CloseIcon onClick={handleCloseModal} fontSize={isMobile ? 'small' : 'large'} sx={{color: 'black', cursor: 'pointer'}}/>
        </Stack>
        <FileInput/>
        <LoadingButton loading={loading} sx={{width: '80%', alignSelf: 'center'}} variant="contained" onClick={(e) => {e.preventDefault(); handleSendCsv();}}>Upload</LoadingButton>
    </Box>
  );
}
