'use client';

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Fade from '@mui/material/Fade';
import { styled, keyframes } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

/* Colors & Animations (kept from your original) */
const GOLD = '#FFD700';
const GOLD_DARK = '#B8860B';
const GOLD_LIGHT = '#FFF8DC';
const DARK_BG = '#0A0A0A';
const CARD_BG = 'rgba(20, 20, 20, 0.95)';
const BORDER_GOLD = 'rgba(255, 215, 0, 0.2)';

const shimmer = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
`;

/* Styled components with responsive tweaks */
const Wrap = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '8px clamp(12px, 4vw, 48px)',
  background: `linear-gradient(135deg, ${DARK_BG} 0%, rgba(15, 15, 15, 0.98) 50%, ${DARK_BG} 100%)`,
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, rgba(255, 215, 0, 0.03) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '48px',
  position: 'relative',
  maxWidth: '800px',
  padding: '0 8px',
  [theme.breakpoints.down('sm')]: {
    marginBottom: '28px'
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-16px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '4px',
    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
    borderRadius: '2px',
  }
}));

const TestimonialCard = styled(Box)(({ theme }) => ({
  width: 'min(1000px, 92vw)',
  maxWidth: 1000,
  borderRadius: '20px',
  padding: '40px 36px',
  background: CARD_BG,
  border: `2px solid ${BORDER_GOLD}`,
  boxShadow: `0 30px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.08)`,
  color: '#f8f8f8',
  position: 'relative',
  overflow: 'hidden',
  backdropFilter: 'blur(16px)',
  transition: 'all 0.36s cubic-bezier(0.4, 0, 0.2, 1)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.03), transparent)',
    transition: 'left 0.6s ease',
  },
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: `0 35px 100px rgba(0, 0, 0, 0.9), 0 0 50px rgba(255, 215, 0, 0.12)`,
    border: `2px solid ${GOLD}`,
    '&::before': {
      left: '100%',
    }
  },
  [theme.breakpoints.down('md')]: {
    padding: '28px 22px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 14px',
    borderRadius: '14px',
    width: '100%',
  }
}));

const QuoteIcon = styled(FormatQuoteIcon)(({ theme }) => ({
  position: 'absolute',
  top: '20px',
  left: '28px',
  fontSize: '3.6rem',
  color: GOLD,
  opacity: 0.22,
  transform: 'rotate(180deg)',
  zIndex: 1,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const Quote = styled(Typography)(({ theme }) => ({
  fontSize: '1.25rem',
  lineHeight: 1.6,
  color: '#E8E8E8',
  marginBottom: '28px',
  fontStyle: 'italic',
  fontWeight: 400,
  position: 'relative',
  zIndex: 2,
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.05rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.98rem',
    marginBottom: '18px',
  }
}));

const ProfileSection = styled(Stack)(({ theme }) => ({
  alignItems: 'center',
  position: 'relative',
  zIndex: 2,
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: '76px',
  height: '76px',
  border: `3px solid ${GOLD}`,
  boxShadow: `0 8px 25px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255, 215, 0, 0.18)`,
  animation: `${float} 3s ease-in-out infinite`,
  [theme.breakpoints.down('sm')]: {
    width: '60px',
    height: '60px',
  }
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  width: '56px',
  height: '56px',
  minWidth: '56px',
  background: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(8px)',
  border: `2px solid ${BORDER_GOLD}`,
  color: GOLD,
  transition: 'all 0.26s ease',
  '&:hover': {
    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
    color: '#000',
    transform: 'scale(1.06)',
    boxShadow: `0 8px 25px rgba(255, 215, 0, 0.28)`,
  },
  '&:disabled': {
    opacity: 0.32,
    cursor: 'not-allowed',
  },
  [theme.breakpoints.down('sm')]: {
    width: '44px',
    height: '44px',
    minWidth: '44px',
    left: 8,
    right: 8
  }
}));

const PaginationDot = styled('button')(({ active, theme }) => ({
  width: active ? '44px' : '12px',
  height: active ? '12px' : '12px',
  borderRadius: active ? '8px' : '50%',
  border: 'none',
  background: active
    ? `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`
    : 'rgba(255, 255, 255, 0.18)',
  cursor: 'pointer',
  transition: 'all 0.28s ease',
  position: 'relative',
  overflow: 'hidden',
  ...(active && {
    boxShadow: `0 4px 12px rgba(255, 215, 0, 0.36)`,
    animation: `${pulse} 2s ease-in-out infinite`,
  }),
  '&:hover': {
    transform: 'scale(1.15)',
    background: active ? `linear-gradient(90deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)` : 'rgba(255,255,255,0.38)'
  },
  [theme.breakpoints.down('sm')]: {
    width: active ? '36px' : '10px',
    height: '10px',
    borderRadius: active ? '8px' : '50%',
  }
}));

const RatingContainer = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 6,
  marginTop: '14px',
  [theme.breakpoints.down('sm')]: {
    gap: 4,
  }
}));

const StatsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '18px',
  right: '26px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'rgba(255, 215, 0, 0.08)',
  padding: '6px 12px',
  borderRadius: '16px',
  border: `1px solid ${BORDER_GOLD}`,
  [theme.breakpoints.down('sm')]: {
    position: 'static',
    marginTop: 12,
    marginBottom: -8,
    justifyContent: 'center',
    width: 'auto'
  }
}));

/* Default testimonials + helper */
const defaultTestimonials = [
  {
    quote: "Joining this fitness center completely transformed my life. The world-class equipment, expert trainers, and motivating atmosphere helped me achieve results I never thought possible. Every workout feels like a step closer to greatness.",
    name: 'Rohit Sharma',
    role: 'Marketing Manager',
    avatar: '/images/testi1.jpg',
    rating: 5,
    transformation: '15kg lost',
  },
  {
    quote: "Lost 12 kgs in 4 months with their personalized training plan. The trainers are incredibly motivational and the supportive community keeps me consistent. This place doesn't just build bodies, it builds confidence.",
    name: 'Ananya Kapoor',
    role: 'Graphic Designer',
    avatar: '/images/testi2.jpg',
    rating: 5,
    transformation: '12kg lost',
  },
  {
    quote: "Clean facilities, flexible hours, and real results that speak for themselves. The recovery zones helped me train smarter, not just harder. Highly recommend for anyone serious about their fitness journey.",
    name: 'Dev Patil',
    role: 'Software Engineer',
    avatar: '/images/testi3.jpg',
    rating: 4.5,
    transformation: '8kg muscle gain',
  },
  {
    quote: "After my injury, I thought my training days were over. The knowledgeable staff and specialized recovery programs got me back stronger than ever. Their expertise in rehabilitation is truly remarkable.",
    name: 'Maya Verma',
    role: 'Physiotherapist',
    avatar: '/images/testi4.jpg',
    rating: 5,
    transformation: 'Full recovery',
  },
];

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={`f-${i}`} sx={{ color: GOLD, fontSize: '1.25rem' }} />);
  }
  if (hasHalfStar) {
    stars.push(<StarHalfIcon key="half" sx={{ color: GOLD, fontSize: '1.25rem' }} />);
  }
  const emptyStars = 5 - Math.ceil(rating);
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarOutlineIcon key={`e-${i}`} sx={{ color: 'rgba(255, 215, 0, 0.28)', fontSize: '1.25rem' }} />);
  }
  return stars;
};

/* Component */
export default function PremiumGymTestimonials({
  testimonials = defaultTestimonials,
  autoplay = true,
  interval = 6000
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);
  const len = testimonials.length;
  const timerRef = useRef(null);

  // swipe refs
  const touchStartX = useRef(null);
  const touchCurrentX = useRef(null);

  useEffect(() => {
    if (!autoplay || paused || len <= 1) return;
    timerRef.current = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIndex((s) => (s + 1) % len);
        setFadeIn(true);
      }, 180);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoplay, paused, len, interval]);

  const navigateToTestimonial = (newIndex) => {
    if (newIndex === index) return;
    setFadeIn(false);
    setTimeout(() => {
      setIndex(newIndex);
      setFadeIn(true);
    }, 150);
  };

  const prev = () => navigateToTestimonial((index - 1 + len) % len);
  const next = () => navigateToTestimonial((index + 1) % len);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  /* Touch handlers for swipe */
  const onTouchStart = (e) => {
    setPaused(true);
    touchStartX.current = e.touches[0].clientX;
    touchCurrentX.current = e.touches[0].clientX;
  };
  const onTouchMove = (e) => {
    touchCurrentX.current = e.touches[0].clientX;
  };
  const onTouchEnd = () => {
    const start = touchStartX.current;
    const end = touchCurrentX.current;
    if (start == null || end == null) {
      setPaused(false);
      touchStartX.current = null;
      touchCurrentX.current = null;
      return;
    }
    const diff = start - end;
    const threshold = 50; // px
    if (diff > threshold) {
      // swipe left -> next
      next();
    } else if (diff < -threshold) {
      // swipe right -> prev
      prev();
    }
    setPaused(false);
    touchStartX.current = null;
    touchCurrentX.current = null;
  };

  const currentTestimonial = testimonials[index];

  return (
    <Wrap>
      <SectionHeader>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={1}>
          <EmojiEventsIcon sx={{ color: GOLD, fontSize: { xs: '2.2rem', md: '3rem' } }} />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              fontSize: { xs: '1.8rem', md: '3.2rem' }
            }}
          >
            SUCCESS STORIES
          </Typography>
        </Stack>
        <Typography
          variant="h6"
          sx={{
            color: '#CCCCCC',
            fontWeight: 400,
            lineHeight: 1.6,
            maxWidth: '600px',
            margin: '0 auto',
            fontSize: { xs: '0.92rem', md: '1rem' }
          }}
        >
          Real transformations from real people who chose to build their bodies and transform their lives
        </Typography>
      </SectionHeader>

      <Box sx={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
        {/* Prev Button */}
        <NavigationButton
          onClick={prev}
          sx={{
            position: 'absolute',
            left: { xs: '8px', md: '48px' },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4,
            display: { xs: 'none', md: 'flex' }
          }}
          aria-label="Previous testimonial"
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </NavigationButton>

        {/* Next Button */}
        <NavigationButton
          onClick={next}
          sx={{
            position: 'absolute',
            right: { xs: '8px', md: '48px' },
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 4,
            display: { xs: 'none', md: 'flex' }
            
          }}
          aria-label="Next testimonial"
        >
          <ArrowForwardIosIcon fontSize="small" />
        </NavigationButton>

        <Fade in={fadeIn} timeout={300}>
          <TestimonialCard
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label="Member testimonials"
          >
            <QuoteIcon />

            <StatsContainer >
              <EmojiEventsIcon sx={{ color: GOLD, fontSize: '1.1rem' }} />
              <Typography
                variant="caption"
                sx={{
                  color: GOLD,
                  fontWeight: 700,
                  fontSize: '0.8rem'
                }}
              >
                {currentTestimonial.transformation}
              </Typography>
            </StatsContainer>

            <Quote variant="body1" sx={{mt:2}}>"{currentTestimonial.quote}"</Quote>

            <ProfileSection direction="column" alignItems="center" spacing={1}>
              <StyledAvatar src={currentTestimonial.avatar} alt={currentTestimonial.name} />

              <Box sx={{ textAlign: 'center', mt: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 800,
                    color: '#fff',
                    mb: 0.25,
                    fontSize: { xs: '1rem', md: '1.25rem' }
                  }}
                >
                  {currentTestimonial.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: '#BBBBBB',
                    fontWeight: 500,
                    fontSize: { xs: '0.82rem', md: '0.95rem' }
                  }}
                >
                  {currentTestimonial.role}
                </Typography>
              </Box>

              <RatingContainer direction="row" spacing={0.5}>
                {renderStars(currentTestimonial.rating)}
                <Typography
                  variant="body2"
                  sx={{
                    color: GOLD,
                    ml: 1,
                    fontWeight: 600,
                    fontSize: { xs: '0.85rem', md: '0.95rem' }
                  }}
                >
                  {currentTestimonial.rating}/5
                </Typography>
              </RatingContainer>
            </ProfileSection>
          </TestimonialCard>
        </Fade>
      </Box>

      {/* Pagination */}
      <Stack
        direction="row"
        spacing={1.25}
        justifyContent="center"
        alignItems="center"
        sx={{ mt: { xs: 3, md: 5 }, mb: { xs: 1, md: 0 } }}
      >
        {testimonials.map((_, i) => (
          <PaginationDot
            key={i}
            active={i === index}
            onClick={() => navigateToTestimonial(i)}
            aria-label={`Go to testimonial ${i + 1}`}
          />
        ))}
      </Stack>

      {/* Progress indicator */}
      <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, color: '#888' }}>
        <Typography variant="caption" sx={{ fontSize: { xs: '0.75rem', md: '0.85rem' } }}>
          {index + 1} of {len}
        </Typography>
      </Box>
    </Wrap>
  );
}
