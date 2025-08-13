'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import { styled, keyframes } from '@mui/material/styles';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import GroupIcon from '@mui/icons-material/Group';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;



const Section = styled(Box)(({ theme }) => ({
  background: `
    linear-gradient(135deg, 
      rgba(0, 0, 0, 0.95) 0%, 
      rgba(10, 10, 10, 0.98) 50%, 
      rgba(0, 0, 0, 0.95) 100%
    ),
    radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.05) 0%, transparent 70%)
  `,
  color: '#fff',
  position: 'relative',
  overflow: 'hidden',
  paddingTop: theme.spacing(10),
  paddingBottom: theme.spacing(8),
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      repeating-linear-gradient(
        90deg,
        transparent,
        transparent 98px,
        rgba(255, 215, 0, 0.03) 100px
      )
    `,
    pointerEvents: 'none',
  }
}));

const DividerLine = styled('div')(() => ({
  height: 4,
  width: 100,
  background: 'linear-gradient(90deg, transparent, #FFD700, transparent)',
  margin: '24px auto 0',
  borderRadius: 2,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 8,
    height: 8,
    background: '#FFD700',
    borderRadius: '50%',
    boxShadow: '0 0 10px rgba(255, 215, 0, 0.8)',
  }
}));

const FeatureCard = styled(Card)(({ theme }) => ({
  background: `
    linear-gradient(145deg, 
      rgba(255, 255, 255, 0.02) 0%, 
      rgba(255, 255, 255, 0.05) 50%, 
      rgba(255, 255, 255, 0.02) 100%
    )
  `,
  backdropFilter: 'blur(10px)',
  borderRadius: 20,
  border: '1px solid rgba(255, 215, 0, 0.3)',
  boxShadow: `
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 215, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1)
  `,
  width: 320,
  maxWidth: '100%',
  textAlign: 'center',
  transition: 'all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
  margin: '0 auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: -100,
    width: 100,
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.1), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-6px) scale(1.01)',
    border: '1px solid rgba(255, 215, 0, 0.6)',
    boxShadow: `
      0 20px 40px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 215, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    '&::before': {
      left: '100%',
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    borderRadius: 14,
    padding: theme.spacing(1),
  }
}));

const IconWrap = styled(Box)(({ theme }) => ({
  width: 80,
  height: 80,
  borderRadius: 20,
  border: '2px solid rgba(255, 215, 0, 0.4)',
  background: `
    linear-gradient(145deg, 
      rgba(255, 215, 0, 0.1) 0%, 
      rgba(255, 215, 0, 0.05) 100%
    )
  `,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 20px',
  color: '#FFD700',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&::before': {
    content: '""',
    position: 'absolute',
        inset: -2,
        background: 'linear-gradient(45deg, #FFD700, transparent, #FFD700)',
    borderRadius: 22,
    opacity: 0,
    transition: 'opacity 0.3s ease',
    zIndex: -1,
  },
  '&:hover': {
    transform: 'scale(1.06) rotateY(6deg)',
    '&::before': {
      opacity: 1,
    }
  },
  [theme.breakpoints.down('sm')]: {
    width: 56,
    height: 56,
    borderRadius: 14,
    marginBottom: 12,
  }
}));

const CentralImageContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    zIndex: -1,
  }
}));

const FeatureCardPositioned = styled(FeatureCard)(({ theme, position }) => ({
  position: 'absolute',
  animation: `${fadeInUp} 0.8s ease-out forwards`,
  animationDelay: position === 'top-left' ? '0.1s' : 
                  position === 'top-right' ? '0.2s' :
                  position === 'bottom-left' ? '0.3s' : '0.4s',
  ...(position === 'top-left' && {
    top: -40,
    left: -320,
    [theme.breakpoints.down('xl')]: {
      left: 60,
    },
    [theme.breakpoints.down('lg')]: {
      left: 60,
      top: -20,
    },
  }),
  ...(position === 'top-right' && {
    top: -40,
    right: -120,
    [theme.breakpoints.down('xl')]: {
      right: 60,
    },
    [theme.breakpoints.down('lg')]: {
      right: 60,
      top: -20,
    },
  }),
  ...(position === 'bottom-left' && {
    bottom: -40,
    left: -120,
    [theme.breakpoints.down('xl')]: {
      left: 60,
    },
    [theme.breakpoints.down('lg')]: {
      left: 60,
      bottom: -20,
    },
  }),
  ...(position === 'bottom-right' && {
    bottom: -40,
    right: -120,
    [theme.breakpoints.down('xl')]: {
      right: 60,
    },
    [theme.breakpoints.down('lg')]: {
      right: 60,
      bottom: -20,
    },
  }),
  [theme.breakpoints.down('md')]: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: `${theme.spacing(2)} auto`,
    width: '100%'
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 600,
  [theme.breakpoints.down('md')]: {
    minHeight: 'auto',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    flexDirection: 'column',
  }
}));

const StyledImage = styled('img')(({ theme }) => ({
  position: 'relative',
  filter: 'contrast(1.1) brightness(1.05)',
  transition: 'all 0.3s ease',
  display: 'block',
  width: 720,
  maxWidth: '100%',
  height: 'auto',
  borderRadius: 12,
  '&:hover': {
    transform: 'scale(1.02)',
    filter: 'contrast(1.15) brightness(1.1)',
  },
  [theme.breakpoints.down('md')]: {
    width: 320,
  },
  [theme.breakpoints.down('sm')]: {
    width: 280,
  }
}));

const HeaderBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: 48,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -20,
    left: '50%',
    transform: 'translateX(-50%)',
    width: 200,
    height: 1,
    background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)',
  }
}));

export default function WhyChoose() {
  const features = [
    {
      icon: <FitnessCenterIcon sx={{ fontSize: { xs: 22, md: 36 } }} />,
      title: 'Pro Equipment',
      text: 'State-of-the-art machines and equipment from leading brands, meticulously maintained for optimal performance and safety.',
      position: 'top-left'
    },
    {
      icon: <GroupIcon sx={{ fontSize: { xs: 22, md: 36 } }} />,
      title: 'Elite Coaches',
      text: 'Certified personal trainers with years of experience, dedicated to helping you achieve your fitness goals efficiently.',
      position: 'top-right'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: { xs: 22, md: 36 } }} />,
      title: 'Cardio Excellence',
      text: 'Comprehensive cardiovascular training programs designed to improve endurance, burn fat, and boost overall health.',
      position: 'bottom-left'
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: { xs: 22, md: 36 } }} />,
      title: 'Flexible Hours',
      text: '24/7 access with flexible membership plans that adapt to your busy lifestyle and training preferences.',
      position: 'bottom-right'
    }
  ];

  return (
    <Section component="section">
      <Container maxWidth="xl">
        {/* Header */}
        <HeaderBox>
          <Typography 
            variant="h1" 
            sx={{ 
              fontWeight: 800, 
              fontSize: { xs: '2rem', md: '3.5rem', lg: '4.5rem' },
              letterSpacing: '0.05em',
              mb: 1,
              background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #ffffff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              position: 'relative',
            }}
          >
            WHY CHOOSE US
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: { xs: '0.95rem', md: '1.1rem' },
              fontWeight: 300,
              letterSpacing: '0.08em',
              mb: 3,
              maxWidth: 720,
              mx: 'auto',
            }}
          >
            Experience the difference with premium facilities and personalized service
          </Typography>
          <DividerLine />
        </HeaderBox>

        {/* Content */}
        <ContentWrapper>
          {/* Central Image */}
          <CentralImageContainer>
            <StyledImage
              src={'/images/why.png'}
              alt="Premium fitness experience"
            />
          </CentralImageContainer>

          {/* Desktop Positioned Feature Cards */}
          <Box sx={{ display: { xs: 'none', lg: 'block' } }}>
            {features.map((feature, index) => (
              <FeatureCardPositioned key={index} position={feature.position}>
                <CardContent sx={{ p: 4 }}>
                  <IconWrap>
                    {feature.icon}
                  </IconWrap>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      fontWeight: 700, 
                      mb: 2,
                      fontSize: '1.25rem',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: 'rgba(255,255,255,0.9)', 
                      fontSize: '0.95rem',
                      lineHeight: 1.7,
                      fontWeight: 300,
                    }}
                  >
                    {feature.text}
                  </Typography>
                </CardContent>
              </FeatureCardPositioned>
            ))}
          </Box>

          {/* Mobile/Tablet Grid Layout */}
          <Box sx={{ display: { lg: 'none' }, width: '100%' }}>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <FeatureCard>
                    <CardContent sx={{ p: { xs: 2.5, sm: 3, md: 4 } }}>
                      <IconWrap>
                        {feature.icon}
                      </IconWrap>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 700, 
                          mb: 1.5,
                          fontSize: { xs: '1rem', md: '1.2rem' },
                          background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {feature.title}
                      </Typography>
                      <Typography 
                        sx={{ 
                          color: 'rgba(255,255,255,0.9)', 
                          fontSize: { xs: '0.85rem', md: '0.95rem' },
                          lineHeight: 1.6,
                          fontWeight: 300,
                        }}
                      >
                        {feature.text}
                      </Typography>
                    </CardContent>
                  </FeatureCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </ContentWrapper>
      </Container>
    </Section>
  );
}
