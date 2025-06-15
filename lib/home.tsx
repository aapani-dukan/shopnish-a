import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Store, ChartLine, Package, Users } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  const { user, signOut } = useAuth();

  const handleSellerAction = () => {
    if (user?.isApprovedSeller) {
      return "/seller-dashboard";
    } else {
      return "/seller-apply";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Store className="text-white text-sm w-4 h-4" />
              </div>
              <span className="font-semibold text-gray-900">Seller Hub</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{user?.email}</span>
              <button 
                onClick={signOut}
                className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Home Page</h1>
          <p className="text-lg text-gray-600 mb-8">Ready to start selling? Join our marketplace today.</p>
          
          <Link href={handleSellerAction()}>
            <Button className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-lg">
              <Store className="mr-3 w-5 h-5" />
              Seller
            </Button>
          </Link>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <ChartLine className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Analytics Dashboard</h3>
            <p className="text-gray-600 text-sm">Track your sales performance and customer insights</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <Package className="text-blue-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Product Management</h3>
            <p className="text-gray-600 text-sm">Easily manage your inventory and product listings</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="text-amber-600 w-6 h-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Customer Support</h3>
            <p className="text-gray-600 text-sm">Connect with customers and provide excellent service</p>
          </div>
        </div>
      </main>
    </div>
  );
}
