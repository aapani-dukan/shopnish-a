// ✅ Updated App.tsx as per your latest instruction: // ✅ Google login-related logic from new working file retained // ✅ Design, color, and basic route/loader structure from older App.tsx restored

import { Switch, Route, Redirect, useLocation } from "wouter"; import { useEffect } from "react"; import { QueryClientProvider } from "@tanstack/react-query"; import { queryClient } from "./lib/queryClient"; import { TooltipProvider } from "@/components/ui/tooltip"; import { Toaster } from "@/components/ui/toaster"; import { AuthProvider, useAuth } from "@/hooks/useAuth"; import { useSeller } from "@/hooks/useSeller"; import "./index.css";

// Pages import HomePage from "@/pages/home"; import ProductDetail from "@/pages/product-detail"; import Cart from "@/pages/cart"; import Checkout from "@/pages/checkout"; import AuthPage from "@/pages/auth"; import SellerDashboard from "@/pages/seller-dashboard"; import SellerApplyPage from "@/pages/seller-apply"; import NotFound from "@/pages/not-found"; import SellerStatusPage from "@/pages/seller-status";

function Loader() { return ( <div className="h-screen flex items-center justify-center"> <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading" /> </div> ); }

function ProtectedRoute({ children }: { children: React.ReactNode }) { const { firebaseUser, loading } = useAuth(); if (loading) return <Loader />; if (!firebaseUser) return <Redirect to="/auth" />; return <>{children}</>; }

function SellerProtectedRoute({ children }: { children: React.ReactNode }) { const { user, loading } = useAuth(); if (loading) return <Loader />; if (!user?.isApprovedSeller) return <Redirect to="/seller-apply" />; return <>{children}</>; }

function AppRouter() { const { firebaseUser, loading: authLoading, user } = useAuth(); const { isSeller, seller, isLoading: sellerLoading } = useSeller(); const [location, setLocation] = useLocation(); const currentPath = location;

const isLoading = authLoading || sellerLoading;

useEffect(() => { console.log("--- AppRouter State Update ---"); console.log("  isLoading:", isLoading); console.log("  firebaseUser:", firebaseUser); console.log("  isSeller:", isSeller); console.log("  seller status:", seller?.approvalStatus); console.log("  currentPath:", currentPath); console.log("----------------------------"); }, [isLoading, firebaseUser, isSeller, seller, currentPath]);

if (isLoading) return <Loader />;

// Not authenticated if (!firebaseUser) { if (currentPath !== "/" && currentPath !== "/auth") { setLocation("/"); return null; } return ( <Switch> <Route path="/" component={AuthPage} /> <Route path="/auth" component={AuthPage} /> <Route component={NotFound} /> </Switch> ); }

// Seller redirection logic if (isSeller) { if (seller?.approvalStatus === "approved") { if (currentPath === "/seller-apply" || currentPath === "/seller-status") { setLocation("/seller-dashboard"); return null; } } else if (["pending", "rejected"].includes(seller?.approvalStatus ?? "")) { if (currentPath !== "/seller-status") { setLocation("/seller-status"); return null; } } } else { if (["/seller-dashboard"].includes(currentPath)) { setLocation("/seller-apply"); return null; } }

return ( <Switch> {/* Customer Routes */} <Route path="/"> <ProtectedRoute> <HomePage /> </ProtectedRoute> </Route> <Route path="/product/:id"> <ProtectedRoute> <ProductDetail /> </ProtectedRoute> </Route> <Route path="/cart"> <ProtectedRoute> <Cart /> </ProtectedRoute> </Route> <Route path="/checkout"> <ProtectedRoute> <Checkout /> </ProtectedRoute> </Route>

{/* Seller Routes */}
  <Route path="/seller-dashboard">
    <ProtectedRoute>
      <SellerProtectedRoute>
        <SellerDashboard />
      </SellerProtectedRoute>
    </ProtectedRoute>
  </Route>
  <Route path="/seller-apply">
    <ProtectedRoute>
      <SellerApplyPage />
    </ProtectedRoute>
  </Route>
  <Route path="/seller-status">
    <ProtectedRoute>
      <SellerStatusPage />
    </ProtectedRoute>
  </Route>

  {/* Fallback */}
  <Route component={NotFound} />
</Switch>

); }

function App() { return ( <QueryClientProvider client={queryClient}> <TooltipProvider> <AuthProvider> <Toaster /> <AppRouter /> </AuthProvider> </TooltipProvider> </QueryClientProvider> ); }

export default App;

