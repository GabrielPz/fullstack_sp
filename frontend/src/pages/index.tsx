import { Inter } from "next/font/google";import { useEffect, useState } from "react";
import { Box, Modal, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import SearchIcon from '@mui/icons-material/Search';
import Header from "@/components/Header";
import UploadCSV from "@/components/UploadCSV";
import { Data } from "@/types/data";
import { getData } from "@/services/backendCalls";
import Cards from "@/components/Cards";
import SkeletonComponent from "@/components/SkeletonComponent";
import {Search, SearchIconWrapper, StyledInputBase} from "../types/constants";
import { showToast } from "@/services/toast";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useTheme();
  const materialStyles = getStyles(theme);
  const[openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  const[data, setData] = useState<Data[]>([]);
  const[fetchingData, setFetchingData] = useState(true);
  const[searchTerm, setSearchTerm] = useState("");
  const[refreshState, setRefreshState] = useState(false);
  const handleRefreshState = () => setRefreshState(!refreshState)

  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      const response = await getData();
      if(response.status != 200){
        showToast("error", response.message);
      }
      setData(response.data);
      setFetchingData(false);
    };
    fetchData();

  },[refreshState])

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
        <UploadCSV handleCloseModal={handleCloseModal} handleRefreshState={handleRefreshState}/>
      </Modal>
      <Header onOpenModal={handleOpenModal} handleRefreshState={handleRefreshState}/>
      <Search>
          <SearchIconWrapper>
          <SearchIcon sx={{color: 'gray'}}/>
          </SearchIconWrapper>
          <StyledInputBase
          placeholder="Search…"
          inputProps={{ 'aria-label': 'search' }}
          onChange={e => setSearchTerm(e.target.value)}
          />
      </Search>
      {!fetchingData && (
        <Cards data={data} searchTerm={searchTerm} />
      )}
      {fetchingData && (
        <SkeletonComponent/>
      )}
    </Box>
  );
}
