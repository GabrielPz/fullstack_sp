import { useEffect, useState } from "react";
import { Box, Button, Card, InputBase, Modal, Stack, Typography, alpha, styled, useTheme } from "@mui/material";
import { getStyles } from "@/styles/styles";
import Header from "@/components/Header";
import UploadCSV from "@/components/UploadCSV";
import { CardsProps, Data } from "@/types/data";
import { getData } from "@/services/backendCalls";


export default function Cards({data, searchTerm}: CardsProps) {

    const filteredData = data.filter(row =>
        row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        row.favorite_sport.toLowerCase().includes(searchTerm.toLowerCase())
      );
    
    return (
        <Box gap={3}>
            {filteredData.map((row) => (
            <Card sx={{height: '10rem', marginTop: '1rem', padding: '1rem'}} elevation={5}>
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
