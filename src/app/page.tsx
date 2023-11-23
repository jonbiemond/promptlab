"use client";
import React from "react";
import ResponsiveSidebar from "../components/responsiveSidebar";
import { Grid, IconButton, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

// create home component
export default function Home() {


    return <ResponsiveSidebar >
        <Grid container>
            <Grid md={12}>
                <h1>Chat</h1>
            </Grid>
            <Grid direction="row" justifyContent="center" display="flex" md={12}>
                <TextField sx={{ width: "70%"}} />
                <IconButton size="large"><SendIcon fontSize="inherit"/></IconButton>
            </Grid>
        </Grid>
        </ResponsiveSidebar>;

}