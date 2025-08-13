'use client'
import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';

/* === ENHANCED KEYFRAMES === */
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
`;

const shimmerEffect = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const pulseGlow = keyframes`
  0%, 100% { 
    filter: drop-shadow(0 0 8px rgba(255,215,0,0.6));
    transform: scale(1);
  }
  50% { 
    filter: drop-shadow(0 0 20px rgba(255,215,0,0.9));
    transform: scale(1.08);
  }
`;

const gradientFlow = keyframes`
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
`;

const edgeGlow = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`;

/* === PREMIUM STYLED COMPONENTS === */

const PremiumBandContainer = styled(Box, { shouldForwardProp: (p) => p !== 'variant' })(({ theme, variant = 'primary' }) => ({
  position: 'relative',
  width: '100%',
  height: 100,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  transformOrigin: 'center',
  transform: 'rotate(-2.5deg)',
  zIndex: 10,
  borderRadius: theme.spacing(1),
  background: variant === 'primary'
    ? 'linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 20%, #2d1b69 40%, #4c1d95 60%, #1a1a3e 80%, #0a0a1f 100%)'
    : 'linear-gradient(135deg, #1a0a0a 0%, #3d1a00 20%, #8b3a00 40%, #cc4125 60%, #3d1a00 80%, #1a0a0a 100%)',
  backgroundSize: '300% 300%',
  animation: `${gradientFlow} 12s ease infinite`,
  boxShadow: `
    0 8px 32px rgba(0,0,0,0.4),
    inset 0 2px 4px rgba(255,255,255,0.1),
    inset 0 -2px 4px rgba(0,0,0,0.3)
  `,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    background: variant === 'primary'
      ? 'linear-gradient(90deg, transparent, #ffd700, #8b5cf6, #ffd700, transparent)'
      : 'linear-gradient(90deg, transparent, #ff6b35, #ffd700, #ff6b35, transparent)',
    animation: `${scrollLeft} 4s linear infinite, ${edgeGlow} 2s ease-in-out infinite`,
    borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 3,
    background: variant === 'primary'
      ? 'linear-gradient(90deg, transparent, #ffd700, #8b5cf6, #ffd700, transparent)'
      : 'linear-gradient(90deg, transparent, #ff6b35, #ffd700, #ff6b35, transparent)',
    animation: `${scrollRight} 4s linear infinite, ${edgeGlow} 2s ease-in-out infinite`,
    borderRadius: `0 0 ${theme.spacing(1)} ${theme.spacing(1)}`,
  },
  [theme.breakpoints.down('md')]: {
    height: 84,
    transform: 'rotate(-1.2deg)'
  },
  [theme.breakpoints.down('sm')]: {
    height: 72,
    transform: 'rotate(0deg)',
    borderRadius: theme.spacing(0.5),
  }
}));

const ShimmerOverlay = styled(Box, { shouldForwardProp: (p) => p !== 'variant' })(({ variant = 'primary' }) => ({
  position: 'absolute',
  inset: 0,
  background: variant === 'primary'
    ? 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 50%, transparent 100%)'
    : 'linear-gradient(90deg, transparent 0%, rgba(255,107,53,0.16) 50%, transparent 100%)',
  backgroundSize: '200% 100%',
  animation: `${shimmerEffect} 3s linear infinite`,
  opacity: 0.8,
  pointerEvents: 'none'
}));

const ScrollingContent = styled(Box, { shouldForwardProp: (p) => p !== 'speed' })(({ speed = 35 }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  animation: `${scrollLeft} ${speed}s linear infinite`,
  gap: 60,
  height: '100%',
  paddingLeft: 20,
  paddingRight: 20,
  '& > *': {
    pointerEvents: 'auto'
  }
}));

const WorkoutText = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '2rem',
  fontWeight: 900,
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
  textShadow: `
    0 2px 4px rgba(0,0,0,0.7),
    0 0 12px rgba(255,255,255,0.06),
    0 4px 8px rgba(0,0,0,0.3)
  `,
  display: 'flex',
  alignItems: 'center',
  gap: 12,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.4rem',
    letterSpacing: '0.08em'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.05rem',
    letterSpacing: '0.06em',
    fontWeight: 800
  }
}));

const AnimatedIcon = styled(Box)(({ color = '#ffd700', theme }) => ({
  color: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  animation: `${pulseGlow} 3s ease-in-out infinite`,
  '& .MuiSvgIcon-root': {
    fontSize: '2rem',
    filter: `drop-shadow(0 0 12px ${color}90)`,
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiSvgIcon-root': { fontSize: '1.6rem' }
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
  }
}));

const CrossBandWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 400,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  overflow: 'hidden',
  [theme.breakpoints.down('md')]: {
    height: 300
  },
  [theme.breakpoints.down('sm')]: {
    height: 220
  }
}));

const VerticalBand = styled(PremiumBandContainer)(({ theme }) => ({
  position: 'absolute',
  left: '50%',
  top: '50%',
  transform: 'translate(-50%, -50%) rotate(88deg)',
  width: '120%',
  height: 100,
  opacity: 0.92,
  zIndex: 5,
  [theme.breakpoints.down('md')]: {
    transform: 'translate(-50%, -50%) rotate(80deg)',
    width: '140%'
  },
  [theme.breakpoints.down('sm')]: {
    transform: 'translate(-50%, -50%) rotate(72deg)',
    width: '170%',
    height: 72,
    opacity: 0.95
  }
}));

const HorizontalBand = styled(PremiumBandContainer)(({ theme }) => ({
  width: '95%',
  height: 100,
  zIndex: 15,
  transform: 'rotate(-1.5deg)',
  [theme.breakpoints.down('md')]: {
    width: '98%',
    height: 84,
    transform: 'rotate(-0.8deg)'
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 72,
    transform: 'rotate(0deg)'
  }
}));

/* === PREMIUM BANNER COMPONENT === */
export default function PremiumGymBanner({ 
  variant = 'primary', 
  speed = 35,
  customItems = null 
}) {
  const iconMap = {
    'STRENGTH TRAINING': <FitnessCenterIcon />, 
    'HIIT WORKOUTS': <FlashOnIcon />, 
    'PERSONAL TRAINING': <AccessibilityNewIcon />, 
    'GROUP CLASSES': <SelfImprovementIcon />, 
    'FUNCTIONAL FITNESS': <FitnessCenterIcon />, 
    'CARDIO ZONE': <DirectionsRunIcon />, 
    'POWERLIFTING': <FitnessCenterIcon />, 
    'YOGA & PILATES': <SelfImprovementIcon />, 
    'CROSSFIT': <FlashOnIcon />, 
    'BODYBUILDING': <FitnessCenterIcon />, 
    'CONDITIONING': <FlashOnIcon />, 
    'ANIMAL FLOW': <AccessibilityNewIcon />,
  };

  const defaultItems = variant === 'primary' ? [
    'STRENGTH TRAINING',
    'HIIT WORKOUTS', 
    'PERSONAL TRAINING',
    'GROUP CLASSES',
    'FUNCTIONAL FITNESS',
    'CARDIO ZONE',
    'POWERLIFTING',
    'YOGA & PILATES'
  ] : [
    'CROSSFIT',
    'BODYBUILDING', 
    'CONDITIONING',
    'ANIMAL FLOW',
    'POWERLIFTING',
    'HIIT WORKOUTS',
    'FUNCTIONAL FITNESS',
    'STRENGTH TRAINING'
  ];

  const textItems = customItems || defaultItems;
  const duplicatedItems = [...textItems, ...textItems];

  return (
    <PremiumBandContainer variant={variant}>
      <ShimmerOverlay variant={variant} />
      
      <ScrollingContent speed={speed}>
        {duplicatedItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2.5, md: 3 } }}>
            <WorkoutText sx={{ fontSize: { xs: '0.95rem', sm: '1.1rem', md: '1.6rem' } }}>
              {item}
            </WorkoutText>
            <AnimatedIcon color={variant === 'primary' ? '#ffd700' : '#ff6b35'}>
              {iconMap[item] || <StarIcon />}
            </AnimatedIcon>
          </Box>
        ))}
      </ScrollingContent>
    </PremiumBandContainer>
  );
}

/* === PREMIUM CROSS BANDS COMPONENT === */
export function PremiumCrossBands({
  frontItems = [
    'ELITE TRAINING',
    'PREMIUM EQUIPMENT', 
    'EXPERT COACHES',
    'RESULTS GUARANTEED'
  ],
  backItems = [
    'TRANSFORM YOUR BODY',
    'UNLEASH POTENTIAL',
    'EXCEED LIMITS'
  ],
  frontSpeed = 30,
  backSpeed = 40
}) {
  const iconMap = {
    'ELITE TRAINING': <FitnessCenterIcon />,
    'PREMIUM EQUIPMENT': <FitnessCenterIcon />,
    'EXPERT COACHES': <AccessibilityNewIcon />,
    'RESULTS GUARANTEED': <StarIcon />,
    'TRANSFORM YOUR BODY': <FlashOnIcon />,
    'UNLEASH POTENTIAL': <AccessibilityNewIcon />,
    'EXCEED LIMITS': <StarIcon />,
  };

  const frontDup = [...frontItems, ...frontItems];
  const backDup = [...backItems, ...backItems];

  return (
    <CrossBandWrapper>
      {/* Vertical Background Band */}
      <VerticalBand variant="secondary">
        <ShimmerOverlay variant="secondary" />
        <ScrollingContent 
          speed={backSpeed}
          sx={{ animation: `${scrollRight} ${backSpeed}s linear infinite`, gap: { xs: 20, sm: 36, md: 48 } }}
        >
          {backDup.map((item, i) => (
            <Box 
              key={`back-${i}`} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: { xs: 1.5, sm: 3 },
                transform: 'rotate(90deg)',
                pointerEvents: 'auto'
              }}
            >
              <WorkoutText sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem', md: '1.8rem' } }}>
                {item}
              </WorkoutText>
              <AnimatedIcon color="#ff6b35" />
            </Box>
          ))}
        </ScrollingContent>
      </VerticalBand>

      {/* Horizontal Front Band */}
      <HorizontalBand variant="primary">
        <ShimmerOverlay variant="primary" />
        <ScrollingContent speed={frontSpeed}>
          {frontDup.map((item, i) => (
            <Box key={`front-${i}`} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 } }}>
              <WorkoutText sx={{ fontSize: { xs: '0.95rem', sm: '1.2rem', md: '1.6rem' } }}>
                {item}
              </WorkoutText>
              <AnimatedIcon color="#ffd700">
                {iconMap[item] || <StarIcon />}
              </AnimatedIcon>
            </Box>
          ))}
        </ScrollingContent>
      </HorizontalBand>
    </CrossBandWrapper>
  );
}

/* === COMPACT BANNER VARIANT === */
export function CompactGymBanner({ 
  items = ['FITNESS', 'STRENGTH', 'POWER', 'ENDURANCE'],
  height = 60,
  speed = 25 
}) {
  const duplicatedItems = [...items, ...items];

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        transform: 'rotate(-1deg)',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #1a1a2e 100%)',
        backgroundSize: '200% 200%',
        animation: `${gradientFlow} 8s ease infinite`,
        borderRadius: 1,
        boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: 'linear-gradient(90deg, transparent, #4c1d95, transparent)',
          animation: `${scrollLeft} 3s linear infinite`,
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          animation: `${scrollLeft} ${speed}s linear infinite`,
          gap: { xs: 4, sm: 6 }
        }}
      >
        {duplicatedItems.map((item, index) => (
          <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography
              sx={{
                color: 'white',
                fontSize: { xs: '0.95rem', sm: '1.2rem' },
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                textShadow: '0 2px 4px rgba(0,0,0,0.5)',
              }}
            >
              {item}
            </Typography>
            <StarIcon 
              sx={{ 
                color: '#ffd700', 
                fontSize: { xs: '0.9rem', sm: '1rem' },
                filter: 'drop-shadow(0 0 6px rgba(255,215,0,0.6))',
              }} 
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
