'use client'
import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
  Fade,
  Paper,
  Divider,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle,
  Star,
  FitnessCenter,
  Group,
  Schedule,
  SportsGymnastics,
  LocalFireDepartment,
  EmojiEvents,
  TrendingUp,
  Diamond,
  AccessTime,
  Security,
  Spa,
  Restaurant,
  DirectionsRun,
  HealthAndSafety,
  Pool,
  MusicNote,
  Wifi,
  LocalDrink,
  SportsMartialArts,
  Person,
  Verified,
  AutoGraph,
  Stars,
  WorkspacePremium
} from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Enhanced premium theme
const premiumTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#D4AF37',
      dark: '#B8860B',
      light: '#FFD700',
    },
    secondary: {
      main: '#FF6B35',
      dark: '#E55722',
      light: '#FF8F65'
    },
    background: {
      default: '#0a0a0a',
      paper: '#1a1a1a',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
    success: {
      main: '#4CAF50'
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", sans-serif',
    h2: {
      fontWeight: 800,
      letterSpacing: '-0.02em',
    },
    h4: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 700
    }
  },
  shape: {
    borderRadius: 12
  }
});

// Custom hook for animated counter with intersection observer
const useAnimatedCounter = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            // Easing function for smooth animation
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(start + (end - start) * easeOutCubic);
            
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end); // Ensure we end at exact value
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [end, duration, start, hasAnimated]);

  return [count, ref];
};

// Animated Counter Component
const AnimatedCounter = ({ 
  end, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  isDecimal = false,
  ...props 
}) => {
  const [count, ref] = useAnimatedCounter(end, duration);
  
  const displayValue = isDecimal ? (count / 10).toFixed(1) : count;
  
  return (
    <Typography 
      ref={ref} 
      variant="h4" 
      fontWeight={800} 
      sx={{ 
        color: '#D4AF37',
        transition: 'all 0.3s ease',
        ...props.sx 
      }}
      {...props}
    >
      {prefix}{displayValue}{suffix}
    </Typography>
  );
};

// Special component for star rating with icon
const StarRatingCounter = ({ rating = 5.0, duration = 2500 }) => {
  const [displayRating, setDisplayRating] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          let startTime;
          const animate = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const currentRating = rating * easeOutCubic;
            
            setDisplayRating(currentRating);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setDisplayRating(rating);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [rating, duration, hasAnimated]);

  return (
    <Box ref={ref} display="flex" alignItems="center" justifyContent="center" gap={0.5}>
      <Typography variant="h4" fontWeight={800} sx={{ color: '#D4AF37' }}>
        {displayRating.toFixed(1)}
      </Typography>
      <Star sx={{ color: '#D4AF37', fontSize: '2rem' }} />
    </Box>
  );
};

const PremiumGymPricing = () => {
  const [selectedPlan, setSelectedPlan] = useState('quarterly');
  const [isVisible, setIsVisible] = useState(false);
  const isMobile = useMediaQuery('(max-width:960px)');

  const plans = [
    {
      id: 'monthly',
      name: 'Starter',
      duration: '1 Month',
      price: 3000,
      originalPrice: null,
      savings: 0,
      popular: false,
      badge: null,
      color: '#64B5F6',
      icon: <AccessTime sx={{ fontSize: 32 }} />,
      description: 'Perfect for trying out',
      features: [
        'Basic gym access',
        'Locker facilities', 
        'Induction + Plan'
      ]
    },
    {
      id: 'quarterly', 
      name: 'Popular',
      duration: '3 Months',
      price: 7000,
      originalPrice: 9000,
      savings: 2000,
      popular: true,
      badge: 'BEST VALUE',
      color: '#D4AF37',
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      description: 'Most chosen by members',
      features: [
        'All Starter features',
        'Body Composition Scans',
        'Nutrition guidance'
      ]
    },
    {
      id: 'halfyearly',
      name: 'Pro Athlete', 
      duration: '6 Months',
      price: 10000,
      originalPrice: 18000,
      savings: 8000,
      popular: false,
      badge: 'GREAT DEAL',
      color: '#9C27B0',
      icon: <Star sx={{ fontSize: 32 }} />,
      description: 'For serious training',
      features: [
        'All Popular features',
        '1 PT sessions/month',
        'Custom nutrition plan',
      ]
    },
    {
      id: 'yearly',
      name: 'Champion',
      duration: '12 Months', 
      price: 14000,
      originalPrice: 36000,
      savings: 22000,
      popular: false,
      badge: 'MAX SAVINGS',
      color: '#FF5722',
      icon: <Diamond sx={{ fontSize: 32 }} />,
      description: 'Ultimate transformation',
      features: [
        'All Pro Athlete features',
        '2 PT sessions',
        'Quarterly Reviews',
      ]
    }
  ];

  const allFeatures = [
    { icon: <FitnessCenter />, text: 'State-of-the-art equipment' },
    { icon: <Security />, text: '24/7 secure access' },
    { icon: <Group />, text: 'Expert personal trainers' },
    { icon: <SportsGymnastics />, text: 'Group fitness classes' },
    { icon: <Spa />, text: 'Recovery & wellness zone' },
    { icon: <Pool />, text: 'Swimming pool access' },
    { icon: <Restaurant />, text: 'Nutrition consultation' },
    { icon: <HealthAndSafety />, text: 'Health assessments' },
    { icon: <DirectionsRun />, text: 'Cardio theater' },
    { icon: <MusicNote />, text: 'Premium sound system' },
    { icon: <LocalDrink />, text: 'Hydration stations' },
    { icon: <SportsMartialArts />, text: 'Functional training area' }
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const getMonthlyRate = (plan) => {
    const months = plan.id === 'monthly' ? 1 : 
                   plan.id === 'quarterly' ? 3 :
                   plan.id === 'halfyearly' ? 6 : 12;
    return Math.round(plan.price / months);
  };

  const selectedPlanData = plans.find(p => p.id === selectedPlan);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <ThemeProvider theme={premiumTheme}>
      <Box sx={{
        minHeight: '100vh',
        background: `
          linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0a0a0a 100%),
          radial-gradient(ellipse at top, rgba(212, 175, 55, 0.1) 0%, transparent 50%)
        `,
        py: { xs: 4, md: 6 }
      }}>
        <Box sx={{ }}>
          {/* Header */}
          <Fade in={isVisible} timeout={600}>
            <Box textAlign="center" mb={6}>
              <Chip 
                label="🏆 Premium Fitness Membership"
                sx={{
                  backgroundColor: 'rgba(212, 175, 55, 0.15)',
                  color: '#D4AF37',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  mb: 3,
                  py: 1,
                  px: 2
                }}
              />
              
              <Typography variant="h2" sx={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                fontSize: { xs: '2.5rem', md: '3.5rem' }
              }}>
                Choose Your Plan
              </Typography>
              
              <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                Transform your body with our premium facilities and expert guidance
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4} sx={{ display: 'flex', justifyContent: 'center'}}>
            {/* Pricing Cards */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={3} sx={{display:'flex', justifyContent: 'center', mx:"16px"}}>
                {plans.map((plan, index) => (
                  <Grid item xs={12} sm={6} key={plan.id}>
                    <Fade in={isVisible} timeout={800 + index * 200}>
                      <Card 
                        onClick={() => setSelectedPlan(plan.id)}
                        sx={{
                          height: '100%',
                          cursor: 'pointer',
                          position: 'relative',
                          background: selectedPlan === plan.id 
                            ? `linear-gradient(135deg, ${plan.color}15 0%, rgba(26, 26, 26, 0.95) 100%)`
                            : 'rgba(26, 26, 26, 0.8)',
                          border: selectedPlan === plan.id 
                            ? `2px solid ${plan.color}` 
                            : '1px solid rgba(255, 255, 255, 0.1)',
                          borderRadius: '20px',
                          backdropFilter: 'blur(20px)',
                          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          transform: selectedPlan === plan.id ? 'scale(1.02)' : 'scale(1)',
                          '&:hover': {
                            transform: 'scale(1.02)',
                            border: `2px solid ${plan.color}`,
                            boxShadow: `0 20px 40px ${plan.color}20`
                          }
                        }}
                      >
                        {plan.badge && (
                          <Chip
                            label={plan.badge}
                            size="small"
                            sx={{
                              position: 'absolute',
                              top: 16,
                              right: 16,
                              backgroundColor: plan.popular ? '#D4AF37' : '#4CAF50',
                              color: plan.popular ? '#000' : '#fff',
                              fontWeight: 800,
                              fontSize: '0.7rem'
                            }}
                          />
                        )}

                        <CardContent sx={{ p: 4 }}>
                          {/* Icon */}
                          <Box 
                            sx={{
                              width: 80,
                              height: 80,
                              background: `linear-gradient(135deg, ${plan.color}20 0%, ${plan.color}40 100%)`,
                              borderRadius: '20px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              mb: 3,
                              border: `2px solid ${plan.color}30`
                            }}
                          >
                            {React.cloneElement(plan.icon, { sx: { color: plan.color, fontSize: 32 } })}
                          </Box>

                          {/* Plan Info */}
                          <Typography variant="h4" fontWeight={700} gutterBottom>
                            {plan.name}
                          </Typography>
                          <Typography variant="body1" color="text.secondary" mb={3}>
                            {plan.duration} • {plan.description}
                          </Typography>

                          {/* Pricing */}
                          <Box mb={3}>
                            {plan.originalPrice && (
                              <Typography 
                                variant="h6" 
                                sx={{ 
                                  textDecoration: 'line-through',
                                  color: 'text.secondary',
                                  mb: 0.5
                                }}
                              >
                                {formatPrice(plan.originalPrice)}
                              </Typography>
                            )}
                            
                            <Box display="flex" alignItems="baseline" gap={1} mb={1}>
                              <Typography variant="h3" fontWeight={800} sx={{ color: plan.color }}>
                                {formatPrice(plan.price)}
                              </Typography>
                              <Typography variant="body1" color="text.secondary">
                                / {plan.duration.toLowerCase()}
                              </Typography>
                            </Box>

                            {plan.id !== 'monthly' && (
                              <Typography variant="body2" sx={{ color: plan.color, fontWeight: 600 }}>
                                ≈ {formatPrice(getMonthlyRate(plan))}/month
                              </Typography>
                            )}

                            {plan.savings > 0 && (
                              <Chip
                                label={`Save ${formatPrice(plan.savings)}`}
                                size="small"
                                sx={{
                                  backgroundColor: 'rgba(76, 175, 80, 0.2)',
                                  color: '#4CAF50',
                                  fontWeight: 600,
                                  mt: 1
                                }}
                              />
                            )}
                          </Box>

                          {/* Key Features */}
                          <Box>
                            {plan.features.slice(0, 3).map((feature, idx) => (
                              <Box key={idx} display="flex" alignItems="center" mb={1}>
                                <CheckCircle sx={{ color: plan.color, fontSize: 18, mr: 1 }} />
                                <Typography variant="body2" color="text.secondary">
                                  {feature}
                                </Typography>
                              </Box>
                            ))}
                            {plan.features.length > 3 && (
                              <Typography variant="body2" sx={{ color: plan.color, fontWeight: 600, mt: 1 }}>
                                + {plan.features.length - 3} more features
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      </Card>
                    </Fade>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          {/* Enhanced Animated Trust Indicators */}
          <Fade in={isVisible} timeout={1400}>
            <Box mt={8} textAlign="center">
              <Typography 
                variant="h4" 
                fontWeight={700} 
                sx={{ 
                  color: '#D4AF37', 
                  mb: 4,
                  textAlign: 'center'
                }}
              >
                Trusted by Thousands
              </Typography>
              
              <Grid container spacing={4} justifyContent="center">
                <Grid item xs={6} md={3}>
                  <Box 
                    textAlign="center"
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)'
                      }
                    }}
                  >
                    <AnimatedCounter 
                      end={500} 
                      suffix="+"
                      duration={2500}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
                      Active Members
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} md={3}>
                  <Box 
                    textAlign="center"
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)'
                      }
                    }}
                  >
                    <AnimatedCounter 
                      end={15} 
                      suffix="+"
                      duration={2000}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
                      Expert Trainers
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} md={3}>
                  <Box 
                    textAlign="center"
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)'
                      }
                    }}
                  >
                    <StarRatingCounter rating={5.0} duration={2500} />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
                      Google Rating
                    </Typography>
                  </Box>
                </Grid>
                
                <Grid item xs={6} md={3}>
                  <Box 
                    textAlign="center"
                    sx={{
                      p: 3,
                      borderRadius: '16px',
                      background: 'rgba(212, 175, 55, 0.05)',
                      border: '1px solid rgba(212, 175, 55, 0.1)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        background: 'rgba(212, 175, 55, 0.1)',
                        border: '1px solid rgba(212, 175, 55, 0.3)',
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(212, 175, 55, 0.15)'
                      }
                    }}
                  >
                    <AnimatedCounter 
                      end={1200} 
                      suffix="+"
                      duration={3000}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, fontWeight: 500 }}>
                      Success Stories
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Fade>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default PremiumGymPricing;