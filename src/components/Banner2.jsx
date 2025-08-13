'use client'
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled, keyframes } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';

/* --- Enhanced Keyframes --- */
const scrollLeft = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const scrollRight = keyframes`
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
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

/* --- Premium Black Band Container (responsive) --- */
const BandContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  height: 80,
  top: -20,
  left: 0,
  overflow: 'hidden',
  display: 'flex',
  alignItems: 'center',
  transformOrigin: 'center',
  transform: 'rotate(6deg)',
  zIndex: 0,
  background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #2d2d2d 40%, #1a1a1a 60%, #0a0a0a 100%)',
  backgroundSize: '300% 300%',
  animation: `${gradientFlow} 12s ease infinite`,
  boxShadow: `
    0 8px 32px rgba(0,0,0,0.6),
    inset 0 2px 4px rgba(255,255,255,0.05),
    inset 0 -2px 4px rgba(0,0,0,0.5)
  `,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    background: 'linear-gradient(90deg, transparent, #ffd700, #7C3AED, #ffd700, transparent)',
    animation: `${scrollLeft} 3s linear infinite, ${edgeGlow} 2s ease-in-out infinite`,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    background: 'linear-gradient(90deg, transparent, #ffd700, #7C3AED, #ffd700, transparent)',
    animation: `${scrollRight} 3s linear infinite, ${edgeGlow} 2s ease-in-out infinite`,
  },
  [theme.breakpoints.down('md')]: {
    height: 72,
    top: -12,
    transform: 'rotate(3deg)'
  },
  [theme.breakpoints.down('sm')]: {
    position: 'relative',
    height: 56,
    top: 0,
    transform: 'rotate(0deg)',
    borderRadius: theme.spacing(0.5),
    margin: theme.spacing(1, 0),
  }
}));

/* --- Scrolling lists (responsive) --- */
const ScrollingText = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  animation: `${scrollLeft} 30s linear infinite`,
  gap: 60,
  paddingLeft: 24,
  paddingRight: 24,
  [theme.breakpoints.down('md')]: {
    gap: 36,
    animationDuration: '26s',
  },
  [theme.breakpoints.down('sm')]: {
    gap: 20,
    animationDuration: '20s',
  }
}));

const TextItem = styled(Typography)(({ theme }) => ({
  color: '#ffffff',
  fontSize: '1.8rem',
  fontWeight: 800,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontFamily: '"Inter", "Roboto", "Arial", sans-serif',
  textShadow: `
    0 2px 4px rgba(0,0,0,0.7),
    0 0 20px rgba(255,255,255,0.06),
    0 4px 8px rgba(0,0,0,0.3)
  `,
  display: 'flex',
  alignItems: 'center',
  gap: 20,
  [theme.breakpoints.down('md')]: {
    fontSize: '1.4rem',
    letterSpacing: '0.12em',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.05rem',
    letterSpacing: '0.08em',
    fontWeight: 700,
  }
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  animation: `${pulseGlow} 2.6s ease-in-out infinite`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '& .MuiSvgIcon-root': {
    fontSize: '1.5rem',
    color: '#ffd700',
    filter: 'drop-shadow(0 0 8px rgba(255, 215, 0, 0.6))',
  },
  [theme.breakpoints.down('md')]: {
    '& .MuiSvgIcon-root': { fontSize: '1.2rem' }
  },
  [theme.breakpoints.down('sm')]: {
    '& .MuiSvgIcon-root': { fontSize: '1rem' }
  }
}));

/* --- Default single animated band --- */
export default function AnimatedBand() {
  const textItems = [
    'BENCH PRESS',
    'ANIMAL DUMBBELL',
    'PLATES',
    'CARDIO',
    'PLANK',
    'POWER LIFTING',
    'CROSSFIT',
    'YOGA FLOW',
    'HIIT TRAINING',
    'BODYBUILDING',
  ];

  const duplicatedItems = [...textItems, ...textItems];

  return (
    <BandContainer>
      <ScrollingText>
        {duplicatedItems.map((item, index) => (
          <React.Fragment key={index}>
            <TextItem>{item}</TextItem>
            <IconWrapper><StarIcon /></IconWrapper>
          </React.Fragment>
        ))}
      </ScrollingText>
    </BandContainer>
  );
}

/* --------------------------------------------------------
   Premium CrossBands component (responsive)
   -------------------------------------------------------- */
export function CrossBands({
  frontItems = [
    'CONDITIONING', 'ANIMAL FLOW', 'STRENGTH TRAINING', 'CARDIO BLAST', 'FUNCTIONAL FITNESS'
  ],
  backItems = [
    'POWER LIFTING', 'CROSSFIT', 'YOGA FLOW', 'HIIT TRAINING', 'BODYBUILDING'
  ],
}) {
  const frontDup = [...frontItems, ...frontItems];
  const backDup = [...backItems, ...backItems];

  const CrossWrapper = styled(Box)(({ theme }) => ({
    position: 'relative',
    width: '100%',
    height: 300,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    overflow: 'hidden',
    [theme.breakpoints.down('md')]: { height: 240 },
    [theme.breakpoints.down('sm')]: { height: 180 },
  }));

  const FrontBand = styled(BandContainer)(({ theme }) => ({
    width: '95%',
    height: 80,
    zIndex: 2,
    transform: 'rotate(-2deg)',
    background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 20%, #2d2d2d 40%, #1a1a1a 60%, #0a0a0a 100%)',
    [theme.breakpoints.down('md')]: { height: 72, transform: 'rotate(-1deg)' },
    [theme.breakpoints.down('sm')]: { height: 56, transform: 'rotate(0deg)', margin: theme.spacing(1,0) }
  }));

  const BackBand = styled(BandContainer)(({ theme }) => ({
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%) rotate(90deg)',
    width: '95%',
    height: 80,
    opacity: 0.92,
    zIndex: 1,
    background: 'linear-gradient(135deg, #1a0a0a 0%, #2a1a1a 20%, #3d2d2d 40%, #2a1a1a 60%, #1a0a0a 100%)',
    '&::before, &::after': {
      background: 'linear-gradient(90deg, transparent, #ff6b35, #ffd700, #ff6b35, transparent)',
    },
    [theme.breakpoints.down('md')]: { transform: 'translate(-50%, -50%) rotate(80deg)', width: '120%' },
    [theme.breakpoints.down('sm')]: { transform: 'translate(-50%, -50%) rotate(70deg)', width: '150%', height: 56 }
  }));

  const ScrollingTextBack = styled(ScrollingText)(({ theme }) => ({
    animation: `${scrollRight} 32s linear infinite`,
    gap: 48,
    [theme.breakpoints.down('md')]: { gap: 28 },
    [theme.breakpoints.down('sm')]: { gap: 18 }
  }));

  return (
    <CrossWrapper>
      {/* Back (rotated) band */}
      <BackBand>
        <ScrollingTextBack>
          {backDup.map((item, i) => (
            <React.Fragment key={'b-' + i}>
              <TextItem style={{ transform: 'rotate(90deg)' }}>{item}</TextItem>
              <IconWrapper style={{ transform: 'rotate(90deg)' }}><StarIcon /></IconWrapper>
            </React.Fragment>
          ))}
        </ScrollingTextBack>
      </BackBand>

      {/* Front (horizontal) band */}
      <FrontBand>
        <ScrollingText>
          {frontDup.map((item, i) => (
            <React.Fragment key={'f-' + i}>
              <TextItem>{item}</TextItem>
              <IconWrapper><StarIcon /></IconWrapper>
            </React.Fragment>
          ))}
        </ScrollingText>
      </FrontBand>
    </CrossWrapper>
  );
}
