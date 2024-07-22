"use client"

import React, { useState, MouseEvent } from 'react';

import TeamLogo from "./TeamLogo";
import { Teko } from 'next/font/google'

import { AppBar, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, MenuItem, Stack, Box  } from "@mui/material";

import MenuIcon from '@mui/icons-material/Menu';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';



const teko = Teko({
  weight: '400', // if single weight, otherwise you use array like [400, 500, 700],
  style: 'normal', // if single style, otherwise you use array like ['normal', 'italic']
  subsets: ['latin'],
})



const pages: {label: string, menu: Array<string>}[] = [
  {label: 'News', menu: ['Latest', 'Men', 'Women', 'Academy', 'Features']}, 
  {label:'Teams', menu: ['Men', 'Women', 'Academy']}, 
  {label: 'Matches', menu: ['Men', 'Women', 'Academy']}, 
  {label: 'Gallery', menu: []}, 
  {label: 'Shop', menu: []}, 
  {label: 'About Us', menu: []}, 
  {label: 'Contact Us', menu: []}, 
  {label:'Sponsors', menu:[]} 
]


const Header = () => {


  // Start of variables and functions for naigations for cellphones etc
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
 
  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  // End of variables and functions for naigations for cellphones etc


  // Start of variables and functions for naigations for larger devices
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [submenuItems, setSubmenuItems] = useState<string[]>([]);
  // const [isMenuHovered, setIsMenuHovered] = useState(false);


  // const handleMenuClick = (event: React.MouseEvent<HTMLElement>, menuItems: string[]) => {
  //   setAnchorEl(event.currentTarget);
  //   setSubmenuItems(menuItems);

  // };

  // const handleClose = () => {
  //   if (!isMenuHovered) {
  //     setAnchorEl(null);
  //     setSubmenuItems([]);
  //   }

  // };

  // const handleMenuMouseEnter = () => {
  //   setIsMenuHovered(true);
  // };

  // const handleMenuMouseLeave = () => {
  //   setIsMenuHovered(false);
  //   handleClose();
  // };


  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const handleMouseOver = (event: MouseEvent<HTMLElement>, label: string) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(label);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };


  
  
  return (

    <Box >

      <AppBar position="sticky" sx={{margin: 'auto', width: {sm: 700 ,md: 900, lg: 1260}}}>
        <Container sx={{padding: 0}}>
          <Toolbar disableGutters sx={{ display: {md: 'flex'}, justifyContent: {md:'center'}}}>

            {/* Responsiveness for Larger Devices */}
            <Stack direction='column' justifyContent='center' display={{xs: 'none', md: 'inherit'}}>

              <Box padding={0} display='flex' justifyContent='center'>
                <TeamLogo width={180} height={150} />
              </Box>


              <Stack direction='row' spacing={4}>

              {pages.map((page) => (

                <div key={page.label}>
                  <Button
                    aria-controls={openMenu === page.label ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onMouseOver={(event) => handleMouseOver(event, page.label)}
                    onClick={handleClose} // To close the menu on click
                    color="inherit"
                  >
                    {page.label}
                  </Button>
                  {page.menu.length > 0 && (
                    <Menu
                      id="menu-list-grow"
                      anchorEl={anchorEl}
                      keepMounted
                      open={openMenu === page.label}
                      onClose={handleClose}
                      MenuListProps={{
                        onMouseLeave: handleClose,
                      }}
                    >
                      {page.menu.map((menuItem) => (
                        
                        <MenuItem key={menuItem} onClick={handleClose} sx={{ marginTop: 1}}>
                          <Typography variant='caption' fontSize={18} sx={{ fontWeight: 'semi-bold'}}>          
                            {menuItem}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </div>
              ))}

                  

              </Stack>

            </Stack>

            {/* Responsiveness for smartphones and smaller devices */}
            <Stack width='100%' direction='row' justifyContent='space-between' alignItems='center' display={{xs: 'inherit', md: 'none'}} >

              <Box paddingLeft={1}>
              <TeamLogo width={90} height={40} />
              </Box>

              <Box sx={{ display: { xs: 'flex', md: 'none' }}}>
                
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                    sx={{ font: 200}}
                  >
                    <MenuIcon sx={{ fontSize: '36px'}} />
                </IconButton>
      
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page, idx) => (
                      <MenuItem key={idx} onClick={handleCloseNavMenu}>
                        <Typography textAlign="center">{page.label}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
              </Box>

            </Stack>

          </Toolbar>

        </Container>
      </AppBar>

    </Box>
  );
}

export default Header;