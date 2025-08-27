"use client";

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StarIcon from '@mui/icons-material/Star';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Image from 'next/image'; // ✅ Needed because you're using <Image>

// Styled components matching KnightX theme
const StyledSection = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #1a1a1a 80%, #1a1919ff 20%)',
  padding: '60px 0',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(ellipse at center, rgba(255, 193, 7, 0.05) 0%, transparent 70%)',
    pointerEvents: 'none',
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(45, 45, 45, 0.8) 0%, rgba(26, 26, 26, 0.8) 100%)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 193, 7, 0.1)',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.3s ease-in-out',
  position: 'relative',
  maxWidth: '320px',
  margin: '0 auto',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 15px 30px rgba(255, 193, 7, 0.2)',
    border: '1px solid rgba(255, 193, 7, 0.3)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #ffc107, #ff9800, #ffc107)',
  }
}));

const StyledCardMedia = styled(CardMedia)({
  height: 240,
  position: 'relative',
  overflow: 'hidden',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '40%',
    background: 'linear-gradient(to top, rgba(26, 26, 26, 0.8), transparent)',
  }
});

const GoldChip = styled(Chip)({
  background: 'linear-gradient(45deg, #ffc107, #ff9800)',
  color: '#000',
  fontWeight: 'bold',
  margin: '4px',
  '& .MuiChip-icon': {
    color: '#000',
  }
});

const ExperienceBox = styled(Box)({
  background: 'rgba(255, 193, 7, 0.08)',
  border: '1px solid rgba(255, 193, 7, 0.2)',
  borderRadius: '8px',
  padding: '12px',
  margin: '12px 0',
  textAlign: 'center',
  display:'flex',
  gap:8,
  justifyContent:'center',
  alignItems:'center'
});

const SectionTitle = styled(Typography)({
  background: 'linear-gradient(45deg, #ffc107, #ff9800)',
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: '16px',
});

const InstructorSection = ({ instructors = defaultInstructors }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <StyledSection>
      <Box sx={{mx: {xs:4.5, md:7}}}>
        {/* Section Header */}
        <Box textAlign="center" mb={6}>
          <Typography
            variant="subtitle1"
            sx={{
              color: '#ffc107',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              mb: 1
            }}
          >
            Our Expert Team
          </Typography>
          <SectionTitle variant={isMobile ? "h4" : "h3"} component="h2">
            Professional Trainers
          </SectionTitle>
          <Typography
            variant="body1"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              maxWidth: '500px',
              mx: 'auto',
              mt: 2,
              lineHeight: 1.5
            }}
          >
            Meet our certified fitness professionals dedicated to your success.
          </Typography>
        </Box>

        {/* Instructors Grid */}
        <Grid container spacing={1}>
          {instructors.map((instructor, index) => (
            <Grid item xs={12} md={6} lg={4} key={index}>
              <StyledCard>
                <Image src={instructor.image} alt={instructor.name} width={320} height={240} style={{objectFit:"cover"}} />

                <CardContent sx={{ p: 2.5 }}>
                  <Typography variant="h6" component="h3" sx={{ color: '#fff', fontWeight: 'bold', mb: 0.5, fontSize: '1.1rem' }}>
                    {instructor.name}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: '#ffc107', fontWeight: '500', mb: 1.5, fontSize: '0.85rem' }}>
                    {instructor.title}
                  </Typography>

                  {/* Experience */}
                  <ExperienceBox>
                    <Typography variant="h5" sx={{ color: '#ffc107', fontWeight: 'bold', mb: 0.5, fontSize: '1.5rem' }}>
                      {instructor.experience}+
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.75rem' }}>
                      Years Experience
                    </Typography>
                  </ExperienceBox>

                  {/* Certificates */}
                  <Box mb={1.5}>
                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: '600', mb: 0.5, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}>
                      <EmojiEventsIcon sx={{ color: '#ffc107', fontSize: '1rem' }} />
                      Certifications
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {instructor.certificates.slice(0, 2).map((cert, certIndex) => (
                        <Chip
                          key={certIndex}
                          label={cert}
                          size="small"
                          sx={{
                            background: 'rgba(255, 193, 7, 0.15)',
                            color: '#ffc107',
                            border: '1px solid rgba(255, 193, 7, 0.3)',
                            fontSize: '0.7rem',
                            height: '24px'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>

                  {/* Description */}
                  <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.7)', lineHeight: 1.4, mb: 1.5, fontSize: '0.85rem', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {instructor.description}
                  </Typography>

                  {/* Specialties */}
                  <Box mb={2}>
                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: '600', mb: 0.5, display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.85rem' }}>
                      <FitnessCenterIcon sx={{ color: '#ffc107', fontSize: '1rem' }} />
                      Specialties
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.3 }}>
                      {instructor.specialties.slice(0, 3).map((specialty, specIndex) => (
                        <Chip
                          key={specIndex}
                          label={specialty}
                          size="small"
                          sx={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            fontSize: '0.7rem',
                            height: '22px'
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </StyledSection>
  );
};

// Default instructor data for demonstration
const defaultInstructors = [
  {
    name: "Amit Thakral",
    title: "Elite Strength Coach",
    image: "/images/amit.jpg",
    experience: 7,
    certificates: ["K11 Certified PT", "ERAPS Certified (Dubai)"],
    specialties: ["Strength Training", "Body Transformation", "HIIT"],
    description: "Amit specializes in strength development and has helped over 300 clients achieve their fitness goals through personalized training programs."
  },
  {
    name: "Nupur Ummat",
    title: "Transformation Specialist",
    image: "/images/girl.jpg",
    experience: 4,
    certificates: ["K11 Certified PT", "CPR & AED Certified"],
    specialties: ["Weight Loss", "Body Sculpting", "HIIT Training"],
    description: "Nupur combines nutrition expertise with effective training methods to deliver complete body transformation results for her clients."
  },
  {
    name: "Aman",
    title: "Judo & Martial Arts Expert",
    image: "/images/aman.jpg",
    experience: 2,
    certificates: ["B.Ed Physical Education", "CPR & AED Certified"],
    specialties: ["CrossFit", "Martial Arts", "Military Training"],
    description: "Aman is a passionate fitness coach with 2 years of experience in strength training, martial arts, and self-defence."
  },
  {
    name: "Ritik",
    title: "Fitness Coach",
    image: "/images/ritik.jpg",
    experience: 3,
    certificates: ["Trained Modern Fitness Methodologies"],
    specialties: ["CrossFit", "Strength Training", "Military Training"],
    description: "Ritik is Dedicated fitness coach with 3 years’ experience in strength training; designs personalized programs, tracks progress, and motivates clients to achieve measurable results."
  }
];

export default InstructorSection;
