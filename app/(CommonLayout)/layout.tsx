import Footer from "@/components/Common/Footer";
import Navbar from "@/components/Common/Navbar";


export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Navbar />
        {children}
    <Footer />
    </>
  );
}