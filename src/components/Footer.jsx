"use client";

import React from 'react';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

/*
  PremiumGymFooter.jsx
  - Dark, premium footer matching the site's gold-accented theme.
  - Usage: <PremiumGymFooter />
  - Props you can add: logoSrc, navigation (array), onSubscribe callback for newsletter
*/

const GOLD = '#e6b600';
const GOLD_SOFT = 'rgba(230,182,0,0.12)';

const FooterRoot = styled('footer')(({ theme }) => ({
  width: '100%',
  background: 'linear-gradient(180deg, #070707 0%, #0b0b0b 100%)',
  color: '#e9e9e9',
  padding: '48px clamp(16px, 6vw, 72px) 24px',
  borderTop: `1px solid ${GOLD_SOFT}`,
}));

const Col = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
  minWidth: 160,
}));

export default function PremiumGymFooter({ logoSrc = '/images/logo.jpg' }) {
  return (
    <FooterRoot>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ display: 'flex', gap: 2,}}>
          <Box sx={{ width: 84, height: 84, position: 'relative' }}>
            <Image src={logoSrc} alt="Gym logo" width={80} height={80}/>
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>KnightX Fitness</Typography>
            <Typography variant="body2" sx={{ color: '#bdbdbd', maxWidth: 420 }}>Elite facility, world-class equipment, and coaching built for results. Join a community that trains like champions.</Typography>
            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              {/* <IconButton aria-label="facebook" component="a" href="#" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <FacebookIcon sx={{ color: '#fff' }} />
              </IconButton> */}
              <IconButton aria-label="instagram" component="a" href="https://www.instagram.com/knightxfitnessgym/" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <InstagramIcon sx={{ color: '#fff' }} />
              </IconButton>
              {/* <IconButton aria-label="twitter" component="a" href="#" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <TwitterIcon sx={{ color: '#fff' }} />
              </IconButton> */}
              {/* <IconButton aria-label="youtube" component="a" href="#" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <YouTubeIcon sx={{ color: '#fff' }} />
              </IconButton> */}
              {/* <IconButton aria-label="linkedin" component="a" href="#" sx={{ bgcolor: 'rgba(255,255,255,0.02)' }}>
                <LinkedInIcon sx={{ color: '#fff' }} />
              </IconButton> */}
            </Stack>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 6, mt: { xs: 3, md: 0 }, flexWrap: 'wrap' }}>
          <Col>
            <Typography sx={{ fontWeight: 800 }}>Explore</Typography>
            <Link href="#" legacyBehavior><a style={{ color: '#dcdcdc' }}>Why Choose Us</a></Link>
            <Link href="#" legacyBehavior><a style={{ color: '#dcdcdc' }}>Membership</a></Link>
          </Col>

          <Col>
            <Typography sx={{ fontWeight: 800 }}>Support</Typography>
            <Link href="#" legacyBehavior><a style={{ color: '#dcdcdc' }}>Contact Us</a></Link>
 
          </Col>

          <Col>
            <Typography sx={{ fontWeight: 800 }}>Contact</Typography>
            <Typography variant="body2" sx={{ color: '#bfbfbf' }}>Email: knightxfitness@gmail.com</Typography>
            <Typography variant="body2" sx={{ color: '#bfbfbf' }}>Phone: +91 8802555888/8802555444</Typography>
            <Typography variant="body2" sx={{ color: '#bfbfbf' }}>Address: House No. 1412, Sector 46, Gurgaon</Typography>
          </Col>

          
        </Box>
      </Box>

      <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.04)' }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 2, flexDirection: { xs: 'column', md: 'row' } }}>
        <Typography variant="caption" sx={{ color: '#bdbdbd' }}>&copy; {new Date().getFullYear()} KnightX Fitness. All rights reserved.</Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          {/* <Link href="#" legacyBehavior><a style={{ color: '#bdbdbd' }}>Terms</a></Link> */}
          <Link href="https://www.google.com/maps?sca_esv=c4554e91040c2cd7&output=search&q=knightx+fitness&source=lnms&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeuYzzFkfneXafNx6OMdA4MT_ii3zzsda10XPDTrLfEePPtJVDojrBPt1F6jq_pROBFbgs0UpU0f-Zb8Xc2nDliNzB6_2oEWyx9tW2RB1spXdehuof3IWeec-Q7JzOyDop53fT7o3q3JtMgZ5zCCorJrBkI54u1AJCaVLWhJY0fGZQZ13AA&entry=mc&ved=1t:200715&ictx=111" legacyBehavior ><a style={{ color: '#bdbdbd' }}   target="_blank">Get Gym Location on Google Map</a></Link>
        </Stack>
      </Box>
    </FooterRoot>
  );
}
