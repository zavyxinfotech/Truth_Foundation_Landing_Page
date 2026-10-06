/* cspell:disable */
/* eslint-disable */
import React, { useState } from 'react';
import { Heart, ShieldCheck, Lock, CheckCircle2, Download, Printer, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import truthLogo from '../assets/images/truth_foundation_logo_1785562616008.jpg?w=128&format=webp';
import sadChildPainting from '../assets/images/sad_child_painting.jpg?w=512;1024&format=webp;jpg&as=picture';
import brushMask from '../assets/images/brush_mask.png?w=700&format=webp';
import { pixelTracker } from '../utils/pixelTracker';
import { Picture } from './Picture';

interface DonatePageProps {
  initialAmount?: number;
  onClose?: () => void;
  onDonateSuccess?: () => void;
  onNavigateHome?: (anchor?: string) => void;
}

export const DonatePage: React.FC<DonatePageProps> = ({ initialAmount = 500, onClose, onDonateSuccess, onNavigateHome }) => {
  const [selectedAmount, setSelectedAmount] = useState<number>(initialAmount);
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [customValue, setCustomValue] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [paymentSuccess, setPaymentSuccess] = useState<{ paymentId: string; amount: number } | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
  });

  const activeAmount = isCustom ? (parseInt(customValue, 10) || 100) : selectedAmount;

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onNavigateHome) {
      onNavigateHome();
    } else if (onClose) {
      onClose();
    } else {
      window.location.href = '/';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsProcessing(true);
    pixelTracker.trackDonateClick(activeAmount, 'Separate Donate Page Submit');

    try {
      const amountInPaise = Math.max(100, activeAmount * 100);
      const res = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInPaise,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`
        }),
      });

      const orderData = await res.json();

      if (!res.ok || !orderData.order_id) {
        throw new Error(orderData.error || 'Failed to create Razorpay order');
      }

      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TkcXDVNE0IJstM';

      if (typeof window.Razorpay !== 'function') {
        throw new Error('Razorpay SDK failed to load. Please check your network connection.');
      }

      const options = {
        key: razorpayKey,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Truth Foundation',
        description: 'Contribution – Feed & Educate Children',
        image: truthLogo,
        order_id: orderData.order_id,
        handler: async function (response: {
          razorpay_payment_id: string;
          razorpay_order_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();
            setIsProcessing(false);

            if (verifyRes.ok && verifyData.success) {
              setPaymentSuccess({ paymentId: response.razorpay_payment_id, amount: activeAmount });
              pixelTracker.trackPaymentCompleted(activeAmount, formData.fullName, response.razorpay_payment_id);

              confetti({
                particleCount: 120,
                spread: 80,
                origin: { y: 0.6 }
              });
            } else {
              setErrorMessage(verifyData.error || 'Payment verification failed');
            }
          } catch (err: any) {
            setIsProcessing(false);
            setErrorMessage(err.message || 'Payment verification failed');
          }
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#0a2240',
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        setIsProcessing(false);
        setErrorMessage(resp.error?.description || 'Payment failed');
      });
      rzp.open();
    } catch (err: any) {
      setIsProcessing(false);
      setErrorMessage(err.message || 'Failed to initiate Razorpay checkout');
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-slate-900 flex flex-col justify-between font-sans antialiased selection:bg-amber-400 selection:text-slate-950">
      
      {/* 1. Header Bar matching Attached Reference Screenshot */}
      <header className="w-full bg-white text-slate-900 py-3.5 px-4 sm:px-8 border-b border-slate-200/80 shadow-xs sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Permanent Left Logo & Title Branding */}
          <a
            href="/"
            onClick={handleLogoClick}
            className="flex items-center gap-3 group shrink cursor-pointer"
            aria-label="Truth Foundation Home Page"
          >
            <img
              src={truthLogo}
              alt="Truth Foundation Logo"
              width={128}
              height={128}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-[#da8a24] shrink-0 shadow-sm"
            />
            <div className="min-w-0 text-left whitespace-nowrap">
              <span className="text-sm xs:text-base sm:text-xl lg:text-2xl font-black text-[#0a2240] tracking-tight leading-none block group-hover:text-[#da8a24] transition-colors">
                TRUTH FOUNDATION
              </span>
              <p className="text-[8px] xs:text-[9.5px] sm:text-[10.5px] font-extrabold text-[#0a2240] uppercase tracking-wider block pt-0.5">
                REGISTERED NGO • CHENNAI
              </p>
            </div>
          </a>

          {/* Removed right side back to home link */}

        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto w-full flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Hero Section Banner */}
        <div className="max-w-4xl space-y-2 sm:space-y-3 mb-6 sm:mb-10">
          <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-[50px] font-black text-[#0a2240] tracking-tight leading-tight">
            Make Your Contribution
          </h1>

          <p className="text-slate-600 text-xs sm:text-sm lg:text-base max-w-2xl font-normal leading-relaxed">
            Your generosity empowers children, provides education, healthcare, nutrition, shelter, and community development across India.
          </p>
        </div>

        {/* 2-Column Grid Layout */}
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
          
          {/* Left Section (6 Columns Desktop): Amount Selection & Donor Info */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            
            {/* Amount Selection */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base sm:text-lg lg:text-xl font-black text-[#0a2240] tracking-tight">
                  Select Donation Amount (INR)
                </h2>
              </div>

              {/* 2-Row Amount Grid (Exact Reference Styling) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[100, 500, 1000, 2500, 5000, 10000].map((amt) => {
                  const isSelected = !isCustom && selectedAmount === amt;
                  return (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => {
                        setSelectedAmount(amt);
                        setIsCustom(false);
                      }}
                      className={`py-3.5 px-3 rounded-2xl font-black text-base border-2 transition-all cursor-pointer text-center ${
                        isSelected
                          ? 'bg-[#da8a24] border-[#da8a24] text-[#0a2240] shadow-md scale-102'
                          : 'bg-white border-slate-200/90 text-slate-800 hover:border-slate-300 hover:bg-slate-50 shadow-2xs'
                      }`}
                    >
                      ₹{amt.toLocaleString()}
                    </button>
                  );
                })}

                {/* Custom Amount Button Pill */}
                <div className={`relative col-span-2 sm:col-span-2 rounded-2xl border-2 transition-all flex items-center justify-center ${
                  isCustom ? 'border-[#da8a24] bg-amber-50 shadow-md' : 'border-slate-200/90 bg-white shadow-2xs'
                }`}>
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-black text-sm text-[#0a2240]">₹</span>
                  <input
                    type="number"
                    value={customValue}
                    onFocus={() => setIsCustom(true)}
                    onChange={(e) => {
                      setIsCustom(true);
                      setCustomValue(e.target.value);
                    }}
                    placeholder="Custom"
                    className="w-full py-3.5 pl-8 pr-3 text-center text-base font-black text-[#0a2240] bg-transparent focus:outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Emotional Painted Image Section (Brush Mask via Blend Modes) */}
            <div className="w-full flex justify-center mt-6 sm:mt-10">
              <div
                className="relative w-full max-w-lg aspect-[5/4] sm:aspect-video"
                style={{ mixBlendMode: 'multiply' }}
              >
                <Picture
                  picture={sadChildPainting}
                  sizes="(min-width: 640px) 512px, calc(100vw - 2rem)"
                  alt="Emotional painting of a child receiving care"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    backgroundImage: `url('${brushMask}')`,
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    mixBlendMode: 'lighten'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Right Section (6 Columns Desktop): Summary Card, Payment Methods & Submit Button */}
          <div className="lg:col-span-6 space-y-6 bg-white p-5 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md lg:sticky lg:top-24">
            
            {/* SELECTED CONTRIBUTION Box */}
            <div className="bg-slate-50 border border-slate-200/80 p-4.5 rounded-2xl flex items-center justify-between">
              <span className="text-[11px] uppercase font-black text-slate-500 tracking-wider">
                SELECTED CONTRIBUTION
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0a2240]">
                ₹{activeAmount.toLocaleString()}
              </div>
            </div>

            {/* Donor Information Form */}
            <div className="pt-4 border-t border-slate-200/80 space-y-4">
              <h2 className="text-lg sm:text-xl font-black text-[#0a2240] tracking-tight">
                Donor Information
              </h2>

              <div>
                <label className="font-bold text-slate-700 text-xs sm:text-sm block mb-1.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full h-12 sm:h-13 px-4 bg-white border border-slate-200/90 rounded-2xl font-medium focus:outline-none focus:border-[#da8a24] focus:ring-2 focus:ring-[#da8a24]/20 text-slate-900 text-sm transition shadow-2xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 text-xs sm:text-sm block mb-1.5">Email Address (for Receipt) *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="rahul@example.com"
                    className="w-full h-12 sm:h-13 px-4 bg-white border border-slate-200/90 rounded-2xl font-medium focus:outline-none focus:border-[#da8a24] focus:ring-2 focus:ring-[#da8a24]/20 text-slate-900 text-sm transition shadow-2xs"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 text-xs sm:text-sm block mb-1.5">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="9876543210"
                    className="w-full h-12 sm:h-13 px-4 bg-white border border-slate-200/90 rounded-2xl font-medium focus:outline-none focus:border-[#da8a24] focus:ring-2 focus:ring-[#da8a24]/20 text-slate-900 text-sm transition shadow-2xs"
                  />
                </div>
              </div>
            </div>


            {errorMessage && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-2xl text-xs text-red-700 font-bold text-center">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Primary Submit Button matching Reference Screenshot */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full h-14 bg-[#da8a24] hover:bg-[#c77a1e] text-[#0a2240] font-black text-lg rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 uppercase tracking-wider disabled:opacity-75 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-[#0a2240] border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 fill-[#0a2240] text-[#0a2240] shrink-0" />
                  <span>DONATE NOW</span>
                </>
              )}
            </button>

          </div>

        </form>
      </main>

      {/* Payment Success Overlay / Receipt View */}
      {paymentSuccess && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl text-center border border-slate-200">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Payment Successful
              </span>
              <h2 className="text-2xl font-black text-[#0a2240]">Thank You For Your Support!</h2>
              <p className="text-xs text-slate-600">
                Your generous contribution of <strong className="text-slate-900">₹{paymentSuccess.amount.toLocaleString()}</strong> has been received by Truth Foundation.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left space-y-2 text-xs">
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500 font-medium">Transaction ID</span>
                <span className="font-mono font-bold text-slate-900">{paymentSuccess.paymentId}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-slate-500 font-medium">Donor Name</span>
                <span className="font-bold text-slate-900">{formData.fullName || 'Valued Donor'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">Tax Exemption</span>
                <span className="font-bold text-emerald-700">Eligible for 80G Benefit</span>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-2xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setPaymentSuccess(null);
                  if (onNavigateHome) onNavigateHome();
                  else if (onClose) onClose();
                }}
                className="flex-1 py-3 bg-[#0a2240] hover:bg-[#12335c] text-white font-bold rounded-2xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Return to Home</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Simple minimal footer for Donate page */}
      <footer className="py-6 border-t border-amber-200/50 text-center text-xs text-slate-500 font-medium">
        © {new Date().getFullYear()} Truth Foundation • Registered NGO. Developed with ❤️ by{' '}
        <a
          href="https://zavyx.odoo.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#da8a24] font-bold hover:underline"
        >
          ZAVYX InfoTech
        </a>
      </footer>
    </div>
  );
};
