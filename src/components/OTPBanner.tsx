// // components/OTPBanner.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, X, ShieldCheck } from "lucide-react"; // إضافة ShieldCheck كأيقونة احترافية
import { Button } from "@/components/ui/button";
import { useLatestOTP } from "@/hooks/useAuth";

export function OTPBanner() {
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const lastSeenOTPRef = useRef<string | null>(null);

  const { data: otpData } = useLatestOTP();
  useEffect(() => {
    if (otpData?.otp) {
      if (otpData.otp !== lastSeenOTPRef.current) {
        lastSeenOTPRef.current = otpData.otp;
        setIsVisible(true);
      }
    }
  }, [otpData]);

  const handleCopy = () => {
    if (otpData?.otp) {
      navigator.clipboard.writeText(otpData.otp);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!otpData || !isVisible) return null;

  return (
    <div className="z-50 w-full max-w-[320px] animate-in slide-in-from-right-5">
      <div className="relative border-2 border-blue-500 bg-white p-5 shadow-2xl dark:bg-slate-900 overflow-hidden">
        <ShieldCheck className="absolute -bottom-2 -right-2 h-16 w-16 text-blue-500/10 pointer-events-none" />

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Mock OTP Code
              </p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="h-6 w-6 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
              onClick={handleClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center justify-center bg-blue-50/50 dark:bg-blue-900/20 rounded-lg py-3 gap-3">
            <span className="text-4xl font-mono font-black text-slate-800 dark:text-white tracking-widest">
              {otpData.otp}
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={handleCopy}
              className="h-8 px-2 text-xs font-bold"
            >
              {copied ? "DONE" : <Copy className="h-4 w-4" />}
            </Button>
          </div>

          <div className="text-[10px] text-slate-500 font-medium border-t border-slate-100 dark:border-slate-800 pt-2">
            <p className="truncate">📱 User: {otpData.phone}</p>
            <p className="mt-1 text-blue-500/80">
              💡 Paste this code to verify account
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
