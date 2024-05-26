import React from 'react';
import { FormControl, InputAdornment, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const SearchInput = () => {
    return (
        <>
            <FormControl >
                <TextField 
                    size="small"
                    variant="outlined"
                    placeholder="Buscar usuario"
                    sx={{marginLeft: '20px', width: '200px', height:'30px', top: '-5px'}}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                        style: {
                            borderRadius: "30px",
                          }
                    }}
                />
            </FormControl>
        </>
    )
}