import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import RewriteTool from "./pages/tools/RewriteTool";
import ParaphraseTool from "./pages/tools/ParaphraseTool";
import GrammarTool from "./pages/tools/GrammarTool";
import DocumentTool from "./pages/tools/DocumentTool";
import EquationTool from "./pages/tools/EquationTool";
import AssignmentTool from "./pages/tools/AssignmentTool";
import AuthGuard from "./components/auth/AuthGuard";
import HowItWorks from "./pages/HowItWorks";
import Examples from "./pages/Examples";
import Pricing from "./pages/Pricing";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Press from "./pages/Press";
import TermsOfService from "./pages/Terms-of-Service";
import PrivacyPolicy from "./pages/Privacy-Policy";
import CookiePolicy from "./pages/Cookie-Policy";
import DataProcessing from "./pages/Data-Processing";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/examples" element={<Examples />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
          <Route path="/data-processing" element={<DataProcessing />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/checkout" element={
            <AuthGuard>
              <Checkout />
            </AuthGuard>
          } />
          <Route path="/login" element={
            <AuthGuard requireAuth={false}>
              <Login />
            </AuthGuard>
          } />
          <Route path="/signup" element={
            <AuthGuard requireAuth={false}>
              <Signup />
            </AuthGuard>
          } />
          <Route path="/dashboard" element={
            <AuthGuard>
              <Dashboard />
            </AuthGuard>
          } />
          <Route path="/profile" element={
            <AuthGuard>
              <Profile />
            </AuthGuard>
          } />
          <Route path="/tools/rewrite" element={
            <AuthGuard>
              <RewriteTool />
            </AuthGuard>
          } />
          <Route path="/tools/paraphrase" element={
            <AuthGuard>
              <ParaphraseTool />
            </AuthGuard>
          } />
          <Route path="/tools/grammar" element={
            <AuthGuard>
              <GrammarTool />
            </AuthGuard>
          } />
          <Route path="/tools/document" element={
            <AuthGuard>
              <DocumentTool />
            </AuthGuard>
          } />
          <Route path="/tools/equations" element={
            <AuthGuard>
              <EquationTool />
            </AuthGuard>
          } />
          <Route path="/tools/assignment" element={
            <AuthGuard>
              <AssignmentTool />
            </AuthGuard>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
