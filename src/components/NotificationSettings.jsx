import React, { useState, useEffect } from 'react';
import { Bell, Mail, MessageSquare, FileText, Monitor } from 'lucide-react';

const NotificationSettings = () => {
  const [emailNotifEnabled, setEmailNotifEnabled] = useState(true);
  const [desktopNotifEnabled, setDesktopNotifEnabled] = useState(true); // ✅ new state
  const [formToggles, setFormToggles] = useState({
    getInTouch: true,
    getQuote: false,
  });

  useEffect(() => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        setEmailNotifEnabled(data.email_notifications);
        setDesktopNotifEnabled(data.desktop_notifications ?? true); // ✅ load from DB
        setFormToggles({
          getInTouch: data.get_in_touch,
          getQuote: data.get_quote,
        });
      })
      .catch((err) => console.error('Failed to load notification settings:', err));
  }, []);

  const handleMasterToggle = () => {
    const newState = !emailNotifEnabled;
    setEmailNotifEnabled(newState);
    if (!newState) {
      setFormToggles({ getInTouch: false, getQuote: false });
    }
  };

  const handleFormToggle = (formType) => {
    setFormToggles((prev) => ({
      ...prev,
      [formType]: !prev[formType],
    }));
  };

  const saveSettings = async () => {
    try {
      await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_notifications: emailNotifEnabled,
          desktop_notifications: desktopNotifEnabled, // ✅ save to backend
          get_in_touch: formToggles.getInTouch,
          get_quote: formToggles.getQuote,
        }),
      });
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Manage your notification preferences</p>
        </div>

        {/* Notification Settings Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-gradient-to-br from-[#FF3600] to-red-600 rounded-xl flex items-center justify-center shadow-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Notification Settings</h2>
              <p className="text-gray-500">Control email and desktop notifications</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Master Email Toggle */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FF3600] bg-opacity-10 rounded-lg flex items-center justify-center">
                    <Mail className="h-5 w-5 text-[#FF3600]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Master toggle for all email notifications</p>
                  </div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifEnabled}
                    onChange={handleMasterToggle}
                    className="sr-only peer"
                  />
                  <div className={`w-12 h-6 rounded-full transition-all relative ${
                    emailNotifEnabled ? 'bg-[#FF3600]' : 'bg-gray-200'
                  }`}>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      emailNotifEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </div>
                </label>
              </div>
            </div>

            {/* Desktop Notification Toggle */}
            <div className="border-b border-gray-200 pb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Monitor className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Desktop Notifications</h3>
                    <p className="text-sm text-gray-500">Popup alerts while using the dashboard</p>
                  </div>
                </div>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={desktopNotifEnabled}
                    onChange={() => setDesktopNotifEnabled(!desktopNotifEnabled)}
                    className="sr-only peer"
                  />
                  <div className={`w-12 h-6 rounded-full transition-all relative ${
                    desktopNotifEnabled ? 'bg-green-500' : 'bg-gray-200'
                  }`}>
                    <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                      desktopNotifEnabled ? 'translate-x-6' : 'translate-x-0'
                    }`} />
                  </div>
                </label>
              </div>
            </div>

            {/* Individual Forms */}
            <div className="space-y-6">
              {/* Contact Form */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <MessageSquare className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-gray-800">Contact Form (Get In Touch)</h4>
                      <p className="text-sm text-gray-500">Receive notifications when users submit contact forms</p>
                    </div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formToggles.getInTouch && emailNotifEnabled}
                      onChange={() => handleFormToggle('getInTouch')}
                      disabled={!emailNotifEnabled}
                      className="sr-only peer"
                    />
                    <div className={`w-12 h-6 rounded-full transition-all relative ${
                      formToggles.getInTouch && emailNotifEnabled ? 'bg-green-500' : 'bg-gray-200'
                    } ${!emailNotifEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        formToggles.getInTouch && emailNotifEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </div>
                  </label>
                </div>
              </div>

              {/* Quote Form */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <FileText className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-md font-medium text-gray-800">Quotation Form (Get a Quote)</h4>
                      <p className="text-sm text-gray-500">Receive notifications when users request quotes</p>
                    </div>
                  </div>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formToggles.getQuote && emailNotifEnabled}
                      onChange={() => handleFormToggle('getQuote')}
                      disabled={!emailNotifEnabled}
                      className="sr-only peer"
                    />
                    <div className={`w-12 h-6 rounded-full transition-all relative ${
                      formToggles.getQuote && emailNotifEnabled ? 'bg-green-500' : 'bg-gray-200'
                    } ${!emailNotifEnabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                      <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${
                        formToggles.getQuote && emailNotifEnabled ? 'translate-x-6' : 'translate-x-0'
                      }`} />
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="text-right mt-6">
              <button
                onClick={saveSettings}
                className="px-6 py-2 bg-[#FF3600] text-white rounded-xl font-semibold hover:bg-[#e43d00] transition"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
