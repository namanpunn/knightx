import Navbar from "@/components/Navabar";
import Hero from "@/components/Hero";
import { Box } from "@mui/material";
import WhyChoose from "@/components/WhyChoose";
import Banner from "@/components/Banner"; 
import Banner2 from "@/components/Banner2";
import PricingComponent from "@/components/Prcing";
import PremiumGymGallery from "@/components/gallery";
import PremiumGymTestimonials from "@/components/testimonial";
import PremiumGymFooter from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: {xs:6,md:8} }}>
        <Hero />
      </Box>
      <Box id="why">
        <WhyChoose />
      </Box>
      <Box sx={{position:'relative', mt:{xs:0, md:12}}}>
        <Banner />
        <Banner2 />
      </Box>
      <Box id="pricing">
        <PricingComponent />
      </Box>
      <Box id="gallery">
        <PremiumGymGallery />
      </Box>
      <Box id="testimonial">
        <PremiumGymTestimonials />
      </Box>
      <PremiumGymFooter />
    </>
  );
}
