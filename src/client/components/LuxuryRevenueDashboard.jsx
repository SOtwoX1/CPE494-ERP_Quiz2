import React, { useState } from 'react';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
  Area
} from 'recharts';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, Calendar, Activity } from 'lucide-react';

// --- Data Preparation ---
// ข้อมูลจริง (Actual) จำลองย้อนหลัง 9 เดือน
// ข้อมูลพยากรณ์ (Forecast) คำนวณจากเอกสาร PDF (Jan=1.5M, Feb=240k, Mar=50k)
const data = [
  { name: 'Apr 25', value: 1250000, type: 'Actual' },
  { name: 'May 25', value: 1380000, type: 'Actual' },
  { name: 'Jun 25', value: 1100000, type: 'Actual' },
  { name: 'Jul 25', value: 1420000, type: 'Actual' },
  { name: 'Aug 25', value: 1650000, type: 'Actual' },
  { name: 'Sep 25', value: 1500000, type: 'Actual' },
  { name: 'Oct 25', value: 1580000, type: 'Actual' },
  { name: 'Nov 25', value: 1720000, type: 'Actual' },
  { name: 'Dec 25', value: 1850000, type: 'Actual' },
  { name: 'Jan 26', value: 1516000, type: 'Forecast' }, // 21-Jan-2026 Context
  { name: 'Feb 26', value: 240000, type: 'Forecast' },
  { name: 'Mar 26', value: 50000, type: 'Forecast' },
];

const formatCurrency = (val) => {
  if (val >= 1000000) return `฿${(val / 1000000).toFixed(1)}M`;
  if (val >= 1000) return `฿${(val / 1000).toFixed(0)}k`;
  return val;
};

// --- Sub-Components ---

const StatCard = ({ title, value, subtext, icon: Icon, trend }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    className="bg-white/80 backdrop-blur-md p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden"
  >
    <div className="flex justify-between items-start z-10 relative">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-3xl font-bold text-gray-800 tracking-tight">{value}</h3>
        {subtext && (
            <p className={`text-sm mt-2 font-medium flex items-center gap-1 ${trend === 'down' ? 'text-red-500' : 'text-emerald-600'}`}>
                {trend === 'down' ? <TrendingDown size={16} /> : <TrendingUp size={16} />}
                {subtext}
            </p>
        )}
      </div>
      <div className="p-3 bg-gradient-to-br from-indigo-50 to-blue-100 rounded-xl text-indigo-600">
        <Icon size={24} />
      </div>
    </div>
    {/* Decorative background blob */}
    <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-indigo-50 rounded-full blur-2xl opacity-60 pointer-events-none" />
  </motion.div>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isForecast = payload[0].payload.type === 'Forecast';
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gray-900/90 backdrop-blur-md p-4 border border-gray-700 shadow-2xl rounded-xl text-white"
      >
        <p className="font-semibold text-gray-300 text-sm mb-2">{label}</p>
        <div className="flex items-center gap-3">
          <div className={`w-1 h-8 rounded-full ${isForecast ? 'bg-cyan-400' : 'bg-indigo-500'}`}></div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{payload[0].payload.type}</p>
            <p className="text-xl font-bold font-mono">
              ฿{payload[0].value.toLocaleString()}
            </p>
          </div>
        </div>
        {isForecast && (
            <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-cyan-300 flex items-center gap-1">
                <Activity size={12} /> Projected based on pipeline
            </div>
        )}
      </motion.div>
    );
  }
  return null;
};

// --- Main Component ---

const LuxuryRevenueDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-indigo-800 to-gray-900">
              Revenue Command Center
            </h1>
            <p className="text-gray-500 mt-2 text-lg">
              Financial performance overview & predictive analytics
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm text-sm text-gray-600"
          >
            <Calendar size={16} className="text-indigo-500"/>
            <span>Current Date: </span>
            <span className="font-semibold text-gray-900">21 Jan 2026</span>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard 
                title="YTD Revenue (Actual)" 
                value="฿13.45M" 
                subtext="+12.5% vs last year" 
                icon={DollarSign}
                trend="up"
            />
            <StatCard 
                title="Jan 2026 Forecast" 
                value="฿1.52M" 
                subtext="92% Goal Achievement" 
                icon={TrendingUp}
                trend="up"
            />
             <StatCard 
                title="Q1 Pipeline Risk" 
                value="High" 
                subtext="Feb & Mar below threshold" 
                icon={Activity}
                trend="down"
            />
        </div>

        {/* Main Chart Card */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-indigo-100/50 border border-gray-100 p-8 overflow-hidden relative"
        >
          {/* Chart Header */}
          <div className="flex justify-between items-center mb-10">
            <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    Monthly Revenue Forecast
                </h2>
                <div className="flex items-center gap-6 mt-3 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-50"></span>
                        <span className="text-gray-600 font-medium">Actual Revenue</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-cyan-400 ring-4 ring-cyan-50"></span>
                        <span className="text-gray-600 font-medium">Forecasted (Projected)</span>
                    </div>
                </div>
            </div>
            {/* Context Note */}
             <div className="hidden md:block text-right">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">Next 3 Months</p>
                <p className="text-2xl font-bold text-indigo-900">฿1.8M <span className="text-base font-normal text-gray-400">Total</span></p>
            </div>
          </div>

          {/* Chart Area */}
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart 
                data={data} 
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
                onMouseMove={(state) => setActiveIndex(state.activeTooltipIndex)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                {/* Gradients */}
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#4F46E5" stopOpacity={0.9}/>
                    <stop offset="100%" stopColor="#4F46E5" stopOpacity={0.6}/>
                  </linearGradient>
                  <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity={0.8}/>
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity={0.4}/>
                  </linearGradient>
                  <filter id="shadow" height="200%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.15"/>
                  </filter>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} 
                    dy={15}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 500 }} 
                    tickFormatter={formatCurrency} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                
                {/* Reference Line for TODAY */}
                <ReferenceLine 
                    x="Jan 26" 
                    stroke="#94A3B8" 
                    strokeDasharray="4 4" 
                    label={{ 
                        position: 'top', 
                        value: 'TODAY', 
                        fill: '#64748B', 
                        fontSize: 10, 
                        fontWeight: 'bold',
                        className: "bg-white px-2"
                    }} 
                />

                {/* Bars */}
                <Bar 
                    dataKey="value" 
                    barSize={45} 
                    radius={[8, 8, 0, 0]}
                    animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell 
                        key={`cell-${index}`} 
                        fill={entry.type === 'Actual' ? 'url(#colorActual)' : 'url(#colorForecast)'}
                        // Add subtle transparency to non-active bars when hovering
                        opacity={activeIndex === null || activeIndex === index ? 1 : 0.6}
                        stroke={activeIndex === index ? '#fff' : 'none'}
                        strokeWidth={2}
                        filter="url(#shadow)"
                        style={{ transition: 'all 0.3s ease' }}
                    />
                  ))}
                </Bar>
                
                {/* Trend Line (Optional aesthetic addition) */}
                <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="none" 
                    fill="url(#colorActual)" 
                    fillOpacity={0.05} 
                />
                
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          {/* Footer Warning */}
          <div className="mt-4 p-4 bg-red-50/50 border border-red-100 rounded-xl flex items-start gap-3">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                <Activity size={18} />
            </div>
            <div>
                <h4 className="text-sm font-bold text-red-800">Low Revenue Alert</h4>
                <p className="text-xs text-red-600 mt-1 leading-relaxed">
                    Forecast for <strong>Feb & Mar 2026</strong> drops significantly below the ฿1M threshold. 
                    Immediate action required to convert SQL/MQLs in the pipeline.
                </p>
            </div>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default LuxuryRevenueDashboard;