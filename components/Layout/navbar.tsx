import Link from "next/link";
import { AppBar, Box, Toolbar } from "@material-ui/core";
import { Add, Menu } from "@mui/icons-material";
import { IconButton, Button, Typography } from "@mui/material";

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/">
              <a>Article List</a>
            </Link>
          </Typography>

          <Link href='/create'>
            <Button color="inherit" variant="outlined" startIcon={<Add />}>
              Create Article
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}