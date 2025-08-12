import Navbar from "@/components/Navabar";
import Hero from "@/components/Hero";
import { Box } from "@mui/material";
import WhyChoose from "@/components/WhyChoose";
import Banner from "@/components/Banner"; 
import Banner2 from "@/components/Banner2";
import PricingComponent from "@/components/Prcing";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: 8 }}>
        <Hero />
      </Box>
      <Box id="why">
        <WhyChoose />
      </Box>
      <Box sx={{position:'relative', mt:12}}>
        <Banner />
        <Banner2 />
      </Box>
      <Box id="pricing">
        <PricingComponent />
      </Box>
    </>
  );
}
