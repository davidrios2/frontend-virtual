// eslint-disable-next-line import/order
import React from "react"

import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"

const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Singapur Airline
          </Typography>
          <div className="flex items-center gap-4">{children}</div>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default Navbar
