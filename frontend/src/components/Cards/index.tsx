import { useEffect, useState } from "react";
import { Box, Button, Card, InputBase, Modal, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import Header from "@/components/Header";
import UploadCSV from "@/components/UploadCSV";
import { CardsProps, Data } from "@/types/data";
import { getData } from "@/services/backendCalls";


export default function Cards({data}: CardsProps) {

  return (
      <Box gap={3}>
        {data.map((row) => (
          <Card sx={{height: '10rem', marginTop: '1rem'}} elevation={5}>
            <Typography variant="h6" color="black">
                Name: {row.name}
            </Typography>
            <Typography variant="h6" color="black">
                City: {row.city}
            </Typography>
            <Typography variant="h6" color="black">
                Country: {row.country}
            </Typography>
            <Typography variant="h6" color="black">
                Favorite Sport: {row.favorite_sport}
            </Typography>
          </Card>
        ))}
      </Box>
  );
}
