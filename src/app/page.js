import Navbar from "@/components/Navabar";
import Hero from "@/components/Hero";
import { Box } from "@mui/material";
import WhyChoose from "@/components/WhyChoose";
export default function Home() {
  return (
    <>
      <Navbar />
      <Box sx={{ mt: 8 }}>
        <Hero />
      </Box>
      <WhyChoose />
    </>
  );
}
