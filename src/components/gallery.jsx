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
import { styled, useTheme } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/*
  PremiumGymGallery.jsx
  - A Next.js + MUI React component that matches a dark, luxe gym theme with gold accents.
  - Features: responsive grid, hover reveal, gold glow, accessible lightbox with keyboard navigation, simple filters/tags.
  - Usage: <PremiumGymGallery images={imagesArray} initialFilter="All" />

  imagesArray: [{ src: '/images/gym1.webp', alt: '...' , tags: ['equipment','studio'], featured: true }, ...]
*/

// ----------------------
// DEFAULT IMAGES ARRAY
// ----------------------
// Place your images under the `public/images` folder (or supply remote URLs) and the gallery
// will render dynamically based on the array length and tags.

const defaultImages = [
  { src: '/images/gym1.webp', alt: 'Athlete lifting dumbbells', title: 'Strength Session', caption: 'High-intensity strength training.', tags: ['strength', 'equipment'], featured: true },
  { src: '/images/gym2.webp', alt: 'Treadmills at the gym', title: 'Cardio Zone', caption: 'State-of-the-art cardio machines.', tags: ['cardio'], featured: false },
  { src: '/images/gym3.webp', alt: 'Trainer coaching client', title: 'Personal Coaching', caption: 'Elite coaches to guide you.', tags: ['coaching', 'staff'], featured: false },
  { src: '/images/gym4.webp', alt: 'Close up of a kettlebell', title: 'Pro Equipment', caption: 'Top-tier free weights and rigs.', tags: ['equipment'], featured: false },
  { src: '/images/gym5.webp', alt: 'Group fitness class', title: 'Group Classes', caption: 'Dynamic group training sessions.', tags: ['classes'], featured: false },
  { src: '/images/gym6.webp', alt: 'Gym interior with lighting', title: 'Studio Space', caption: 'Premium studio and ambience.', tags: ['studio', 'ambience'], featured: false },
  { src: '/images/gym7.webp', alt: 'Athlete stretching', title: 'Recovery', caption: 'Stretching and recovery zones.', tags: ['recovery'], featured: false },
  { src: '/images/gym8.webp', alt: 'Barbells lined up', title: 'Barbell Row', caption: 'Olympic bars & racks.', tags: ['strength', 'equipment'], featured: false },
];

const GOLD = '#e6b600';
const GOLD_TRANSPARENT = 'rgba(230,182,0,0.12)';

const GalleryWrap = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '40px clamp(16px, 6vw, 80px)',
  background: 'linear-gradient(180deg, rgba(0,0,0,0.01), rgba(0,0,0,0.22))',
}));

const CardRoot = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  overflow: 'hidden',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.014), rgba(0,0,0,0.12))',
  border: `1px solid ${GOLD_TRANSPARENT}`,
  boxShadow: '0 12px 36px rgba(0,0,0,0.6)',
  transition: 'transform .32s ease, box-shadow .32s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: `0 28px 64px rgba(0,0,0,0.7), 0 8px 30px rgba(230,182,0,0.06)`,
  },
}));

const HoverMeta = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  bottom: 0,
  padding: '18px',
  display: 'flex',
  justifyContent: 'space-between',
  gap: 12,
  alignItems: 'center',
  backdropFilter: 'blur(6px)',
  background: 'linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.42))',
}));

const ImgWrap = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  aspectRatio: '4 / 3',
  overflow: 'hidden',
  display: 'block',
  background: 'radial-gradient(circle at 10% 20%, rgba(230,182,0,0.03), transparent 10%)',
}));

const LightboxContent = styled(DialogContent)(({ theme }) => ({
  padding: 0,
  background: 'linear-gradient(180deg,#060606,#0b0b0b)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
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
    // ensure index within bounds (i is index in filtered list)
    const idx = Math.max(0, Math.min(i, Math.max(0, filtered.length - 1)));
    setIndex(idx);
    setOpen(true);
  }, [filtered.length]);

  const close = useCallback(() => setOpen(false), []);

  // keyboard navigation for lightbox
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

  // guard when filters change and index out-of-range
  useEffect(() => {
    if (!hasImages) {
      setIndex(0);
    } else if (index >= filtered.length) {
      setIndex(0);
    }
  }, [filter, filtered.length, index, hasImages]);

  // safer filter setter: if selecting a tag with no images, ignore or fallback to All
  const handleSetFilter = (t) => {
    const candidate = images.filter((img) => t === 'All' || (img.tags || []).includes(t));
    if (candidate.length === 0) {
      // ignore empty filter — or optionally set to 'All'
      // setFilter('All');
      return;
    }
    setFilter(t);
    setIndex(0);
    // if lightbox is open but new filtered set doesn't include previous index, close it
    if (open && candidate.length === 0) setOpen(false);
  };

  return (
    <GalleryWrap>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em' }}>
            Our Transformations
          </Typography>
          <Typography variant="body2" sx={{ color: '#bfbfbf', mt: 1 }}>
            Curated gallery of workout moments, equipment, and studio shots.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          {tags.map((t) => (
            <Chip
              key={t}
              label={t}
              clickable
              size="small"
              onClick={() => handleSetFilter(t)}
              sx={{
                borderRadius: 10,
                px: 1.5,
                fontWeight: 700,
                color: filter === t ? '#111' : '#eaeaea',
                background: filter === t ? `linear-gradient(90deg, ${GOLD}, #ffc72b)` : 'transparent',
                border: filter === t ? `1px solid ${GOLD}` : `1px solid rgba(255,255,255,0.04)`,
                boxShadow: filter === t ? '0 8px 30px rgba(230,182,0,0.12)' : 'none',
              }}
            />
          ))}
        </Stack>
      </Stack>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {filtered.map((img, i) => (
          <Grid key={img.src + i} item xs={12} sm={6} md={4} lg={3}>
            <CardRoot>
              <CardActionArea onClick={() => openAt(i)} sx={{ position: 'relative' }}>
                <ImgWrap aria-hidden={true}>
                  <Image
                    src={img.src}
                    alt={img.alt || 'Gallery image'}
                    width={300}
                    height={260}
                    objectFit="cover"
                    sizes="(max-width:600px) 100vw, (max-width:1200px) 50vw, 33vw"
                    priority={img.featured}
                  />
                </ImgWrap>

                <HoverMeta sx={{ opacity: 0, transition: 'opacity .28s ease', '&:hover': { opacity: 1 } }}>
                  <Box>
                    <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 700 }}>
                      {img.title || ''}
                    </Typography>
                    {img.caption && (
                      <Typography variant="caption" sx={{ color: '#bdbdbd' }}>
                        {img.caption}
                      </Typography>
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {(img.tags || []).slice(0, 2).map((t) => (
                      <Chip
                        size="small"
                        key={t}
                        label={t}
                        sx={{ bgcolor: 'transparent', color: '#f6f6f2', border: `1px solid ${GOLD_TRANSPARENT}` }}
                      />
                    ))}
                  </Box>
                </HoverMeta>
              </CardActionArea>
            </CardRoot>
          </Grid>
        ))}
      </Grid>

      {/* Lightbox dialog */}
      <Dialog
        open={open && hasImages}
        onClose={close}
        maxWidth={false}
        PaperProps={{
          sx: {
            background: 'transparent',
            boxShadow: 'none',
            overflow: 'visible',
          },
        }}
        aria-labelledby="gallery-lightbox"
      >
        <LightboxContent>
          <Box sx={{ position: 'absolute', top: 18, right: 18, zIndex: 10 }}>
            <IconButton onClick={close} aria-label="Close lightbox" sx={{ bgcolor: 'rgba(0,0,0,0.4)' }}>
              <CloseIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Box>

          <IconButton
            onClick={() => setIndex((s) => (filtered.length ? (s - 1 + filtered.length) % filtered.length : 0))}
            aria-label="Previous"
            sx={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 10, bgcolor: 'rgba(0,0,0,0.35)' }}
          >
            <ArrowBackIosNewIcon sx={{ color: '#fff' }} />
          </IconButton>

          <IconButton
            onClick={() => setIndex((s) => (filtered.length ? (s + 1) % filtered.length : 0))}
            aria-label="Next"
            sx={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', zIndex: 10, bgcolor: 'rgba(0,0,0,0.35)' }}
          >
            <ArrowForwardIosIcon sx={{ color: '#fff' }} />
          </IconButton>

          {hasImages && current && (
            <Box sx={{ width: { xs: '92vw', md: '80vw' }, maxWidth: 1400, position: 'relative' }}>
              <Box sx={{
                borderRadius: 12,
                overflow: 'hidden',
                border: `1px solid ${GOLD_TRANSPARENT}`,
                boxShadow: '0 40px 100px rgba(0,0,0,0.7)',
              }}>
                <Box sx={{ position: 'relative', height: { xs: '60vh', md: '75vh' } }}>
                  <Image
                    src={current.src}
                    alt={current.alt || 'Gallery image enlarged'}
                    layout="fill"
                    objectFit="contain"
                    sizes="100vw"
                    priority
                  />
                </Box>

                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.35)' }}>
                  <Box>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800 }}>
                      {current.title || ''}
                    </Typography>
                    {current.caption && (
                      <Typography variant="body2" sx={{ color: '#cfcfcf' }}>
                        {current.caption}
                      </Typography>
                    )}
                  </Box>

                  <Stack direction="row" spacing={1} alignItems="center">
                    {(current.tags || []).map((t) => (
                      <Chip key={t} label={t} size="small" sx={{ color: '#fff', border: `1px solid ${GOLD_TRANSPARENT}`, bgcolor: 'transparent' }} />
                    ))}
                  </Stack>
                </Box>
              </Box>

              {/* pagination dots */}
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
                {filtered.map((_, i) => (
                  <Box
                    key={i}
                    onClick={() => setIndex(i)}
                    sx={{
                      width: i === index ? 28 : 10,
                      height: 10,
                      borderRadius: 99,
                      transition: 'width .28s ease',
                      bgcolor: i === index ? GOLD : 'rgba(255,255,255,0.12)',
                      cursor: 'pointer',
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </Box>
            </Box>
          )}
        </LightboxContent>
      </Dialog>
    </GalleryWrap>
  );
}