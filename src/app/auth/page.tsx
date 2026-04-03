'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, ShieldCheck, XCircle } from 'lucide-react';
import { verifyPincode } from './actions';
import { useRouter } from 'next/navigation';

export default function AuthPage() {
  const [pincode, setPincode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDigitClick = useCallback((digit: string) => {
    setPincode(prev => {
      if (prev.length < 4) {
        setError(null);
        return prev + digit;
      }
      return prev;
    });
  }, []);

  const handleBackspace = useCallback(() => {
    setPincode(prev => prev.slice(0, -1));
  }, []);

  const handleSubmitLogic = useCallback(async (code: string) => {
    if (code.length < 4) return;

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('pincode', code);

    try {
      const result = await verifyPincode(formData);
      if (result.success) {
        router.push('/');
        router.refresh();
      } else {
        setError(result.message || 'Invalid Pincode');
        setPincode('');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [router]);

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (loading) return;

      if (e.key >= '0' && e.key <= '9') {
        handleDigitClick(e.key);
      } else if (e.key === 'Backspace') {
        handleBackspace();
      } else if (e.key === 'Enter') {
        if (pincode.length >= 4) {
          handleSubmitLogic(pincode);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pincode, loading, handleDigitClick, handleBackspace, handleSubmitLogic]);

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmitLogic(pincode);
  };

  return (
    <main className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="p-8 md:p-12 rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl overflow-hidden relative">
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6 border border-accent/30"
            >
              <Lock className="w-8 h-8 text-accent" />
            </motion.div>
            <h1 className="text-2xl md:text-3xl font-bold text-center tracking-tight text-white mb-2">
              Protected Access
            </h1>
            <p className="text-white/50 text-sm text-center">
              Please enter your security pincode to continue
            </p>
          </div>

          {/* Pincode Display */}
          <div className="flex justify-center gap-3 mb-10">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={pincode.length > i ? { scale: [1, 1.2, 1], borderColor: 'var(--accent)' } : {}}
                className={`w-4 h-4 rounded-full border-2 transition-colors duration-300 ${
                  pincode.length > i ? 'bg-accent border-accent' : 'bg-transparent border-white/20'
                }`}
              />
            ))}
          </div>

          {/* Error Message */}
          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex items-center gap-2 text-red-400 text-sm justify-center mb-6"
              >
                <XCircle className="w-4 h-4" />
                <span>{error}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keypad */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'].map((val, idx) => {
              if (val === '') return <div key={`empty-${idx}`} />;
              if (val === 'del') {
                return (
                  <button
                    key="del"
                    type="button"
                    onClick={handleBackspace}
                    className="h-16 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 transition-all text-white/70"
                  >
                    <ArrowRight className="w-6 h-6 rotate-180" />
                  </button>
                );
              }
              return (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleDigitClick(val.toString())}
                  className="h-16 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-white/10 active:bg-white/20 transition-all text-xl font-medium text-white"
                >
                  {val}
                </button>
              );
            })}
          </div>

          {/* Submit */}
          <form onSubmit={onFormSubmit}>
            <button
              type="submit"
              disabled={pincode.length < 4 || loading}
              className="w-full h-14 rounded-2xl bg-accent text-[#0a0a0a] font-bold text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 disabled:opacity-50 disabled:grayscale transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {loading ? (
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
                />
              ) : (
                <>
                  Confirm Code
                  <ShieldCheck className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
        
        {/* Footer info */}
        <p className="mt-8 text-center text-white/20 text-[10px] tracking-widest uppercase">
          &copy; 2026 Sumit Patel Portfolio &bull; Security Enabled
        </p>
      </motion.div>
    </main>
  );
}
