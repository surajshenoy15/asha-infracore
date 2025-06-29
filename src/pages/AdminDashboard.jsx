import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import { 
  FileText, 
  Package, 
  Paperclip, 
  LogOut,
  Bell,
  Search,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  Eye,
  Filter,
  Download
} from 'lucide-react';

import ProductManager from '../components/ProductManager';
import AttachmentManager from '../components/AttachmentManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quotations');
  const [quotationStats, setQuotationStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    totalValue: 0,
    recentQuotations: []
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin-login');
    });

    // Fetch quotation data from Supabase
    fetchQuotationData();
  }, [navigate]);

  const fetchQuotationData = async () => {
    try {
      // Replace with your actual table name and structure
      const { data: quotations, error } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) {
        console.error('Error fetching quotations:', error);
        return;
      }

      // Calculate stats from the data
      const total = quotations?.length || 0;
      const pending = quotations?.filter(q => q.status === 'pending').length || 0;
      const approved = quotations?.filter(q => q.status === 'approved').length || 0;
      const totalValue = quotations?.reduce((sum, q) => sum + (q.total_amount || 0), 0) || 0;

      setQuotationStats({
        total,
        pending,
        approved,
        totalValue,
        recentQuotations: quotations || []
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'draft': return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
              <p className="text-slate-600 mt-1">Manage quotations, products, and attachments</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors shadow-sm"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white shadow-sm border-r border-slate-200 min-h-screen">
          <div className="p-6">
            <div className="space-y-2">
              {[
                { id: 'quotations', label: 'Quotations', icon: FileText },
                { id: 'products', label: 'Products', icon: Package },
                { id: 'attachments', label: 'Attachments', icon: Paperclip }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'quotations' && (
            <div className="space-y-6">
              {/* Quotation Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Total Quotations</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{quotationStats.total}</p>
                    </div>
                    <div className="bg-blue-100 p-3 rounded-lg">
                      <FileText className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">Active</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Pending Approval</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{quotationStats.pending}</p>
                    </div>
                    <div className="bg-yellow-100 p-3 rounded-lg">
                      <Users className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <span className="text-yellow-600 font-medium">Needs attention</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Approved</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{quotationStats.approved}</p>
                    </div>
                    <div className="bg-green-100 p-3 rounded-lg">
                      <BarChart3 className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">Completed</span>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-slate-600 text-sm font-medium">Total Value</p>
                      <p className="text-3xl font-bold text-slate-900 mt-2">{formatCurrency(quotationStats.totalValue)}</p>
                    </div>
                    <div className="bg-purple-100 p-3 rounded-lg">
                      <DollarSign className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex items-center mt-4 text-sm">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="text-green-600 font-medium">Revenue</span>
                  </div>
                </div>
              </div>

              {/* Recent Quotations Table */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200">
                <div className="p-6 border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-900">Recent Quotations</h2>
                    <div className="flex items-center space-x-2">
                      <button className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                      </button>
                      <button className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                        <Download className="h-4 w-4" />
                        <span>Export</span>
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-slate-50">
                      <tr>
                        <th className="text-left py-3 px-6 text-slate-600 font-medium">ID</th>
                        <th className="text-left py-3 px-6 text-slate-600 font-medium">Client</th>
                        <th className="text-left py-3 px-6 text-slate-600 font-medium">Amount</th>
                        <th className="text-left py-3 px-6 text-slate-600 font-medium">Status</th>
                        <th className="text-left py-3 px-6 text-slate-600 font-medium">Date</th>
                        <th className="text-left py-3 px-6 text-slate-600 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {quotationStats.recentQuotations.length > 0 ? (
                        quotationStats.recentQuotations.map((quotation) => (
                          <tr key={quotation.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-6 font-medium text-slate-900">#{quotation.id}</td>
                            <td className="py-4 px-6 text-slate-900">{quotation.client_name || 'N/A'}</td>
                            <td className="py-4 px-6 text-slate-900">{formatCurrency(quotation.total_amount || 0)}</td>
                            <td className="py-4 px-6">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(quotation.status)}`}>
                                {quotation.status?.charAt(0).toUpperCase() + quotation.status?.slice(1) || 'Draft'}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-slate-600">{formatDate(quotation.created_at)}</td>
                            <td className="py-4 px-6">
                              <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors">
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="py-8 px-6 text-center text-slate-500">
                            No quotations found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Product Management</h2>
                <p className="text-slate-600 mt-1">Manage your product catalog and inventory</p>
              </div>
              <ProductManager />
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-slate-900">Attachment Management</h2>
                <p className="text-slate-600 mt-1">Manage files and documents</p>
              </div>
              <AttachmentManager />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}