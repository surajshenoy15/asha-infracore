import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import NotificationSettings from '../components/NotificationSettings';

import {
  FileText,
  Package,
  Paperclip,
  LogOut,
  Download,
  Check,
  XCircle,
  Search,
  Filter,
  TrendingUp,
  Users,
  Calendar,
  Bell,
  X,
  Clock,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

import ProductManager from '../components/ProductManager';
import AttachmentManager from '../components/AttachmentManager';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('quotations');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [quotationStats, setQuotationStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    recentQuotations: []
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin-login');
    });
    fetchQuotationData();
  }, [navigate]);

  const fetchQuotationData = async () => {
    try {
      const { data: quotations, error } = await supabase
        .from('quotations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching quotations:', error);
        return;
      }

      const total = quotations?.length || 0;
      const pending = quotations?.filter(q => q.status === 'pending').length || 0;
      const approved = quotations?.filter(q => q.status === 'approved').length || 0;

      setQuotationStats({
        total,
        pending,
        approved,
        recentQuotations: quotations || []
      });

      // Generate notifications
      generateNotifications(quotations || []);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [emailNotifEnabled, setEmailNotifEnabled] = useState(true);
const [formToggles, setFormToggles] = useState({
  getInTouch: true,
  getQuote: true
});

  const generateNotifications = (quotations) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const newNotifications = [];

    // Pending quotations notifications
    const pendingQuotations = quotations.filter(q => q.status === 'pending');
    if (pendingQuotations.length > 0) {
      newNotifications.push({
        id: 'pending-quotations',
        type: 'warning',
        title: `${pendingQuotations.length} Pending Quotation${pendingQuotations.length > 1 ? 's' : ''}`,
        message: `You have ${pendingQuotations.length} quotation${pendingQuotations.length > 1 ? 's' : ''} waiting for review`,
        time: 'Now',
        urgent: pendingQuotations.length > 5,
        icon: Clock
      });
    }

    // New quotations today
    const todayQuotations = quotations.filter(q => {
      const quotationDate = new Date(q.created_at);
      return quotationDate >= today;
    });

    if (todayQuotations.length > 0) {
      newNotifications.push({
        id: 'today-quotations',
        type: 'info',
        title: `${todayQuotations.length} New Quotation${todayQuotations.length > 1 ? 's' : ''} Today`,
        message: `${todayQuotations.length} quotation${todayQuotations.length > 1 ? 's were' : ' was'} submitted today`,
        time: 'Today',
        urgent: false,
        icon: FileText
      });
    }

    // Old pending quotations (more than 3 days)
    const oldPendingQuotations = quotations.filter(q => {
      if (q.status !== 'pending') return false;
      const quotationDate = new Date(q.created_at);
      const threeDaysAgo = new Date(today);
      threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
      return quotationDate < threeDaysAgo;
    });

    if (oldPendingQuotations.length > 0) {
      newNotifications.push({
        id: 'old-pending',
        type: 'error',
        title: 'Overdue Reviews',
        message: `${oldPendingQuotations.length} quotation${oldPendingQuotations.length > 1 ? 's have' : ' has'} been pending for more than 3 days`,
        time: '3+ days ago',
        urgent: true,
        icon: AlertTriangle
      });
    }

    // Recent approvals
    const recentApprovals = quotations.filter(q => {
      if (q.status !== 'approved') return false;
      const quotationDate = new Date(q.created_at);
      return quotationDate >= yesterday;
    });

    if (recentApprovals.length > 0) {
      newNotifications.push({
        id: 'recent-approvals',
        type: 'success',
        title: `${recentApprovals.length} Recent Approval${recentApprovals.length > 1 ? 's' : ''}`,
        message: `${recentApprovals.length} quotation${recentApprovals.length > 1 ? 's were' : ' was'} approved recently`,
        time: 'Recently',
        urgent: false,
        icon: CheckCircle
      });
    }

    setNotifications(newNotifications);
  };

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from('quotations')
      .update({ status: newStatus })
      .eq('id', id);

    if (!error) fetchQuotationData();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin-login');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const dismissNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'warning': return Clock;
      case 'error': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return FileText;
      default: return Bell;
    }
  };

  const getNotificationColors = (type, urgent = false) => {
    if (urgent) {
      return {
        bg: 'bg-red-50 border-red-200',
        icon: 'text-red-600',
        title: 'text-red-900',
        message: 'text-red-700'
      };
    }

    switch (type) {
      case 'warning':
        return {
          bg: 'bg-amber-50 border-amber-200',
          icon: 'text-amber-600',
          title: 'text-amber-900',
          message: 'text-amber-700'
        };
      case 'error':
        return {
          bg: 'bg-red-50 border-red-200',
          icon: 'text-red-600',
          title: 'text-red-900',
          message: 'text-red-700'
        };
      case 'success':
        return {
          bg: 'bg-green-50 border-green-200',
          icon: 'text-green-600',
          title: 'text-green-900',
          message: 'text-green-700'
        };
      case 'info':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600',
          title: 'text-blue-900',
          message: 'text-blue-700'
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          icon: 'text-gray-600',
          title: 'text-gray-900',
          message: 'text-gray-700'
        };
    }
  };

  const urgentNotificationsCount = notifications.filter(n => n.urgent).length;
  const totalNotificationsCount = notifications.length;

const generatePDF = async (quotation) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    const primaryColor = [255, 54, 0];
    const secondaryColor = [102, 102, 102];
    const lightGray = [245, 245, 245];

    // Function to load image as base64
    const loadImageAsBase64 = (src) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });
    };

    // Load logos
    const logoIconBase64 = await loadImageAsBase64(`${window.location.origin}/logo-asha.png`);
    const logoTextBase64 = await loadImageAsBase64(`${window.location.origin}/logo-text.png`);

    // Header background
    doc.setFillColor(...primaryColor);
    doc.rect(0, 0, pageWidth, 40, 'F');

    // Add logos (aligned)
    if (logoIconBase64) {
      doc.addImage(logoIconBase64, 'PNG', 15, 10, 18, 18); // small icon
    }

    if (logoTextBase64) {
      doc.addImage(logoTextBase64, 'PNG', 36, 11, 45, 16); // horizontal logo
    }

    if (!logoIconBase64 && !logoTextBase64) {
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(20);
      doc.setFont('helvetica', 'bold');
      doc.text('ASHA INFRACORE', 15, 25);
    }

    // Header text
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('QUOTATION DETAILS', pageWidth - 15, 20, { align: 'right' });

    doc.setFontSize(11);
    doc.setFont('helvetica', 'normal');
    doc.text('Professional Quotation Report', pageWidth - 15, 28, { align: 'right' });

    // Quotation ID
    const idText = `#${String(quotation.serial_id).padStart(3, '0')}`;
    doc.setFillColor(...lightGray);
    doc.roundedRect(15, 50, 60, 20, 3, 3, 'F');
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('Quotation ID', 17, 58);
    doc.setFontSize(20);
    doc.text(idText, 17, 67);

    // Status
    const statusColor = quotation.status === 'approved'
      ? [34, 197, 94]
      : quotation.status === 'cancelled'
      ? [239, 68, 68]
      : [245, 158, 11];
    doc.setFillColor(...statusColor);
    doc.roundedRect(pageWidth - 65, 50, 50, 15, 3, 3, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text(quotation.status.toUpperCase(), pageWidth - 40, 60, { align: 'center' });

    // Client Info Section
    let yPos = 90;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('CLIENT INFORMATION', 15, yPos);

    const clientInfo = [
      { label: 'Full Name', value: quotation.client_name || 'N/A' },
      { label: 'Email Address', value: quotation.email || 'N/A' },
      { label: 'Phone Number', value: quotation.phone || 'N/A' },
      { label: 'Company', value: quotation.company || 'N/A' },
      { label: 'City', value: quotation.city || 'N/A' }
    ];

    yPos += 15;
    clientInfo.forEach((info, index) => {
      const xPos = 15 + (index % 2) * (pageWidth / 2 - 20);
      const cardY = yPos + Math.floor(index / 2) * 28;

      doc.setFillColor(248, 250, 252);
      doc.roundedRect(xPos, cardY, pageWidth / 2 - 25, 23, 2, 2, 'F');

      doc.setTextColor(...secondaryColor);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text(info.label.toUpperCase(), xPos + 5, cardY + 8);

      doc.setTextColor(30, 30, 30);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const truncatedValue = info.value.length > 28 ? info.value.substring(0, 28) + '...' : info.value;
      doc.text(truncatedValue, xPos + 5, cardY + 17);
    });

    // Product Interest Section
    yPos += 85;
    doc.setTextColor(...primaryColor);
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text('PRODUCT INTEREST', 15, yPos);
    yPos += 10;

    doc.setFillColor(255, 246, 235);
    doc.roundedRect(15, yPos, pageWidth - 30, 30, 3, 3, 'F');
    doc.setTextColor(30, 30, 30);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    const productText = quotation.product_interest || 'No specific interest mentioned';
    const splitProductText = doc.splitTextToSize(productText, pageWidth - 40);
    doc.text(splitProductText, 20, yPos + 12);

    // Additional Comments Section
    if (quotation.comments && quotation.comments.trim() !== '') {
      yPos += 45;
      doc.setTextColor(...primaryColor);
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.text('ADDITIONAL COMMENTS', 15, yPos);
      yPos += 10;

      doc.setFillColor(250, 250, 250);
      doc.roundedRect(15, yPos, pageWidth - 30, 35, 3, 3, 'F');
      doc.setTextColor(30, 30, 30);
      doc.setFontSize(11);
      doc.setFont('helvetica', 'normal');
      const splitComments = doc.splitTextToSize(quotation.comments, pageWidth - 40);
      doc.text(splitComments, 20, yPos + 12);
    }

    // Footer
    const footerY = pageHeight - 35;
    doc.setFillColor(...lightGray);
    doc.rect(0, footerY, pageWidth, 35, 'F');

    doc.setTextColor(...secondaryColor);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text('© 2025 Asha Infracore. All rights reserved.', 15, footerY + 12);
    doc.text(`Document ID: QUO-${quotation.serial_id}-${Date.now()}`, 15, footerY + 22);

    doc.setTextColor(...primaryColor);
    doc.setFontSize(9);
    doc.text('Generated by Admin Dashboard', pageWidth - 15, footerY + 12, { align: 'right' });
    doc.text(`Created: ${new Date(quotation.created_at).toLocaleDateString()}`, pageWidth - 15, footerY + 22, { align: 'right' });

    // Save
    const fileName = `Quotation_${String(quotation.serial_id).padStart(3, '0')}_${new Date().toISOString().split('T')[0]}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('PDF generation failed:', error);
    alert('Failed to generate PDF.');
  }
};



  const filteredQuotations = quotationStats.recentQuotations.filter(quotation => {
    const matchesSearch = quotation.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         quotation.company?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || quotation.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { 
      label: 'Total Quotations', 
      value: quotationStats.total, 
      icon: FileText, 
      bgColor: 'bg-[#FF3600]/10',
      iconColor: 'text-[#FF3600]'
    },
    { 
      label: 'Pending Reviews', 
      value: quotationStats.pending, 
      icon: TrendingUp, 
      bgColor: 'bg-amber-500/10',
      iconColor: 'text-amber-600'
    },
    { 
      label: 'Approved', 
      value: quotationStats.approved, 
      icon: Check, 
      bgColor: 'bg-emerald-500/10',
      iconColor: 'text-emerald-600'
    },
    { 
      label: 'This Month', 
      value: quotationStats.recentQuotations.filter(q => 
        new Date(q.created_at).getMonth() === new Date().getMonth()
      ).length, 
      icon: Calendar, 
      bgColor: 'bg-[#FF3600]/10',
      iconColor: 'text-[#FF3600]'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">

        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-[#FF3600] to-[#E62E00] rounded-xl flex items-center justify-center shadow-lg">
              <Users className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm">Manage quotations, products, and attachments</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Active Notification Button */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:text-[#FF3600] hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <Bell className="h-5 w-5" />
                {totalNotificationsCount > 0 && (
                  <span className={`absolute -top-1 -right-1 w-5 h-5 ${urgentNotificationsCount > 0 ? 'bg-red-500' : 'bg-[#FF3600]'} text-white text-xs rounded-full flex items-center justify-center font-semibold ${urgentNotificationsCount > 0 ? 'animate-pulse' : ''}`}>
                    {totalNotificationsCount > 9 ? '9+' : totalNotificationsCount}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 top-12 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="p-1 text-gray-400 hover:text-gray-600 rounded"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    {totalNotificationsCount > 0 && (
                      <p className="text-sm text-gray-600 mt-1">
                        {totalNotificationsCount} notification{totalNotificationsCount > 1 ? 's' : ''}
                        {urgentNotificationsCount > 0 && (
                          <span className="text-red-600 font-medium"> • {urgentNotificationsCount} urgent</span>
                        )}
                      </p>
                    )}
                  </div>
                  
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => {
                        const Icon = notification.icon;
                        const colors = getNotificationColors(notification.type, notification.urgent);
                        
                        return (
                          <div key={notification.id} className={`p-4 border-b border-gray-100 ${colors.bg} border-l-4 ${notification.urgent ? 'border-l-red-500' : 'border-l-transparent'}`}>
                            <div className="flex items-start space-x-3">
                              <div className={`p-2 rounded-lg ${colors.bg}`}>
                                <Icon className={`h-4 w-4 ${colors.icon}`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div className="flex-1">
                                    <p className={`text-sm font-semibold ${colors.title}`}>
                                      {notification.title}
                                      {notification.urgent && (
                                        <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                                          Urgent
                                        </span>
                                      )}
                                    </p>
                                    <p className={`text-sm mt-1 ${colors.message}`}>
                                      {notification.message}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-2">{notification.time}</p>
                                  </div>
                                  <button
                                    onClick={() => dismissNotification(notification.id)}
                                    className="ml-2 p-1 text-gray-400 hover:text-gray-600 rounded"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-8 text-center">
                        <Bell className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <p className="text-gray-600">No notifications</p>
                        <p className="text-sm text-gray-500 mt-1">You're all caught up!</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-gradient-to-r from-[#FF3600] to-[#E62E00] text-white px-4 py-2 rounded-xl hover:from-[#E62E00] hover:to-[#CC2600] transition-all duration-200 shadow-lg hover:shadow-[#FF3600]/25"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
  {/* Sidebar */}
  <nav className="w-full lg:w-72 bg-white border-r border-gray-200 min-h-[300px] lg:min-h-screen p-6 shadow-sm">

          <div className="space-y-2">
            {[
              { id: 'quotations', label: 'Quotations', icon: FileText, badge: quotationStats.pending },
              { id: 'products', label: 'Products', icon: Package },
              { id: 'attachments', label: 'Attachments', icon: Paperclip },
              // { id: 'notifications', label: 'Notifications', icon: Bell }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-[#FF3600]/10 to-[#FF3600]/5 text-[#FF3600] border border-[#FF3600]/20 shadow-md'
                      : 'text-gray-600 hover:text-[#FF3600] hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {tab.badge > 0 && (
                    <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 space-y-6">

          {activeTab === 'quotations' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 hover:border-gray-300 transition-all duration-300 shadow-sm hover:shadow-md">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                        </div>
                        <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center`}>
                          <Icon className={`h-6 w-6 ${stat.iconColor}`} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Search and Filter */}
              <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search quotations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-[#FF3600] focus:ring-2 focus:ring-[#FF3600]/20 transition-all duration-200"
                    />
                  </div>
                  <div className="relative">
                    <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="pl-10 pr-8 py-3 bg-gray-50 border border-gray-300 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF3600] focus:ring-2 focus:ring-[#FF3600]/20 transition-all duration-200 appearance-none cursor-pointer"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {['ID', 'Client', 'Email', 'Phone', 'Company', 'City', 'Interest', 'Status', 'Date', 'Actions'].map((header) => (
                          <th key={header} className="text-left py-4 px-4 text-gray-600 font-medium text-sm">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredQuotations.length > 0 ? (
                        filteredQuotations.map((quotation) => (
                          <tr key={quotation.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all duration-200 group">
                            <td className="py-4 px-4">
                              <span className="font-mono text-[#FF3600] font-semibold">
                                #{String(quotation.serial_id).padStart(3, '0')}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-gray-900 font-medium">{quotation.client_name}</td>
                            <td className="py-4 px-4 text-gray-700">{quotation.email}</td>
                            <td className="py-4 px-4 text-gray-700">{quotation.phone}</td>
                            <td className="py-4 px-4 text-gray-700">{quotation.company}</td>
                            <td className="py-4 px-4 text-gray-700">{quotation.city}</td>
                            <td className="py-4 px-4 text-gray-700">{quotation.product_interest}</td>
                            <td className="py-4 px-4">
                              {quotation.status === 'approved' ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                  Confirmed
                                </span>
                              ) : quotation.status === 'cancelled' ? (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
                                  Cancelled
                                </span>
                              ) : (
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleStatusChange(quotation.id, 'approved')}
                                    className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100 rounded-lg transition-all duration-200"
                                    title="Approve"
                                  >
                                    <Check className="h-4 w-4" />
                                  </button>
                                  <button
                                    onClick={() => handleStatusChange(quotation.id, 'cancelled')}
                                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg transition-all duration-200"
                                    title="Cancel"
                                  >
                                    <XCircle className="h-4 w-4" />
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="py-4 px-4 text-gray-600">{formatDate(quotation.created_at)}</td>
                            <td className="py-4 px-4">
                              <button
                                onClick={() => generatePDF(quotation)}
                                className="p-2 text-[#FF3600] hover:text-[#E62E00] hover:bg-[#FF3600]/10 rounded-lg transition-all duration-200"
                                title="Download PDF"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="10" className="py-12 text-center">
                            <div className="flex flex-col items-center space-y-3">
                              <FileText className="h-12 w-12 text-gray-400" />
                              <p className="text-gray-600 text-lg">No quotations found</p>
                              <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === 'products' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Package className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              </div>
              <ProductManager />
            </div>
          )}

          {activeTab === 'attachments' && (
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-[#FF3600] to-[#E62E00] rounded-xl flex items-center justify-center shadow-lg">
                  <Paperclip className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Attachment Management</h2>
              </div>
              <AttachmentManager />
            </div>
          )}

          {/* {activeTab === 'notifications' && (
  <NotificationSettings
    emailNotifEnabled={emailNotifEnabled}
    setEmailNotifEnabled={setEmailNotifEnabled}
    formToggles={formToggles}
    setFormToggles={setFormToggles}
  />
)} */}
        </main>
      </div>
    </div>
  );
}