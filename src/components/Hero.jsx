'use client'
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PeopleIcon from '@mui/icons-material/People';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StarIcon from '@mui/icons-material/Star';
import { styled, alpha, keyframes } from '@mui/material/styles';
import Image from 'next/image';
import { useMediaQuery } from '@mui/material';

// Keyframe animations
const float = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(2deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
`;

const slideInUp = keyframes`
  from { 
    opacity: 0; 
    transform: translateY(60px); 
  }
  to { 
    opacity: 1; 
    transform: translateY(0); 
  }
`;

const slideInRight = keyframes`
  from { 
    opacity: 0; 
    transform: translateX(60px); 
  }
  to { 
    opacity: 1; 
    transform: translateX(0); 
  }
`;

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  minHeight: '100vh',
  overflow: 'hidden',
  background: `
    radial-gradient(ellipse at top left, ${alpha('#FFD700', 0.1)} 0%, transparent 50%),
    radial-gradient(ellipse at bottom right, ${alpha('#7C3AED', 0.25)} 0%, transparent 50%),
    linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)
  `,
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(10),
  paddingLeft: theme.spacing(2), // Account for fixed navbar
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  zIndex: 3,
  animation: `${slideInUp} 1s ease-out`,
}));

const MainHeading = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2.5rem, 8vw, 5.5rem)',
  fontWeight: 900,
  lineHeight: 0.9,
  letterSpacing: '-0.03em',
  background: 'linear-gradient(135deg, #ffffff 0%, #FFD700 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  marginBottom: theme.spacing(1),
  textShadow: '0 4px 8px rgba(0,0,0,0.3)',
}));

const OutlineText = styled(Typography)(({ theme }) => ({
  fontSize: 'clamp(2rem, 7vw, 5rem)',
  fontWeight: 900,
  color: 'transparent',
  WebkitTextStroke: `2px ${alpha('#FFD700', 0.3)}`,
  lineHeight: 0.9,
  letterSpacing: '-0.03em',
  userSelect: 'none',
  position: 'relative',
  '&::after': {
    content: '"TRANSFORM YOUR LIFE"',
    position: 'absolute',
    top: 0,
    left: 0,
    background: `linear-gradient(90deg, ${alpha('#FFD700', 0.8)} 0%, transparent 100%)`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: `${pulse} 3s ease-in-out infinite`,
  },
}));

const SubText = styled(Typography)(({ theme }) => ({
  color: alpha('#ffffff', 0.8),
  fontSize: '1.125rem',
  lineHeight: 1.6,
  maxWidth: 600,
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(4),
}));

const PrimaryCTA = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  color: '#000',
  fontWeight: 700,
  fontSize: '1rem',
  textTransform: 'none',
  padding: theme.spacing(1.5, 4),
  borderRadius: theme.spacing(4),
  boxShadow: `0 8px 32px ${alpha('#FFD700', 0.4)}`,
  position: 'relative',
  overflow: 'hidden',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
    transition: 'left 0.6s ease',
  },
  
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 12px 40px ${alpha('#FFD700', 0.5)}`,
    '&::before': {
      left: '100%',
    },
  },
}));

const SecondaryCTA = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '1rem',
  padding: theme.spacing(1.5, 3),
  borderRadius: theme.spacing(4),
  border: `2px solid ${alpha('#FFD700', 0.3)}`,
  backdropFilter: 'blur(10px)',
  backgroundColor: alpha('#000', 0.2),
  transition: 'all 0.3s ease',
  
  '&:hover': {
    borderColor: '#FFD700',
    backgroundColor: alpha('#FFD700', 0.1),
    transform: 'translateY(-2px)',
  },
}));

const PlayButton = styled(IconButton)(({ theme }) => ({
  width: 64,
  height: 64,
  backgroundColor: alpha('#FFD700', 0.2),
  backdropFilter: 'blur(10px)',
  border: `2px solid ${alpha('#FFD700', 0.3)}`,
  color: '#FFD700',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    backgroundColor: alpha('#FFD700', 0.3),
    borderColor: '#FFD700',
    transform: 'scale(1.1)',
  },
  
  '& .MuiSvgIcon-root': {
    fontSize: 32,
    marginLeft: theme.spacing(0.5), // Center the play icon better
  },
}));

const StatsCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.spacing(2),
  background: alpha('#000', 0.4),
  backdropFilter: 'blur(20px)',
  border: `1px solid ${alpha('#FFD700', 0.1)}`,
  textAlign: 'center',
  transition: 'all 0.3s ease',
  
  '&:hover': {
    transform: 'translateY(-4px)',
    borderColor: alpha('#FFD700', 0.3),
    boxShadow: `0 8px 32px ${alpha('#FFD700', 0.2)}`,
  },
}));

const FloatingElement = styled(Box)(({ theme }) => ({
  position: 'absolute',
  animation: `${float} 6s ease-in-out infinite`,
  zIndex: 1,
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: { xs: 400, md: 600 },
  animation: `${slideInRight} 1s ease-out 0.3s both`,
}));

const GradientPanel = styled(Box)(({ theme }) => ({
  position: 'absolute',
  right: 0,
  top: '10%',
  bottom: '10%',
  width: { xs: '45%', md: '50%' },
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 50%, #FF8C00 100%)',
  borderRadius: theme.spacing(3),
  zIndex: 1,
  '&::before': {
    content: '""',
    position: 'absolute',
    inset: -2,
    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
    borderRadius: theme.spacing(3),
    filter: 'blur(20px)',
    opacity: 0.3,
    zIndex: -1,
  },
}));

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <HeroSection>
      {/* Floating decorative elements */}
      <FloatingElement sx={{ top: '20%', left: '10%', animationDelay: '0s' }}>
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: alpha('#FFD700', 0.1),
            border: `2px solid ${alpha('#FFD700', 0.2)}`,
          }}
        />
      </FloatingElement>

      <FloatingElement sx={{ top: '60%', right: '15%', animationDelay: '2s' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: alpha('#7C3AED', 0.1),
            border: `2px solid ${alpha('#7C3AED', 0.2)}`,
          }}
        />
      </FloatingElement>

      <ContentContainer maxWidth="xl">
        <Grid container spacing={6} alignItems="center" sx={{display:'flex', flexDirection: { xs: 'column', md: 'row' }, gap: {xs:32,md:0}}}>
          {/* Left Content */}
          <Grid item xs={12} lg={6} sx={{mt:'-100px'}}>
            <Box sx={{ color: '#fff' }}>
              
              {/* Badge */}
              <Chip
                label="🏆 #1 Fitness Center in Gurgaon"
                sx={{
                  background: alpha('#FFD700', 0.15),
                  color: '#FFD700',
                  fontWeight: 600,
                  border: `1px solid ${alpha('#FFD700', 0.3)}`,
                  mb: 3,
                  mt:{ xs: 8, md: 0 }
                }}
              />

              {/* Main Heading */}
              <MainHeading component="h1">
                BUILD YOUR BODY
              </MainHeading>

              {/* Outline Text */}
              <OutlineText aria-hidden>
                TRANSFORM YOUR LIFE
              </OutlineText>

              {/* Subtitle */}
              <SubText>
                Join the ultimate fitness journey with state-of-the-art equipment, 
                expert trainers, and a community that pushes you to achieve greatness. 
                Your transformation starts here.
              </SubText>

              {/* CTA Buttons */}
              <Box sx={{ 
                display: 'flex', 
                gap: 3, 
                alignItems: 'center',
                flexWrap: { xs: 'wrap', sm: 'nowrap' },
                mb: 5,
              }}>
                <PrimaryCTA size="large">
                  Start Your Journey
                </PrimaryCTA>

                {/* <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <PlayButton>
                    <PlayArrowIcon />
                  </PlayButton>
                  <Typography sx={{ 
                    color: 'rgba(255,255,255,0.9)', 
                    fontWeight: 600,
                    display: { xs: 'none', sm: 'block' }
                  }}>
                    Watch Success Stories
                  </Typography>
                </Box> */}
              </Box>

            
             
            </Box>
          </Grid>

          {/* Right Image Section */}
          <Grid item xs={12} lg={6}>
            <ImageContainer>
              
              {/* Gradient Panel */}
              <GradientPanel />

              {/* Hero Image */}
              <Box sx={{ 
                position: 'relative', 
                zIndex: 2, 
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pr: { xs: 2, md: 4 },
              }}>
                <Box
                  sx={{
                    position: 'absolute',
                    top:{xs:'-295px ',md:"-370px",xl:"-450px"},
                    left: { xs: '-260px', md:'-360px',xl:'-300px' },
                    width: { xs: '70%', md: '65%' },
                    height: '90%',
                    filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.3))',
                    
                  }}
                >
                  <Image
                    src={isMobile ? "/images/phone.png" : "/images/image.png"}
                    alt="Fitness transformation - professional athlete"
                    height={isMobile ? 470 : 800}
                    width={isMobile ? 500 : 1000}
                    priority
                    sizes="(max-width: 768px) 70vw, 35vw"
                  />
                </Box>
              </Box>

           

            </ImageContainer>
          </Grid>
        </Grid>
      </ContentContainer>

      {/* Enhanced Bottom Wave */}
      <Box sx={{ position: 'absolute',  bottom: -5, zIndex: 2,width: '1200px' , left:0}}>
        <svg 
          viewBox="0 0 1440 120" 
          xmlns="http://www.w3.org/2000/svg" 
          style={{ display: 'block', width: '100%', height: 100 }}
        >
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#FF8C00" />
            </linearGradient>
          </defs>
          <path 
            d="M0 60 C 360 160 1080 -40 1440 60 L1440 120 L0 120 Z" 
            fill="url(#waveGradient)" 
            opacity="0.8"
          />
          <path 
            d="M0 80 C 480 180 960 -20 1440 80 L1440 120 L0 120 Z" 
            fill="url(#waveGradient)" 
            opacity="0.4"
          />
        </svg>
      </Box>

      {/* Background Overlay */}
      <Box 
        sx={{ 
          position: 'absolute', 
          inset: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${alpha('#FFD700', 0.1)} 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${alpha('#7C3AED', 0.1)} 0%, transparent 50%),
            linear-gradient(135deg, transparent 0%, ${alpha('#000', 0.2)} 100%)
          `,
          zIndex: 1,
        }} 
      />
    </HeroSection>
  );
}