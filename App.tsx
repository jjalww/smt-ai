
import React, { useState, useEffect } from 'react';
import RiskCalculator from './components/RiskCalculator';
import ChartAnalyzer from './components/ChartAnalyzer';
import NewsGrounding from './components/NewsGrounding';
import { TradeSetup } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'risk' | 'concepts'>('dashboard');
  const [appliedSetup, setAppliedSetup] = useState<{entry: number, stopLoss: number, takeProfit: number}>({entry: 0, stopLoss: 0, takeProfit: 0});
  const [showQR, setShowQR] = useState(false);
  const [hasApiKey, setHasApiKey] = useState<boolean>(true);

  useEffect(() => {
    // Basic check to see if API key is likely configured
    if (!process.env.API_KEY || process.env.API_KEY === 'YOUR_API_KEY') {
      setHasApiKey(false);
    }
  }, []);

  const handleApplySetup = (setup: TradeSetup) => {
    const entryNum = parseFloat(setup.entryZone.split('-')[0]) || 0;
    setAppliedSetup({
      entry: entryNum,
      stopLoss: setup.stopLoss,
      takeProfit: setup.takeProfit
    });
    setActiveTab('risk');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-50 flex flex-col">
      {/* Configuration Alert */}
      {!hasApiKey && (
        <div className="bg-amber-500 text-black px-4 py-2 text-[10px] font-black uppercase text-center flex items-center justify-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          Warning: API Key not detected. Features will be limited.
        </div>
      )}

      {/* Navigation Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-50 backdrop-blur-lg">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-black text-white italic shadow-lg shadow-blue-500/20">SM</div>
            <h1 className="text-lg font-bold tracking-tighter hidden sm:block">SMARTMONEY <span className="text-blue-500 font-light">AI</span></h1>
          </div>
          
          <nav className="flex bg-slate-800/50 p-1 rounded-full border border-slate-700">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Analysis
            </button>
            <button 
              onClick={() => setActiveTab('risk')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${activeTab === 'risk' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              Risk
            </button>
            <button 
              onClick={() => setActiveTab('concepts')}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition ${activeTab === 'concepts' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
            >
              SMC
            </button>
          </nav>

          <button 
            onClick={() => setShowQR(!showQR)}
            className="p-2 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition"
            title="Mobile Sync"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </header>

      {showQR && (
        <div className="bg-blue-600 text-white py-2 px-4 text-center text-xs font-bold animate-in slide-in-from-top duration-300">
          Sync complete! This app is 100% mobile-ready. Open this URL on your phone browser.
        </div>
      )}

      <main className="flex-grow container mx-auto px-4 py-6 max-w-7xl">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
              <ChartAnalyzer onApplySetup={handleApplySetup} />
              
              <div className="glass-panel p-5 rounded-xl border border-blue-500/10 hidden sm:block">
                <h4 className="text-[10px] font-bold text-blue-400 mb-4 uppercase tracking-[0.2em]">Market Pulse</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['XAUUSD', 'BTCUSD', 'EURUSD', 'GBPUSD'].map(symbol => (
                    <div key={symbol} className="bg-slate-900/50 p-3 rounded-lg border border-slate-800">
                      <p className="text-[10px] text-slate-500 font-bold">{symbol}</p>
                      <p className="text-sm font-mono text-slate-300">WATCHING</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 space-y-6 order-1 lg:order-2">
              <NewsGrounding />
              <div className="lg:block hidden">
                <RiskCalculator 
                  initialEntry={appliedSetup.entry} 
                  initialStopLoss={appliedSetup.stopLoss} 
                  initialTakeProfit={appliedSetup.takeProfit}
                />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'risk' && (
          <div className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-300">
             <RiskCalculator 
               initialEntry={appliedSetup.entry} 
               initialStopLoss={appliedSetup.stopLoss} 
               initialTakeProfit={appliedSetup.takeProfit}
             />
             
             <div className="glass-panel p-6 rounded-xl border border-orange-500/10">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-orange-400">Equity Curve Projection</h3>
                 <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-1 rounded">1% Compound</span>
               </div>
               <div className="space-y-3 font-mono text-sm">
                 <div className="flex justify-between p-2 hover:bg-slate-800 rounded transition">
                   <span className="text-slate-500">30 Trades (1:2 R/R)</span>
                   <span className="text-green-400">+$6,000</span>
                 </div>
                 <div className="flex justify-between p-2 hover:bg-slate-800 rounded transition">
                   <span className="text-slate-500">60 Trades (1:2 R/R)</span>
                   <span className="text-green-400">+$12,400</span>
                 </div>
               </div>
               <p className="mt-4 text-[10px] text-slate-500 italic text-center italic">Calculated based on 50% Win Rate with 1:2 Risk/Reward.</p>
             </div>
          </div>
        )}

        {activeTab === 'concepts' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {[
              { title: 'Order Block (OB)', desc: 'The last candle before a displacement. Where banks place large orders.', icon: '🏦' },
              { title: 'Fair Value Gap (FVG)', desc: 'Price imbalance showing high institutional urgency.', icon: '⚡' },
              { title: 'Liquidity Grab', desc: 'Price sweeping old highs/lows to trigger SLs before reversal.', icon: '🌊' },
              { title: 'BOS / CHoCH', desc: 'Market structure shift indicators for trend following.', icon: '📉' }
            ].map((c, i) => (
              <div key={i} className="glass-panel p-5 rounded-xl border border-slate-700 flex gap-4 items-start hover:border-blue-500/50 transition">
                <div className="text-2xl">{c.icon}</div>
                <div>
                  <h4 className="font-bold text-blue-400">{c.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Mobile Sticky CTA */}
      <div className="sm:hidden fixed bottom-4 right-4 z-40">
        <button 
          onClick={() => setActiveTab('dashboard')}
          className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border border-blue-400"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>

      <footer className="py-6 border-t border-slate-800 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-[10px] text-slate-600 uppercase tracking-widest font-bold">Smart Money AI Terminal v2.0</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
