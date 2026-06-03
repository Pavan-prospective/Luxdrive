"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { getSellerProfile, updateSellerProfile, SellerProfileResponse } from "@/api/seller";
import { 
  User, Mail, Phone, Shield, Calendar, 
  XCircle, Clock, Award, Building2, MapPin, 
  CheckCircle2, Briefcase, FileText, Car,
  Edit2, Save, X
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const { user, isLoading } = useAuth();
  const [sellerProfile, setSellerProfile] = useState<SellerProfileResponse | null>(null);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  const [isEditingSeller, setIsEditingSeller] = useState(false);
  const [isSavingSeller, setIsSavingSeller] = useState(false);
  const [sellerEditData, setSellerEditData] = useState({
    business_name: "",
    city: "",
    state: "",
    address: "",
    gst_number: ""
  });

  const toggleEditSeller = () => {
    if (!isEditingSeller && sellerProfile) {
      setSellerEditData({
        business_name: sellerProfile.business_name || "",
        city: sellerProfile.city || "",
        state: sellerProfile.state || "",
        address: sellerProfile.address || "",
        gst_number: sellerProfile.gst_number || ""
      });
    }
    setIsEditingSeller(!isEditingSeller);
  };

  const handleSaveSeller = async () => {
    setIsSavingSeller(true);
    try {
      await updateSellerProfile(sellerEditData);
      const updatedProfile = await getSellerProfile();
      setSellerProfile(updatedProfile);
      setIsEditingSeller(false);
    } catch (err) {
      console.error("Failed to update seller profile", err);
    } finally {
      setIsSavingSeller(false);
    }
  };

  const handleSellerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setSellerEditData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchSellerProfile = async () => {
      try {
        const profile = await getSellerProfile();
        if (profile) {
          setSellerProfile(profile);
        }
      } catch (err) {
        console.log("No seller profile found or error fetching it.");
      } finally {
        setIsSellerLoading(false);
      }
    };
    
    if (user) {
      fetchSellerProfile();
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent border-t-transparent" />
          <p className="text-xs font-bold text-muted uppercase tracking-widest animate-pulse">Loading Profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-red-50/10 border border-red-500/20 text-red-500 p-6 rounded-2xl flex items-center gap-3">
        <XCircle className="w-5 h-5 shrink-0" />
        <span className="font-semibold text-sm">Failed to retrieve profile data. Please log in again.</span>
      </div>
    );
  }

  // Name initials generator
  const getInitials = (name: string) => {
    if (!name) return "U";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0].slice(0, 2).toUpperCase();
  };

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateStr;
    }
  };

  const formatTime = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return dateStr;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-4xl mx-auto space-y-8"
    >
      <div>
        <h1 className="text-3xl font-black text-primary mb-2">My Profile</h1>
        <p className="text-muted-foreground font-medium">Manage and view your credentials and account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Card - Summary */}
        <div className="md:col-span-4 bg-primary text-white p-8 rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden shadow-xl h-fit">
          <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
          
          <div className="w-24 h-24 rounded-3xl bg-accent flex items-center justify-center text-white font-black text-3xl shadow-lg shadow-accent/20 mb-6 select-none">
            {getInitials(user.full_name)}
          </div>

          <h3 className="text-xl font-black mb-1">{user.full_name}</h3>
          <p className="text-xs font-bold text-accent uppercase tracking-widest mb-6">{user.role}</p>

          <div className="w-full border-t border-white/10 my-4" />

          <div className="w-full space-y-4 text-left mt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/50 font-bold uppercase tracking-wider">Status</span>
              <span className={`inline-flex items-center gap-1 font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-[10px] ${
                user.is_active 
                  ? "bg-green-500/10 text-green-400" 
                  : "bg-red-500/10 text-red-400"
              }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${user.is_active ? "bg-green-400" : "bg-red-400"} animate-pulse`} />
                {user.is_active ? "Active" : "Inactive"}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/50 font-bold uppercase tracking-wider">Verification</span>
              <span className={`inline-flex items-center gap-1 font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-[10px] ${
                user.is_verified 
                  ? "bg-accent/10 text-accent" 
                  : "bg-yellow-500/10 text-yellow-400"
              }`}>
                {user.is_verified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="md:col-span-8 space-y-8">
          
          {/* Account Details Card */}
          <div className="bg-white p-10 rounded-[3rem] border border-border shadow-sm space-y-8">
            <div className="flex items-center gap-3 border-b border-border pb-6">
              <Award className="w-6 h-6 text-accent" />
              <h3 className="text-xl font-black text-primary">Account Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {/* Full Name */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-accent" /> Full Name
                </span>
                <p className="text-base font-black text-primary">{user.full_name}</p>
              </div>

              {/* Email Address */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-accent" /> Email Address
                </span>
                <p className="text-base font-black text-primary break-all">{user.email}</p>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-accent" /> Phone Number
                </span>
                <p className="text-base font-black text-primary">{user.phone || "Not Provided"}</p>
              </div>

              {/* Account Role */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-accent" /> Account Role
                </span>
                <p className="text-base font-black text-primary capitalize">{user.role}</p>
              </div>

              {/* Member Since */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-accent" /> Member Since
                </span>
                <p className="text-base font-black text-primary">
                  {user.created_at ? formatDate(user.created_at) : "N/A"}
                </p>
              </div>

              {/* Last Active */}
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-accent" /> Last Login
                </span>
                <p className="text-base font-black text-primary">
                  {user.last_login_at ? formatTime(user.last_login_at) : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Seller Details Card */}
          {!isSellerLoading && sellerProfile && (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[3rem] border border-border shadow-sm space-y-8 relative"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-border pb-6">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-black text-primary">Seller Details</h3>
                  {sellerProfile.verification_status === "verified" && (
                    <span className="flex items-center gap-1.5 text-xs font-bold text-green-500 bg-green-500/10 px-3 py-1.5 rounded-full uppercase tracking-widest">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Verified
                    </span>
                  )}
                </div>
                <div className="sm:ml-auto flex items-center gap-2">
                  {isEditingSeller ? (
                    <>
                      <Button variant="ghost" size="sm" onClick={toggleEditSeller} className="text-muted" disabled={isSavingSeller}>
                        <X className="w-4 h-4 mr-2" /> Cancel
                      </Button>
                      <Button variant="accent" size="sm" onClick={handleSaveSeller} isLoading={isSavingSeller}>
                        <Save className="w-4 h-4 mr-2" /> Save
                      </Button>
                    </>
                  ) : (
                    <Button variant="outline" size="sm" onClick={toggleEditSeller} className="text-accent border-accent">
                      <Edit2 className="w-4 h-4 mr-2" /> Edit Profile
                    </Button>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Seller Type */}
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-accent" /> Seller Type
                  </span>
                  <p className="text-base font-black text-primary capitalize">
                    {sellerProfile.seller_type.replace("seller_", "")}
                  </p>
                </div>

                {/* Business Name */}
                {(sellerProfile.business_name || isEditingSeller) && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-accent" /> Business Name
                    </span>
                    {isEditingSeller ? (
                      <input
                        type="text"
                        name="business_name"
                        value={sellerEditData.business_name}
                        onChange={handleSellerChange}
                        className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                      />
                    ) : (
                      <p className="text-base font-black text-primary">{sellerProfile.business_name}</p>
                    )}
                  </div>
                )}

                {/* City & State (Shown side by side when editing, otherwise joined in location) */}
                {isEditingSeller ? (
                  <>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-accent" /> City
                      </span>
                      <input
                        type="text"
                        name="city"
                        value={sellerEditData.city}
                        onChange={handleSellerChange}
                        className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-accent" /> State
                      </span>
                      <input
                        type="text"
                        name="state"
                        value={sellerEditData.state}
                        onChange={handleSellerChange}
                        className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                      />
                    </div>
                  </>
                ) : null}

                {/* Location */}
                <div className={`space-y-1 ${isEditingSeller ? "sm:col-span-2" : "sm:col-span-2"}`}>
                  <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-accent" /> Registered Address
                  </span>
                  {isEditingSeller ? (
                    <textarea
                      name="address"
                      value={sellerEditData.address}
                      onChange={handleSellerChange}
                      rows={2}
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none"
                    />
                  ) : (
                    <p className="text-base font-medium text-primary">
                      {sellerProfile.address}, {sellerProfile.city}, {sellerProfile.state}
                    </p>
                  )}
                </div>

                {/* GST Number */}
                {(sellerProfile.gst_number || isEditingSeller) && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                      <FileText className="w-3.5 h-3.5 text-accent" /> GST Number
                    </span>
                    {isEditingSeller ? (
                      <input
                        type="text"
                        name="gst_number"
                        value={sellerEditData.gst_number}
                        onChange={handleSellerChange}
                        className="w-full h-10 bg-secondary border border-border rounded-lg px-3 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                      />
                    ) : (
                      <p className="text-base font-black text-primary uppercase">{sellerProfile.gst_number}</p>
                    )}
                  </div>
                )}

                {/* Listing Limit */}
                {!isEditingSeller && (
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest flex items-center gap-2">
                      <Car className="w-3.5 h-3.5 text-accent" /> Active Listing Limit
                    </span>
                    <p className="text-base font-black text-primary">{sellerProfile.active_listing_limit} Cars</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </div>
      </div>
    </motion.div>
  );
}
