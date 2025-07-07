import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/contexts/AuthContext";
import { WishlistProvider } from "@/contexts/WishlistContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { PropertyProvider } from "@/contexts/PropertyContext";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import all pages
const Index = dynamic(() => import("./pages/Index"));
const Explore = dynamic(() => import("./pages/Explore"));
const PropertyDetails = dynamic(() => import("./pages/PropertyDetails"));
const Login = dynamic(() => import("./pages/Login"));
const Signup = dynamic(() => import("./pages/Signup"));
const Profile = dynamic(() => import("./pages/Profile"));
const Wishlist = dynamic(() => import("./pages/Wishlist"));
const Partner = dynamic(() => import("./pages/Partner"));
const About = dynamic(() => import("./pages/About"));
const Blog = dynamic(() => import("./pages/Blog"));
const Careers = dynamic(() => import("./pages/Careers"));
const HelpCenter = dynamic(() => import("./pages/HelpCenter"));
const ContactUs = dynamic(() => import("./pages/ContactUs"));
const SafetyInformation = dynamic(() => import("./pages/SafetyInformation"));
const FAQ = dynamic(() => import("./pages/FAQ"));
const HostLogin = dynamic(() => import("./pages/HostLogin"));
const HostDashboard = dynamic(() => import("./pages/HostDashboard"));
const HostProperties = dynamic(() => import("./pages/HostProperties"));
const NotFound = dynamic(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  const pathname = usePathname();

  // Route mapping
  const getPageComponent = () => {
    switch (pathname) {
      case "/":
        return <Index />;
      case "/explore":
        return <Explore />;
      case "/login":
        return <Login />;
      case "/signup":
        return <Signup />;
      case "/profile":
        return <Profile />;
      case "/wishlist":
        return <Wishlist />;
      case "/partner":
        return <Partner />;
      case "/about":
        return <About />;
      case "/blog":
        return <Blog />;
      case "/careers":
        return <Careers />;
      case "/help":
        return <HelpCenter />;
      case "/contact":
        return <ContactUs />;
      case "/safety":
        return <SafetyInformation />;
      case "/faq":
        return <FAQ />;
      case "/host/login":
        return <HostLogin />;
      case "/host/dashboard":
        return <HostDashboard />;
      case "/host/properties":
        return <HostProperties />;
      default:
        // Handle dynamic routes like /property/:id
        if (pathname?.startsWith("/property/")) {
          const propertyId = pathname.split("/property/")[1];
          return (
            <PropertyProvider propertyId={propertyId}>
              <PropertyDetails />
            </PropertyProvider>
          );
        }
        if (pathname?.startsWith("/host/properties/")) {
          return <HostProperties />;
        }
        return <NotFound />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {getPageComponent()}
      </main>
      <Footer />
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <WishlistProvider>
            <AppContent />
          </WishlistProvider>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
