import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  Rectangle
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Filter, ArrowRight } from 'lucide-react';

// --- Data Preparation ---
// ข้อมูลจำลอง (Actual: Oct-Dec 25) + ข้อมูลคำนวณจริง (Forecast: Jan-Feb 26)
const data = [
  { name: 'Oct 25', type: 'Actual', Ananya: 320000, Pimchanok: 450000, Nattapon: 280000 },
  { name: 'Nov 25', type: 'Actual', Ananya: 410000, Pimchanok: 390000, Nattapon: 350000 },
  { name: 'Dec 25', type: 'Actual', Ananya: 290000, Pimchanok: 520000, Nattapon: 480000 },
  // Jan 26 Forecast: คำนวณจาก Pipeline (Ananya=348k, Pimchanok=772k, Nattapon=396k)
  { name: 'Jan 26', type: 'Forecast', Ananya: 348000, Pimchanok: 772000, Nattapon: 396000 },
  // Feb 26 Forecast: คำนวณจาก Pipeline (Ananya=48k, Pimchanok=36k, Nattapon=156k)
  { name: 'Feb 26', type: 'Forecast', Ananya: 48000, Pimchanok: 36000, Nattapon: 156000 },
];

const staffConfig = {
  Ananya: { color: '#8b5cf6', gradientId: 'colorAnanya', label: 'Ananya' },    // Violet
  Pimchanok: { color: '#10b981', gradientId: 'colorPim', label: 'Pimchanok' }, // Emerald
  Nattapon: { color: '#f59e0b', gradientId: 'colorNat', label: 'Nattapon' }    // Amber
};

const formatCurrency = (val) => `${(val / 1000).toFixed(0)}k`;

// --- Custom Components ---

const StaffToggle = ({ staffKey, config, isSelected, onToggle }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={() => onToggle(staffKey)}
    className={`
      relative overflow-hidden flex items-center gap-3 px-5 py-3 rounded-xl border transition-all duration-300
      ${isSelected 
        ? 'bg-white border-transparent shadow-lg shadow-gray-200 ring-2 ring-offset-2' 
        : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-100'
      }
    `}
    style={{ ringColor: isSelected ? config.color : 'transparent' }}
  >
    <div 
      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-md`}
      style={{ backgroundColor: isSelected ? config.color : '#9ca3af' }}
    >
      {staffKey.charAt(0)}
    </div>
    <div className="text-left">
      <p className={`text-sm font-bold ${isSelected ? 'text-gray-800' : 'text-gray-500'}`}>
        {config.label}
      </p>
      <p className="text-xs text-gray-400">Sales Rep</p>
    </div>
    {isSelected && (
      <motion.div 
        layoutId="active-indicator"
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" 
      />
    )}
  </motion.button>
);

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const isForecast = label.includes('26');
    return (
      <div className="bg-gray-900/95 backdrop-blur-xl border border-gray-700 p-4 rounded-2xl shadow-2xl text-white min-w-[200px]">
        <div className="flex justify-between items-center mb-3 border-b border-gray-700 pb-2">
            <span className="font-bold text-lg">{label}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${isForecast ? 'bg-cyan-500/20 text-cyan-300' : 'bg-indigo-500/20 text-indigo-300'}`}>
                {isForecast ? 'Forecast' : 'Actual'}
            </span>
        </div>
        <div className="space-y-2">
          {payload.map((entry, index) => (
            <div key={index} className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm text-gray-300">{entry.name}</span>
              </div>
              <span className="text-sm font-mono font-bold">฿{entry.value.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

// --- Main Component ---

const LuxurySalesPerformance = () => {
  const [selectedStaff, setSelectedStaff] = useState({
    Ananya: true,
    Pimchanok: true,
    Nattapon: true,
  });

  const toggleStaff = (key) => {
    setSelectedStaff(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Custom Shape for Bars (Rounded Top)
  const CustomBar = (props) => {
      const { fill, x, y, width, height } = props;
      return <Rectangle {...props} radius={[6, 6, 0, 0]} />;
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6 md:p-12 font-sans text-gray-900">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-3xl font-extrabold text-gray-900">Sales Team Performance</h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <Users size={16} /> Comparative analysis across 5-month window
            </p>
          </motion.div>
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 shadow-sm mt-4 md:mt-0">
             <Filter size={14} />
             <span>Select staff to compare</span>
          </div>
        </div>

        {/* Staff Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.keys(staffConfig).map((key, index) => (
            <StaffToggle 
              key={key} 
              staffKey={key} 
              config={staffConfig[key]} 
              isSelected={selectedStaff[key]} 
              onToggle={toggleStaff} 
            />
          ))}
        </div>

        {/* Chart Container */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl shadow-gray-100 border border-gray-100 p-8 relative overflow-hidden"
        >
          {/* Chart Header Info */}
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-xl font-bold text-gray-800">Revenue Breakdown (THB)</h2>
             <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <span className="w-8 h-1 bg-gray-300 rounded-full"></span>
                    <span className="text-gray-500">Actual (Past)</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-8 h-1 bg-cyan-100 border border-cyan-200 border-dashed rounded-full"></span>
                    <span className="text-cyan-600 font-medium">Forecast (Future)</span>
                </div>
             </div>
          </div>

          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={data} 
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                barGap={8} // Space between bars in a group
              >
                <defs>
                   {/* Gradients for each staff */}
                   <linearGradient id="colorAnanya" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0.7}/>
                   </linearGradient>
                   <linearGradient id="colorPim" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#10b981" stopOpacity={0.7}/>
                   </linearGradient>
                   <linearGradient id="colorNat" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity={1}/>
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity={0.7}/>
                   </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    tickFormatter={formatCurrency} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }}/>

                {/* Highlight Forecast Area */}
                <ReferenceArea x1="Jan 26" x2="Feb 26" fill="#ecfeff" fillOpacity={0.5} radius={[10, 10, 0, 0]} />

                {/* Render Bars based on Selection */}
                <AnimatePresence>
                    {selectedStaff.Ananya && (
                        <Bar 
                            dataKey="Ananya" 
                            fill="url(#colorAnanya)" 
                            shape={<CustomBar />} 
                            animationDuration={800}
                            name="Ananya"
                        />
                    )}
                    {selectedStaff.Pimchanok && (
                        <Bar 
                            dataKey="Pimchanok" 
                            fill="url(#colorPim)" 
                            shape={<CustomBar />} 
                            animationDuration={800} 
                            animationBegin={200}
                            name="Pimchanok"
                        />
                    )}
                    {selectedStaff.Nattapon && (
                        <Bar 
                            dataKey="Nattapon" 
                            fill="url(#colorNat)" 
                            shape={<CustomBar />} 
                            animationDuration={800} 
                            animationBegin={400}
                            name="Nattapon"
                        />
                    )}
                </AnimatePresence>

              </BarChart>
            </ResponsiveContainer>
          </div>

           {/* Forecast Indicator Line (Optional) */}
           <div className="absolute top-[80px] left-[62%] md:left-[64%] h-[75%] border-l-2 border-dashed border-cyan-300 z-0 pointer-events-none flex flex-col justify-end pb-2">
               <div className="bg-cyan-50 text-cyan-600 text-[10px] font-bold px-2 py-1 rounded ml-1 w-max shadow-sm transform translate-y-4">
                   Future Forecast <ArrowRight size={10} className="inline"/>
               </div>
           </div>

        </motion.div>
      </div>
    </div>
  );
};

export default LuxurySalesPerformance;