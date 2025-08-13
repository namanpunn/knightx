"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Badge from '@mui/material/Badge';
import { styled, useTheme, alpha } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';


const defaultImages = [
  { src: '/images/gym1.webp', alt: 'Athlete lifting dumbbells', title: 'Strength Training', caption: 'High-intensity strength training with professional equipment.', tags: ['strength', 'equipment'], featured: true },
  { src: '/images/gym2.webp', alt: 'Treadmills at the gym', title: 'Cardio Zone', caption: 'State-of-the-art cardio machines for optimal performance.', tags: ['cardio'], featured: false },
  { src: '/images/gym3.webp', alt: 'Trainer coaching client', title: 'Personal Training', caption: 'Elite coaches to guide your transformation journey.', tags: ['coaching', 'staff'], featured: true },
  { src: '/images/gym4.webp', alt: 'Close up of a kettlebell', title: 'Pro Equipment', caption: 'Top-tier free weights and professional rigs.', tags: ['equipment'], featured: false },
  { src: '/images/gym5.webp', alt: 'Group fitness class', title: 'Group Classes', caption: 'Dynamic group training sessions for all levels.', tags: ['classes'], featured: false },
  { src: '/images/gym6.webp', alt: 'Gym interior with lighting', title: 'Premium Studio', caption: 'Luxury studio space with perfect ambience.', tags: ['studio', 'ambience'], featured: true },
  { src: '/images/gym7.webp', alt: 'Athlete stretching', title: 'Recovery Zone', caption: 'Dedicated stretching and recovery areas.', tags: ['recovery'], featured: false },
  { src: '/images/gym8.webp', alt: 'Barbells lined up', title: 'Olympic Station', caption: 'Professional Olympic bars and power racks.', tags: ['strength', 'equipment'], featured: false },
];

// Premium color palette
const GOLD = '#FFD700';
const GOLD_DARK = '#B8860B';
const GOLD_LIGHT = '#FFF8DC';
const DARK_BG = '#0A0A0A';
const CARD_BG = 'rgba(20, 20, 20, 0.8)';
const BORDER_GOLD = 'rgba(255, 215, 0, 0.2)';

const GalleryWrap = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '60px clamp(20px, 5vw, 100px)',
  background: `linear-gradient(135deg, ${DARK_BG} 0%, rgba(20, 20, 20, 0.95) 50%, ${DARK_BG} 100%)`,
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at top center, rgba(255, 215, 0, 0.03) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: '50px',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-15px',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80px',
    height: '3px',
    background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`,
    borderRadius: '2px',
  }
}));

const FilterContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'center',
  marginBottom: '40px',
  padding: '20px',
  background: 'rgba(0, 0, 0, 0.3)',
  borderRadius: '20px',
  border: `1px solid ${BORDER_GOLD}`,
  backdropFilter: 'blur(10px)',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: '12px',
  }
}));

const FilterChip = styled(Chip)(({ active, theme }) => ({
  borderRadius: '25px',
  padding: '8px 5px',
  height: '45px',
  fontWeight: 700,
  fontSize: '0.9rem',
  textTransform: 'uppercase',
  letterSpacing: '0.5px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  cursor: 'pointer',
  position: 'relative',
  overflow: 'hidden',
  
  ...(active ? {
    color: '#000',
    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
    border: `2px solid ${GOLD}`,
    boxShadow: `0 8px 25px rgba(255, 215, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
    transform: 'translateY(-2px)',
  } : {
    color: '#E0E0E0',
    background: 'rgba(30, 30, 30, 0.6)',
    border: '2px solid rgba(255, 215, 0, 0.1)',
    '&:hover': {
      background: 'rgba(255, 215, 0, 0.1)',
      border: `2px solid ${BORDER_GOLD}`,
      transform: 'translateY(-1px)',
      color: GOLD_LIGHT,
    }
  }),
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    transition: 'left 0.5s ease',
  },
  '&:hover::before': {
    left: '100%',
  }
}));

const CardRoot = styled(Card)(({ featured, theme }) => ({
  borderRadius: '20px',
  overflow: 'hidden',
  background: CARD_BG,
  border: featured ? `2px solid ${GOLD}` : `1px solid ${BORDER_GOLD}`,
  boxShadow: featured 
    ? `0 20px 40px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 215, 0, 0.2)`
    : '0 15px 35px rgba(0, 0, 0, 0.7)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: featured 
      ? 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, transparent 50%)'
      : 'transparent',
    pointerEvents: 'none',
    zIndex: 1,
  },
  
  '&:hover': {
    transform: 'translateY(-12px) scale(1.02)',
    boxShadow: `0 30px 60px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 215, 0, 0.15)`,
    border: `2px solid ${GOLD}`,
    
    '& .image-overlay': {
      opacity: 1,
      transform: 'translateY(0)',
    },
    
    '& .play-button': {
      opacity: 1,
      transform: 'translate(-50%, -50%) scale(1)',
    }
  }
}));

const ImgWrap = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.05) 0%, transparent 70%)',
  
  '& img': {
    transition: 'transform 0.4s ease-out',
  },
  
  '&:hover img': {
    transform: 'scale(1.1)',
  }
}));

const ImageOverlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  padding: '10px 20px',
  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.9) 100%)',
  backdropFilter: 'blur(10px)',
  transform: 'translateY(10px)',
  opacity: 0,
  transition: 'all 0.3s ease-out',
  zIndex: 2,
}));


const FeaturedBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    top: '15px',
    right: '15px',
    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
    color: '#000',
    fontWeight: 'bold',
    fontSize: '0.55rem',
    padding: '8px 12px',
    borderRadius: '20px',
    border: '2px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
  }
}));

const LightboxContent = styled(DialogContent)(({ theme }) => ({
  padding: 0,
  background: 'rgba(0, 0, 0, 0.95)',
  backdropFilter: 'blur(20px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  minHeight: '100vh',
}));

const LightboxImage = styled(Box)(({ theme }) => ({
  borderRadius: '15px',
  overflow: 'hidden',
  border: `2px solid ${GOLD}`,
  boxShadow: `0 0 50px rgba(255, 215, 0, 0.3)`,
  background: 'rgba(10, 10, 10, 0.8)',
}));

const NavigationButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '60px',
  height: '60px',
  background: 'rgba(0, 0, 0, 0.7)',
  backdropFilter: 'blur(10px)',
  border: `2px solid ${BORDER_GOLD}`,
  color: GOLD,
  transition: 'all 0.3s ease',
  zIndex: 10,
  
  '&:hover': {
    background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
    color: '#000',
    transform: 'translateY(-50%) scale(1.1)',
  }
}));

const PaginationDot = styled(Box)(({ active, theme }) => ({
  width: active ? '40px' : '12px',
  height: '12px',
  borderRadius: '6px',
  background: active 
    ? `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`
    : 'rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  border: active ? '2px solid rgba(255, 215, 0, 0.5)' : 'none',
  
  '&:hover': {
    background: active 
      ? `linear-gradient(90deg, ${GOLD_LIGHT} 0%, ${GOLD} 100%)`
      : 'rgba(255, 255, 255, 0.5)',
    transform: 'scale(1.2)',
  }
}));

export default function PremiumGymGallery({ images = defaultImages, initialFilter = 'All' }) {
  const theme = useTheme();
  const [filter, setFilter] = useState(initialFilter);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const lightboxRef = useRef();

  const tags = Array.from(new Set(['All', ...images.flatMap((i) => i.tags || [])]));
  const filtered = images.filter((img) => filter === 'All' || (img.tags || []).includes(filter));
  const hasImages = filtered.length > 0;
  const current = hasImages ? filtered[index] : null;

  const openAt = useCallback((i) => {
    const idx = Math.max(0, Math.min(i, Math.max(0, filtered.length - 1)));
    setIndex(idx);
    setOpen(true);
  }, [filtered.length]);

  const close = useCallback(() => setOpen(false), []);

  // Keyboard navigation
  useEffect(() => {
    if (!open || !hasImages) return;
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') setIndex((s) => (filtered.length ? (s - 1 + filtered.length) % filtered.length : 0));
      if (e.key === 'ArrowRight') setIndex((s) => (filtered.length ? (s + 1) % filtered.length : 0));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, filtered.length, close, hasImages]);

  useEffect(() => {
    if (!hasImages) {
      setIndex(0);
    } else if (index >= filtered.length) {
      setIndex(0);
    }
  }, [filter, filtered.length, index, hasImages]);

  const handleSetFilter = (t) => {
    const candidate = images.filter((img) => t === 'All' || (img.tags || []).includes(t));
    if (candidate.length === 0) return;
    setFilter(t);
    setIndex(0);
    if (open && candidate.length === 0) setOpen(false);
  };

  return (
    <GalleryWrap>
      <SectionHeader>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>
          <FitnessCenterIcon sx={{ color: GOLD, fontSize: '2.5rem' }} />
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 900, 
              background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_LIGHT} 100%)`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.02em',
              textAlign: 'center',
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            GALLERY
          </Typography>
        </Stack>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#CCCCCC', 
            fontWeight: 400,
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}
        >
          Experience our world-class facilities, cutting-edge equipment, and transformation stories
        </Typography>
      </SectionHeader>

      <FilterContainer direction="row" spacing={2} alignItems="center" sx={{display:{xs:'none', md:'flex'}}}>
        {tags.map((tag) => (
          <FilterChip
            key={tag}
            label={tag}
            active={filter === tag ? 1 : 0}
            onClick={() => handleSetFilter(tag)}
            icon={tag === 'All' ? <StarIcon /> : null}
          />
        ))}
      </FilterContainer>

      <Grid container spacing={{ xs: 3, md: 3 }} sx={{display: 'flex', justifyContent: 'center'}}>
        {filtered.map((img, i) => (
          <Grid key={img.src + i} item xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex', justifyContent: 'center' }}>
            <FeaturedBadge 
              badgeContent={img.featured ? "FEATURED" : null}
              invisible={!img.featured}
            >
              <CardRoot featured={img.featured}>
                <CardActionArea onClick={() => openAt(i)} sx={{ position: 'relative', height: '100%' }}>
                  <ImgWrap>
                    <Image
                      src={img.src}
                      alt={img.alt || 'Gallery image'}
                      width={300}
                      height={260}
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 33vw"
                      priority={img.featured}
                    />
                    
                    
                    
                    <ImageOverlay className="image-overlay">
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: '#fff', 
                          fontWeight: 800,
                          marginBottom: '8px',
                          fontSize: '1.1rem'
                        }}
                      >
                        {img.title || ''}
                      </Typography>
                      
                      {img.caption && (
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#E0E0E0',
                            marginBottom: '12px',
                            lineHeight: 1.4
                          }}
                        >
                          {img.caption}
                        </Typography>
                      )}
                      
                      <Stack direction="row" spacing={1} flexWrap="wrap">
                        {(img.tags || []).slice(0, 2).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              bgcolor: 'rgba(255, 215, 0, 0.1)',
                              color: GOLD,
                              border: `1px solid ${BORDER_GOLD}`,
                              fontWeight: 600,
                              fontSize: '0.7rem'
                            }}
                          />
                        ))}
                      </Stack>
                    </ImageOverlay>
                  </ImgWrap>
                </CardActionArea>
              </CardRoot>
            </FeaturedBadge>
          </Grid>
        ))}
      </Grid>

      {/* Enhanced Lightbox */}
      <Dialog
        open={open && hasImages}
        onClose={close}
        maxWidth={false}
        fullScreen
        PaperProps={{
          sx: {
            background: 'rgba(0, 0, 0, 0.95)',
            backdropFilter: 'blur(20px)',
            height:{xs:'95vh', md:'100vh'}
          },
        }}
      >
        <LightboxContent>
          <IconButton 
            onClick={close}
            sx={{
              position: 'absolute',
              top: 30,
              right: 30,
              width: '50px',
              height: '50px',
              background: 'rgba(0, 0, 0, 0.7)',
              border: `2px solid ${BORDER_GOLD}`,
              color: GOLD,
              zIndex: 10,
              '&:hover': {
                background: `linear-gradient(135deg, ${GOLD} 0%, ${GOLD_DARK} 100%)`,
                color: '#000'
              }
            }}
          >
            <CloseIcon />
          </IconButton>

          <NavigationButton
            onClick={() => setIndex((s) => (filtered.length ? (s - 1 + filtered.length) % filtered.length : 0))}
            sx={{ left: 30 }}
          >
            <ArrowBackIosNewIcon />
          </NavigationButton>

          <NavigationButton
            onClick={() => setIndex((s) => (filtered.length ? (s + 1) % filtered.length : 0))}
            sx={{ right: 30 }}
          >
            <ArrowForwardIosIcon />
          </NavigationButton>

          {hasImages && current && (
            <Box sx={{ 
              width: { xs: '90vw', md: '85vw' }, 
              maxWidth: 1200, 
              margin: '0 auto'
            }}>
              <LightboxImage>
                <Box sx={{ 
                  position: 'relative', 
                  height: { xs: '50vh', md: '70vh' },
                  minHeight: '400px'
                }}>
                  <Image
                    src={current.src}
                    alt={current.alt || 'Gallery image enlarged'}
                    fill
                    style={{ objectFit: 'contain' }}
                    sizes="100vw"
                    priority
                  />
                </Box>

                <Box sx={{ 
                  p: 4, 
                  background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.9) 100%)',
                  backdropFilter: 'blur(10px)'
                }}>
                  <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'center' }} spacing={2}>
                    <Box>
                      <Typography 
                        variant="h4" 
                        sx={{ 
                          color: GOLD, 
                          fontWeight: 800,
                          marginBottom: '8px',
                          display:{xs:'none', md:'block'}
                        }}
                      >
                        {current.title || ''}
                      </Typography>
                      {current.caption && (
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#E0E0E0',
                            lineHeight: 1.6,
                             display:{xs:'none', md:'block'}
                          }}
                        >
                          {current.caption}
                        </Typography>
                      )}
                    </Box>

                    <Stack direction="row" spacing={1} alignItems="center">
                      {(current.tags || []).map((tag) => (
                        <Chip 
                          key={tag} 
                          label={tag} 
                          sx={{ 
                            color: GOLD, 
                            border: `1px solid ${BORDER_GOLD}`, 
                            bgcolor: 'rgba(255, 215, 0, 0.1)',
                            fontWeight: 600,
                             display:{xs:'none', md:'flex'},
                          }} 
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Box>
              </LightboxImage>

              {/* Enhanced pagination */}
              <Stack 
                direction="row" 
                spacing={1} 
                justifyContent="center" 
                alignItems="center"
                sx={{ mt: 3 }}
              >
                {filtered.map((_, i) => (
                  <PaginationDot
                    key={i}
                    active={i === index ? 1 : 0}
                    onClick={() => setIndex(i)}
                  />
                ))}
              </Stack>
            </Box>
          )}
        </LightboxContent>
      </Dialog>
    </GalleryWrap>
  );
}