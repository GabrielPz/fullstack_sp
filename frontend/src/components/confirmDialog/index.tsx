import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { deleteData } from '@/services/backendCalls';
import { showToast } from '@/services/toast';

interface ConfirmDialogProps{
    open: boolean;
    handleClose: () => void
    handleRefreshState: () => void;
}
export default function ConfirmDalog({open, handleClose, handleRefreshState}: ConfirmDialogProps) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleDelete = async () =>{
        const response = await deleteData();
        showToast(response.status != 200 ? "error" : "success", <p>{response.message}</p>);
        handleRefreshState();
        handleClose();
    }
    return (
        <React.Fragment>
        <Dialog
            fullScreen={fullScreen}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
            {"Delete confirmation"}
            </DialogTitle>
            <DialogContent>
            <DialogContentText>
                Are you sure you wan to delete all data? this process cannot be reversed.
            </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleClose}>
                Disagree
            </Button>
            <Button onClick={handleDelete} autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
        </React.Fragment>
    );
}