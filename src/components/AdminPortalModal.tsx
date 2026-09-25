import React, { useState } from 'react';
import { 
  X, 
  Terminal, 
  ShieldCheck, 
  Building2, 
  Key, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Database,
  Lock,
  Radio,
  FileText,
  UserCheck,
  Sparkles,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Property, Inquiry, MaintenanceRequest, Appointment, DocumentRecord } from '../types';

interface AdminPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
  properties: Property[];
  inquiries: Inquiry[];
  maintenanceRequests: MaintenanceRequest[];
  appointments: Appointment[];
  documents: DocumentRecord[];
  onUpdateInquiryStatus?: (id: string, status: 'new' | 'in_progress' | 'contacted' | 'closed') => void;
}

export const AdminPortalModal: React.FC<AdminPortalModalProps> = ({ 
  isOpen, 
  onClose,
  properties,
  inquiries,
  maintenanceRequests,
  appointments,
  documents,
  onUpdateInquiryStatus
}) => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'villas' | 'inquiries' | 'concierge' | 'documents'>('villas');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'villa2026') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleAutoFill = () => {
    setPasscode('villa2026');
    setIsAuthenticated(true);
    setError(false);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-4xl bg-[#0A0A0B] border border-[#B09E51]/40 shadow-[0_0_50px_rgba(176,158,81,0.2)] rounded-lg overflow-hidden flex flex-col max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/90">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 bg-[#B09E51] rounded-full animate-ping" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#E5D3B3] font-bold flex items-center gap-2">
              <Terminal size={14} className="text-[#B09E51]" /> VILLA_OBSIDIAN_OS // BROKER_EXECUTIVE_GATE
            </span>
          </div>
          <button 
            onClick={onClose}
            className="text-white/60 hover:text-[#E5D3B3] transition-colors p-1 cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {!isAuthenticated ? (
          /* Login Screen */
          <div className="p-8 md:p-12 flex flex-col items-center text-center font-mono">
            <div className="w-16 h-16 rounded-full bg-[#B09E51]/10 border border-[#B09E51]/30 flex items-center justify-center text-[#B09E51] mb-6 shadow-[0_0_20px_rgba(176,158,81,0.25)]">
              <Lock size={28} />
            </div>

            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-white mb-2 font-display">
              Broker Executive Authorization
            </h3>
            <p className="text-slate-400 text-base font-semibold max-w-md mb-8 font-sans">
              Enter private broker key to access high-net-worth architectural inventory, VIP client leads, showing schedules, and vault contracts.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
              <div>
                <input 
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="SECURITY PASSKEY"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-md text-white font-mono text-center tracking-[0.3em] uppercase focus:outline-none focus:border-[#B09E51] focus:ring-1 focus:ring-[#B09E51] transition-all"
                />
                {error && (
                  <p className="text-red-400 text-xs mt-2 flex items-center justify-center gap-1">
                    <AlertCircle size={12} /> INVALID PASSKEY. USE THE 1-CLICK DEMO DOOR.
                  </p>
                )}
              </div>

              <button 
                type="submit"
                className="w-full py-3 bg-[#B09E51] hover:bg-[#c4b364] text-black font-bold text-base font-semibold min-h-[44px] uppercase tracking-widest rounded-md transition-all shadow-[0_0_20px_rgba(176,158,81,0.3)] cursor-pointer"
              >
                Access Broker Command
              </button>
            </form>

            {/* 1-Click Auto Fill Demo Passkey */}
            <div className="mt-8 pt-6 border-t border-white/10 w-full max-w-sm flex flex-col items-center">
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase tracking-widest mb-2 font-mono">
                Commercial Demo Bypass Gate
              </span>
              <button 
                type="button"
                onClick={handleAutoFill}
                className="px-5 py-3 min-h-[44px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded text-base font-semibold min-h-[44px] font-mono tracking-wider uppercase transition-all flex items-center gap-2 cursor-pointer"
              >
                <ShieldCheck size={14} /> 1-Click Auto-Fill (villa2026)
              </button>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Suite */
          <div className="flex-1 flex flex-col overflow-hidden font-mono">
            {/* Top Stat Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10 border-b border-white/10 text-xs">
              <div className="bg-[#0A0A0B] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Active Villa Portfolio</span>
                <span className="text-xl font-bold text-[#E5D3B3] mt-1">{properties.length} ESTATES</span>
              </div>
              <div className="bg-[#0A0A0B] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">VIP Inquiries</span>
                <span className="text-xl font-bold text-emerald-400 mt-1">{inquiries.length} LEADS</span>
              </div>
              <div className="bg-[#0A0A0B] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Showings Scheduled</span>
                <span className="text-xl font-bold text-amber-400 mt-1">{appointments.length} PRIVATE</span>
              </div>
              <div className="bg-[#0A0A0B] p-4 flex flex-col">
                <span className="text-slate-400 text-xs font-semibold tracking-wider uppercase">Encrypted Documents</span>
                <span className="text-xl font-bold text-cyan-400 mt-1">{documents.length} DEEDS</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-white/10 bg-black/60 px-6 gap-6 text-xs overflow-x-auto">
              <button 
                onClick={() => setActiveTab('villas')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'villas' 
                    ? 'border-[#B09E51] text-[#E5D3B3] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Building2 size={14} className="text-[#B09E51]" /> Architectural Estates ({properties.length})
              </button>
              <button 
                onClick={() => setActiveTab('inquiries')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'inquiries' 
                    ? 'border-[#B09E51] text-[#E5D3B3] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <UserCheck size={14} className="text-[#B09E51]" /> Buyer Leads ({inquiries.length})
              </button>
              <button 
                onClick={() => setActiveTab('concierge')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'concierge' 
                    ? 'border-[#B09E51] text-[#E5D3B3] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <Calendar size={14} className="text-[#B09E51]" /> VIP Showings ({appointments.length})
              </button>
              <button 
                onClick={() => setActiveTab('documents')}
                className={`py-3 flex items-center gap-2 uppercase tracking-wider transition-colors cursor-pointer border-b-2 ${
                  activeTab === 'documents' 
                    ? 'border-[#B09E51] text-[#E5D3B3] font-bold' 
                    : 'border-transparent text-slate-400 hover:text-white'
                }`}
              >
                <FileText size={14} className="text-[#B09E51]" /> Title Deeds & Leases ({documents.length})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {activeTab === 'villas' && (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                    <span>LIVE RESIDENTIAL SANCTUARIES</span>
                    <span className="text-[#B09E51]">SUPABASE DATABASE SYNCED</span>
                  </div>
                  {properties.map((prop) => (
                    <div 
                      key={prop.id} 
                      className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 hover:border-[#B09E51]/40 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <img 
                          src={prop.images[0]} 
                          alt={prop.title} 
                          className="w-16 h-16 rounded object-cover border border-white/10"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white font-display">{prop.title}</span>
                            <span className="px-2 py-0.5 rounded text-xs font-semibold tracking-wider font-bold bg-[#B09E51]/15 text-[#E5D3B3] border border-[#B09E51]/30 uppercase">
                              {prop.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans mt-0.5 flex items-center gap-1">
                            <MapPin size={11} className="text-[#B09E51]" /> {prop.location}
                          </p>
                          <p className="text-xs font-semibold text-slate-400 font-mono mt-0.5">
                            {prop.bedrooms} BEDS • {prop.bathrooms} BATHS • {prop.sqft.toLocaleString()} SQFT
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-base font-bold text-[#E5D3B3] font-mono">
                          ${prop.price.toLocaleString()}
                        </span>
                        <span className="text-xs font-semibold tracking-wider text-slate-300 block uppercase font-mono">
                          Valuation Anchor
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'inquiries' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">INBOUND HIGH-NET-WORTH BUYER INQUIRIES</div>
                  {inquiries.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center text-slate-400 text-xs">
                      No pending client inquiries at this time.
                    </div>
                  ) : (
                    inquiries.map((inq) => (
                      <div key={inq.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{inq.clientName}</span>
                            <span className="text-xs font-semibold tracking-wider font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                              {inq.status.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-xs text-slate-300 font-sans mt-1">
                            Email: {inq.clientEmail} | Target Property: <strong>{inq.propertyTitle}</strong>
                          </p>
                          {inq.message && (
                            <p className="text-xs font-semibold text-zinc-400 italic mt-1 font-sans">
                              "{inq.message}"
                            </p>
                          )}
                        </div>
                        <span className="text-xs font-semibold tracking-wider text-slate-300 font-mono">
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'concierge' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">CONFIDENTIAL PROPERTY TOUR SCHEDULE</div>
                  {appointments.length === 0 ? (
                    <div className="bg-white/5 border border-white/10 rounded-lg p-8 text-center text-slate-400 text-xs">
                      No private viewings scheduled yet.
                    </div>
                  ) : (
                    appointments.map((appt) => (
                      <div key={appt.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                          <span className="font-bold text-white text-sm">{appt.propertyTitle}</span>
                          <p className="text-xs text-slate-300 font-sans mt-1">
                            Scheduled Date: <strong>{appt.date} at {appt.time}</strong>
                          </p>
                          <p className="text-xs font-semibold tracking-wider text-slate-300 font-mono mt-0.5">
                            Status: {appt.status.toUpperCase()} | Broker ID: {appt.brokerId}
                          </p>
                        </div>
                        <span className="px-3 py-1 bg-[#B09E51]/15 border border-[#B09E51]/30 text-[#E5D3B3] text-xs font-bold rounded uppercase">
                          CONFIRMED
                        </span>
                      </div>
                    ))
                  )}
                </div>
              )}

              {activeTab === 'documents' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 mb-2">VAULT TITLE DEEDS & CONFIDENTIAL LEASES</div>
                  <div className="space-y-2">
                    {documents.map((doc) => (
                      <div key={doc.id} className="bg-white/5 border border-white/10 rounded-lg p-4 flex justify-between items-center hover:border-white/20 transition-all">
                        <div className="flex items-center gap-3">
                          <FileText size={18} className="text-[#B09E51]" />
                          <div>
                            <span className="font-bold text-white text-xs">{doc.title}</span>
                            <span className="text-xs font-semibold tracking-wider text-slate-300 block font-mono">
                              Signed: {new Date(doc.createdAt).toLocaleDateString()} | Vault ID: {doc.id}
                            </span>
                          </div>
                        </div>
                        <a 
                          href={doc.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="px-3 py-1 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold tracking-wider uppercase font-mono rounded border border-white/10 transition-colors"
                        >
                          View PDF
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Ticker */}
            <div className="px-6 py-3 border-t border-white/10 bg-black/90 flex flex-wrap justify-between items-center text-xs font-semibold tracking-wider text-slate-300">
              <span className="flex items-center gap-2">
                <Radio size={12} className="text-[#B09E51] animate-pulse" />
                DATABASE LINK: SUPABASE_RLS_SECURED
              </span>
              <span>VILLA OBSIDIAN OPERATING SYSTEM v1.0.0</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
