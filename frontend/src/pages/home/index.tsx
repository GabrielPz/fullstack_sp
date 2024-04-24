import { Inter } from "next/font/google";
import Grid from '@mui/material/Grid';
import { useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const theme = useTheme();
  const materialStyles = getStyles(theme);

  useEffect(() => {
    
  },[])

  return (
    <Box sx={{width: '100vw', height: '100vh', backgroundColor: 'red'}}>
      
    </Box>
  );
}
