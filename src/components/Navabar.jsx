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
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useRouter, usePathname } from "next/navigation";
import { styled, alpha } from "@mui/material/styles";
import Image from "next/image";

const navItems = [
  "/",
  "#why",
  "#pricing",
  "#gallery",
  "#testimonial",
];
const navLabels = ["Home", "Why Knightx", "Pricing", "Gallery", "Testimonial"];

// Styled components for premium look
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(0, 0, 0, 0.85)',
  backdropFilter: 'blur(20px)',
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&.scrolled': {
    backgroundColor: alpha('#000', 0.95),
    borderBottom: `1px solid ${alpha('#FFD700', 0.2)}`,
    boxShadow: `0 8px 32px ${alpha('#000', 0.3)}`,
  },
  
  '&.hidden': {
    transform: 'translateY(-100%)',
  }
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: '72px',
  display:'flex',
  justifyContent:'space-between',
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

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontSize: '16px',
  fontWeight: 600,
  padding: theme.spacing(1, 2),
  minWidth: 'auto',
  position: 'relative',
  borderRadius: theme.spacing(1),
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&.active::before': {
    width: '100%',
  },
  
  '&::before': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '0%',
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

const MobileMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  transition: 'all 0.2s ease',
  
  '&.selected': {
    backgroundColor: alpha('#FFD700', 0.1),
    borderLeft: `3px solid #FFD700`,
    '& .MuiTypography-root': {
      fontWeight: 700,
    },
  },
  
  '&:hover': {
    backgroundColor: alpha('#FFD700', 0.15),
    borderLeft: `3px solid #FFD700`,
  },
  
  '& .MuiTypography-root': {
    color: '#fff',
    fontWeight: 600,
  },
}));

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mounted, setMounted] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [hidden, setHidden] = React.useState(false);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  
  const open = Boolean(anchorEl);
  
  // Handle client-side mounting
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Handle scroll effects on client side only
  React.useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update scrolled state
      setScrolled(currentScrollY > 50);
      
      // Update hidden state (hide on scroll down, show on scroll up)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, lastScrollY]);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleNavigation = (href) => {
    handleMenuClose();
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      router.push(href);
    }
  };

  const handleLogoClick = () => {
    router.push('/');
  };

  // Show loading state during SSR to prevent hydration mismatch
  if (!mounted) {
    return (
      <StyledAppBar position="fixed" elevation={0}>
        <Container maxWidth="xl">
          <StyledToolbar disableGutters>
            <LogoContainer>
              <Box
                component="div"
                sx={{
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  backgroundColor: '#333',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {/* Placeholder for logo */}
              </Box>
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
                KnightX Fitness
              </Typography>
            </LogoContainer>
            
            <Box sx={{ display: { xs: "none", lg: "flex" }, gap: 1, alignItems: "center", ml: 'auto', mr: 4 }}>
              {navItems.map((href, i) => (
                <NavButton key={href}>
                  {navLabels[i]}
                </NavButton>
              ))}
            </Box>
            
            <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center" }}>
              <CTAButton variant="contained">
                Start Free Trial
              </CTAButton>
            </Box>
            
            <Box sx={{ display: { xs: "flex", lg: "none" } }}>
              <IconButton sx={{ color: "#fff", width: 48, height: 48 }}>
                <MenuIcon />
              </IconButton>
            </Box>
          </StyledToolbar>
        </Container>
      </StyledAppBar>
    );
  }

  return (
    <StyledAppBar 
      position="fixed" 
      elevation={0} 
      className={`${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}
    >
      <Container maxWidth="xl">
        <StyledToolbar disableGutters>
          
          {/* LOGO SECTION */}
          <LogoContainer onClick={handleLogoClick}>
            <Image 
              src="/images/logo.jpg" 
              alt="Gym logo" 
              height={50} 
              width={50} 
              style={{borderRadius: '50%'}}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <Box
              sx={{
                display: 'none',
                width: 50,
                height: 50,
                borderRadius: '50%',
                backgroundColor: '#FFD700',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography sx={{ color: '#000', fontWeight: 'bold' }}>K</Typography>
            </Box>
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
              KnightX
            </Typography>
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
              const isActive = href === '/' ? pathname === '/' : pathname.includes(href);
              return (
                <NavButton
                  key={href}
                  className={isActive ? 'active' : ''}
                  onClick={() => handleNavigation(href)}
                >
                  {label}
                </NavButton>
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
          <Box sx={{ display: { xs: "flex", lg: "none" } }}>
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
            {navItems.map((href, i) => {
              const isSelected = href === '/' ? pathname === '/' : pathname.includes(href);
              return (
                <MobileMenuItem
                  key={href}
                  onClick={() => handleNavigation(href)}
                  className={isSelected ? 'selected' : ''}
                >
                  <Typography variant="body1">
                    {navLabels[i]}
                  </Typography>
                </MobileMenuItem>
              );
            })}

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
  );
}