'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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



const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
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
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
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
  width: 300,
  textAlign: 'center',
  transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  position: 'relative',
  overflow: 'hidden',
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
    transform: 'translateY(-8px) scale(1.02)',
    border: '1px solid rgba(255, 215, 0, 0.6)',
    boxShadow: `
      0 20px 40px rgba(0, 0, 0, 0.6),
      0 0 0 1px rgba(255, 215, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2)
    `,
    '&::before': {
      left: '100%',
    }
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
    transform: 'scale(1.1) rotateY(10deg)',
    animation: `${pulseGlow} 2s infinite`,
    '&::before': {
      opacity: 1,
    }
  }
}));

const CentralImageContainer = styled(Box)(() => ({
  position: 'relative',
  zIndex: 10,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: `${pulseGlow} 4s infinite`,
    zIndex: -1,
  }
}));

const FeatureCardPositioned = styled(FeatureCard)(({ position }) => ({
  position: 'absolute',
  animation: `${fadeInUp} 0.8s ease-out forwards`,
  animationDelay: position === 'top-left' ? '0.1s' : 
                  position === 'top-right' ? '0.2s' :
                  position === 'bottom-left' ? '0.3s' : '0.4s',
  ...(position === 'top-left' && {
    top: -40,
    left: -320,
    '@media (max-width: 1600px)': {
      left: -180,
    },
    '@media (max-width: 1500px)': {
      left: 60,
    },
  }),
  ...(position === 'top-right' && {
    top: -40,
    right: -120,
    '@media (max-width: 1600px)': {
      right: -180,
    },
    '@media (max-width: 1500px)': {
      right: 60,
    },
  }),
  ...(position === 'bottom-left' && {
    bottom: -40,
    left: -120,
    '@media (max-width: 1600px)': {
      left: -180,
    },
    '@media (max-width: 1500px)': {
      left: 60,
    },
  }),
  ...(position === 'bottom-right' && {
    bottom: -40,
    right: -120,
    '@media (max-width: 1600px)': {
      right: -180,
    },
    '@media (max-width: 1500px)': {
      right: 60,
    },
  }),
  '@media (max-width: 1400px)': {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    margin: '20px auto',
  },
}));

const ContentWrapper = styled(Box)(() => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 600,
}));

const MobileGrid = styled(Box)(() => ({
  display: 'none',
  '@media (max-width: 1200px)': {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: 32,
    marginTop: 100,
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 1fr',
    },
  },
}));

const StyledImage = styled(Box)(() => ({
  position: 'relative',
  filter: 'contrast(1.1) brightness(1.05)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    filter: 'contrast(1.15) brightness(1.1)',
  }
}));

const HeaderBox = styled(Box)(() => ({
  textAlign: 'center',
  marginBottom: 80,
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
      icon: <FitnessCenterIcon sx={{ fontSize: 36 }} />,
      title: 'Pro Equipment',
      text: 'State-of-the-art machines and equipment from leading brands, meticulously maintained for optimal performance and safety.',
      position: 'top-left'
    },
    {
      icon: <GroupIcon sx={{ fontSize: 36 }} />,
      title: 'Elite Coaches',
      text: 'Certified personal trainers with years of experience, dedicated to helping you achieve your fitness goals efficiently.',
      position: 'top-right'
    },
    {
      icon: <FavoriteIcon sx={{ fontSize: 36 }} />,
      title: 'Cardio Excellence',
      text: 'Comprehensive cardiovascular training programs designed to improve endurance, burn fat, and boost overall health.',
      position: 'bottom-left'
    },
    {
      icon: <AccessTimeIcon sx={{ fontSize: 36 }} />,
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
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4.5rem' },
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
              color: 'rgba(255, 255, 255, 0.7)',
              fontSize: '1.1rem',
              fontWeight: 300,
              letterSpacing: '0.1em',
              mb: 3,
              maxWidth: 600,
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
          
            <StyledImage
              component="img"
              src="images/why.png"
              alt="Premium fitness experience"
              sx={{
                width: { xs: 280, md: 380, lg: 720 },
                height: 'auto',
                objectFit: 'contain',
                borderRadius: 3,
              }}
            />
        

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
                      fontSize: '1.4rem',
                      background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography 
                    sx={{ 
                      color: 'rgba(255,255,255,0.8)', 
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
          <Box sx={{ display: { lg: 'none' }, position: 'absolute', inset: 0 }}>
            <MobileGrid>
              {features.map((feature, index) => (
                <FeatureCard key={index}>
                  <CardContent sx={{ p: 4 }}>
                    <IconWrap>
                      {feature.icon}
                    </IconWrap>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        fontWeight: 700, 
                        mb: 2,
                        fontSize: '1.4rem',
                        background: 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {feature.title}
                    </Typography>
                    <Typography 
                      sx={{ 
                        color: 'rgba(255,255,255,0.8)', 
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        fontWeight: 300,
                      }}
                    >
                      {feature.text}
                    </Typography>
                  </CardContent>
                </FeatureCard>
              ))}
            </MobileGrid>
          </Box>
        </ContentWrapper>
      </Container>
    </Section>
  );
}