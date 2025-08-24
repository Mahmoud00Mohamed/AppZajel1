import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import {
  User,
  Shield,
  Mail,
  Trash2,
  Phone,
  CheckCircle,
  AlertCircle,
  Calendar,
} from "lucide-react";
import { useUser } from "../../context/UserContext";
import ProfileForm from "../../components/user/ProfileForm";
import PasswordUpdateForm from "../../components/user/PasswordUpdateForm";
import EmailUpdateForm from "../../components/user/EmailUpdateForm";
import DeleteAccountForm from "../../components/user/DeleteAccountForm";

const ProfilePage: React.FC = () => {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "ar";
  const { profile } = useUser();
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    {
      id: "profile",
      label: isRtl ? "الملف الشخصي" : "Profile",
      icon: <User size={20} />,
      color: "purple",
    },
    {
      id: "password",
      label: isRtl ? "كلمة المرور" : "Password",
      icon: <Shield size={20} />,
      color: "orange",
    },
    {
      id: "email",
      label: isRtl ? "البريد الإلكتروني" : "Email",
      icon: <Mail size={20} />,
      color: "blue",
    },
    {
      id: "delete",
      label: isRtl ? "حذف الحساب" : "Delete Account",
      icon: <Trash2 size={20} />,
      color: "red",
    },
  ];

  const getTabColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      purple: isActive
        ? "bg-purple-500 text-white"
        : "text-purple-600 hover:bg-purple-50",
      orange: isActive
        ? "bg-orange-500 text-white"
        : "text-orange-600 hover:bg-orange-50",
      blue: isActive
        ? "bg-blue-500 text-white"
        : "text-blue-600 hover:bg-blue-50",
      red: isActive ? "bg-red-500 text-white" : "text-red-600 hover:bg-red-50",
    };
    return colors[color as keyof typeof colors] || colors.purple;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-8">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            {isRtl ? "إعدادات الحساب" : "Account Settings"}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {isRtl
              ? "إدارة معلوماتك الشخصية وإعدادات الحساب"
              : "Manage your personal information and account settings"}
          </p>
        </motion.div>

        {/* Profile Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <User className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">{profile?.name}</h3>
              <p className="text-gray-600 text-sm">@{profile?.username}</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">
                {isRtl ? "البريد الإلكتروني" : "Email"}
              </h3>
              <div className="flex items-center justify-center gap-1">
                <CheckCircle size={14} className="text-green-500" />
                <p className="text-gray-600 text-sm">
                  {isRtl ? "موثق" : "Verified"}
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">
                {isRtl ? "الهاتف" : "Phone"}
              </h3>
              <div className="flex items-center justify-center gap-1">
                {profile?.isPhoneVerified ? (
                  <>
                    <CheckCircle size={14} className="text-green-500" />
                    <p className="text-gray-600 text-sm">
                      {isRtl ? "موثق" : "Verified"}
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle size={14} className="text-yellow-500" />
                    <p className="text-gray-600 text-sm">
                      {isRtl ? "غير موثق" : "Not Verified"}
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800">
                {isRtl ? "عضو منذ" : "Member Since"}
              </h3>
              <p className="text-gray-600 text-sm">
                {profile?.createdAt
                  ? new Date(profile.createdAt).toLocaleDateString(
                      isRtl ? "ar-EG" : "en-US"
                    )
                  : "-"}
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 sticky top-6">
              <h3 className="font-bold text-gray-800 mb-4">
                {isRtl ? "إعدادات الحساب" : "Account Settings"}
              </h3>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${getTabColorClasses(
                      tab.color,
                      activeTab === tab.id
                    )}`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: isRtl ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            {activeTab === "profile" && <ProfileForm />}
            {activeTab === "password" && <PasswordUpdateForm />}
            {activeTab === "email" && <EmailUpdateForm />}
            {activeTab === "delete" && <DeleteAccountForm />}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
