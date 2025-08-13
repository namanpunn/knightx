'use client'
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Fade from "@mui/material/Fade";
import Slide from "@mui/material/Slide";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import Image from "next/image";
const navItems = [
  "/",
  "#why",
  "#pricing",
  "#gallery",
  "#pricing",
  "#testimonial",
];
const navLabels = ["Home", "Why Knightx", "Pricing", "Gallery", "Testimonial"];

// Styled components for premium look
const StyledAppBar = styled(AppBar)(({ theme, scrolled }) => ({
  backgroundColor: scrolled ? alpha('#000', 0.95) : 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(20px)',
  borderBottom: scrolled 
    ? `1px solid ${alpha('#FFD700', 0.2)}` 
    : '1px solid rgba(255,255,255,0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  boxShadow: scrolled 
    ? `0 8px 32px ${alpha('#000', 0.3)}` 
    : 'none',
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '72px',
  padding: theme.spacing(0, 3),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 6),
    minHeight: '80px',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
  cursor: 'pointer',
  transition: 'transform 0.2s ease',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const LogoBox = styled(Box)(({ theme }) => ({
  width: 48,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  borderRadius: theme.spacing(1),
  boxShadow: `0 4px 16px ${alpha('#FFD700', 0.3)}`,
  transition: 'all 0.3s ease',
  '&:hover': {
    boxShadow: `0 6px 24px ${alpha('#FFD700', 0.4)}`,
    transform: 'translateY(-1px)',
  },
}));

const NavButton = styled(Button)(({ theme, active }) => ({
  color: '#fff',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  minWidth: 'auto',
  position: 'relative',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: active ? '100%' : '0%',
    height: '3px',
    backgroundColor: '#FFD700',
    transform: 'translateX(-50%)',
    transition: 'width 0.3s ease',
    borderRadius: '2px 2px 0 0',
  },
  
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: alpha('#FFD700', 0.1),
    borderRadius: theme.spacing(1),
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  
  '&:hover': {
    backgroundColor: 'transparent',
    '&::before': {
      width: '100%',
    },
    '&::after': {
      opacity: 1,
    },
  },
}));

const CTAButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  color: '#000',
  fontWeight: 700,
  textTransform: 'none',
  padding: theme.spacing(1.2, 3),
  borderRadius: theme.spacing(3),
  boxShadow: `0 4px 16px ${alpha('#FFD700', 0.3)}`,
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&:hover': {
    background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
    boxShadow: `0 6px 24px ${alpha('#FFD700', 0.4)}`,
    transform: 'translateY(-2px)',
  },
}));

const MobileMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: alpha('#000', 0.95),
    backdropFilter: 'blur(20px)',
    border: `1px solid ${alpha('#FFD700', 0.2)}`,
    borderRadius: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1.5),
    minWidth: 280,
    boxShadow: `0 20px 40px ${alpha('#000', 0.5)}`,
  },
}));

const MobileMenuItem = styled(MenuItem)(({ theme, selected }) => ({
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  backgroundColor: selected ? alpha('#FFD700', 0.1) : 'transparent',
  borderLeft: selected ? `3px solid #FFD700` : '3px solid transparent',
  transition: 'all 0.2s ease',
  
  '&:hover': {
    backgroundColor: alpha('#FFD700', 0.15),
    borderLeft: `3px solid #FFD700`,
  },
  
  '& .MuiTypography-root': {
    color: '#fff',
    fontWeight: selected ? 700 : 600,
  },
}));

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  // Detect scroll for dynamic styling
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigation = (href) => {
    handleMenuClose();
    router.push(href);
  };

  return (
    <HideOnScroll>
      <StyledAppBar position="fixed" elevation={0} scrolled={scrollTrigger}>
        <Container maxWidth="xl">
          <StyledToolbar disableGutters>
            
            {/* LOGO SECTION */}
            <LogoContainer>
              <Link href="/" passHref>
                <Box
                  component="a"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >

                    <Image src="/images/logo.jpg" alt="Gym logo" height={50} width={50} style={{borderRadius: '50%'}}/>
        

                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: "#fff", 
                      fontWeight: 800,
                      fontSize: { xs: '1.5rem', md: '1.75rem' },
                      letterSpacing: '-0.02em',
                      ml:'8px'
                    }}
                  >
                    Knightx
                  </Typography>
                </Box>
              </Link>
            </LogoContainer>

            {/* DESKTOP NAVIGATION */}
            <Box 
              sx={{ 
                display: { xs: "none", lg: "flex" }, 
                gap: 1, 
                alignItems: "center",
                ml: 'auto',
                mr: 4,
              }}
            >
              {navItems.map((href, i) => {
                const label = navLabels[i];
                const isActive = router.pathname === href;
                return (
                  <Link key={href} href={href} passHref>
                    <NavButton
                      component="a"
                      active={isActive}
                    >
                      {label}
                    </NavButton>
                  </Link>
                );
              })}
            </Box>

            {/* DESKTOP CTA */}
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <CTAButton variant="contained">
                Start Free Trial
              </CTAButton>
            </Box>

            {/* MOBILE MENU BUTTON */}
            <Box sx={{ display: { xs: "flex", lg: "none" }, ml: '5rem' }}>
              <IconButton 
                onClick={handleMenuOpen} 
                aria-label="open menu" 
                sx={{ 
                  color: "#fff",
                  width: 48,
                  height: 48,
                  '&:hover': {
                    backgroundColor: alpha('#FFD700', 0.1),
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>

            {/* MOBILE MENU */}
            <MobileMenu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              TransitionComponent={Fade}
              transitionDuration={200}
            >
              {/* Close Button */}
              <Box sx={{ px: 2, py: 1, display: "flex", justifyContent: "flex-end" }}>
                <IconButton 
                  size="small" 
                  onClick={handleMenuClose}
                  sx={{ 
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: alpha('#FFD700', 0.1),
                    },
                  }}
                >
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Navigation Items */}
              {navItems.map((href, i) => (
                <MobileMenuItem
                  key={href}
                  onClick={() => handleNavigation(href)}
                  selected={router.pathname === href}
                >
                  <Typography variant="body1">
                    {navLabels[i]}
                  </Typography>
                </MobileMenuItem>
              ))}

              {/* Mobile CTA */}
              <Box sx={{ p: 2, pt: 1 }}>
                <CTAButton 
                  fullWidth 
                  onClick={handleMenuClose}
                  sx={{ py: 1.5 }}
                >
                  Start Free Trial
                </CTAButton>
              </Box>
            </MobileMenu>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    </HideOnScroll>
  );
}