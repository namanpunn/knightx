"use client";

import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

/*
  PremiumGymTestimonials.jsx
  - A sleek, dark-themed testimonial carousel for the premium gym site.
  - Usage: <PremiumGymTestimonials testimonials={array} autoplay={true} interval={5000} />

  Each testimonial: { quote, name, role, avatar, rating }
*/

const GOLD = '#e6b600';
const GOLD_TRANSPARENT = 'rgba(230,182,0,0.12)';

const Wrap = styled(Box)(({ theme }) => ({
  width: '100%',
  padding: '48px clamp(16px, 6vw, 96px)',
  background: 'linear-gradient(180deg, rgba(0,0,0,0.02), rgba(0,0,0,0.22))',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Card = styled('div')(({ theme }) => ({
  width: 'min(920px, 92vw)',
  borderRadius: 16,
  padding: '28px',
  background: 'linear-gradient(180deg, rgba(255,255,255,0.016), rgba(0,0,0,0.32))',
  border: `1px solid ${GOLD_TRANSPARENT}`,
  boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
  color: '#f4f4f4',
}));

const Quote = styled(Typography)(({ theme }) => ({
  fontSize: '1.125rem',
  lineHeight: 1.6,
  color: '#dcdcdc',
  marginBottom: 18,
  fontStyle: 'normal',
}));

const Meta = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 14,
}));

const Dot = styled('button')(({ active }) => ({
  width: active ? 28 : 10,
  height: 10,
  borderRadius: 99,
  transition: 'width .28s ease, background .28s ease',
  border: 'none',
  background: active ? GOLD : 'rgba(255,255,255,0.12)',
  cursor: 'pointer',
}));

const defaultTestimonials = [
  {
    quote: "Joining Titan Fitness changed everything — the coaches pushed me, the equipment was world-class, and I actually enjoy training again.",
    name: 'Rohit Sharma',
    role: 'Marketing Manager',
    avatar: '/images/testi1.jpg',
    rating: 5,
  },
  {
    quote: "I lost 12 kgs in 4 months with a personalized plan. The trainers are motivational and the atmosphere keeps me consistent.",
    name: 'Ananya Kapoor',
    role: 'Graphic Designer',
    avatar: '/images/testi2.jpg',
    rating: 5,
  },
  {
    quote: "Clean studios, flexible hours, and real results. Highly recommend for anyone serious about fitness.",
    name: 'Dev Patil',
    role: 'Software Engineer',
    avatar: '/images/testi3.jpg',
    rating: 4,
  },
  {
    quote: "The recovery and mobility zones helped me get back to training after an injury — staff are knowledgeable and caring.",
    name: 'Maya Verma',
    role: 'Physiotherapist',
    avatar: '/images/testi4.jpg',
    rating: 5,
  },
];

export default function PremiumGymTestimonials({ testimonials = defaultTestimonials, autoplay = true, interval = 5000 }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const len = testimonials.length;
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoplay || paused || len <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((s) => (s + 1) % len);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoplay, paused, len, interval]);

  const prev = () => setIndex((s) => (s - 1 + len) % len);
  const next = () => setIndex((s) => (s + 1) % len);

  const onMouseEnter = () => setPaused(true);
  const onMouseLeave = () => setPaused(false);

  return (
    <Wrap>
      <Card onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} role="region" aria-roledescription="carousel" aria-label="Member testimonials">
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Quote variant="body1">“{testimonials[index].quote}”</Quote>

            <Meta>
              <Avatar src={testimonials[index].avatar} alt={testimonials[index].name} sx={{ width: 56, height: 56, border: `2px solid ${GOLD_TRANSPARENT}` }} />
              <Box>
                <Typography sx={{ fontWeight: 800 }}>{testimonials[index].name}</Typography>
                <Typography variant="caption" sx={{ color: '#bdbdbd' }}>{testimonials[index].role}</Typography>
              </Box>
            </Meta>

            {/* rating */}
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Box key={i} component="span" sx={{ opacity: i < testimonials[index].rating ? 1 : 0.28, fontSize: 18 }}>{'★'}</Box>
              ))}
            </Box>

          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, ml: 3 }}>
            <IconButton onClick={prev} aria-label="Previous testimonial" sx={{ bgcolor: 'rgba(0,0,0,0.35)' }}>
              <ArrowBackIosNewIcon sx={{ color: '#fff' }} />
            </IconButton>

            <IconButton onClick={next} aria-label="Next testimonial" sx={{ bgcolor: 'rgba(0,0,0,0.35)' }}>
              <ArrowForwardIosIcon sx={{ color: '#fff' }} />
            </IconButton>
          </Box>
        </Box>

        {/* dots */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center', gap: 2 }}>
          {testimonials.map((_, i) => (
            <Dot key={i} active={i === index} onClick={() => setIndex(i)} aria-label={`Go to testimonial ${i + 1}`} />
          ))}
        </Box>
      </Card>
    </Wrap>
  );
}
