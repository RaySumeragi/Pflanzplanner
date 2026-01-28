
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sprout, 
  Trash2, 
  Info, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  RotateCcw,
  LayoutGrid,
  Sun,
  Droplets,
  ArrowUpCircle,
  Flower2,
  X
} from 'lucide-react';
import { PLANTS } from './constants';
import { Plant, GridCell, Feedback, GardenType } from './types';
import { getGardenSummary } from './services/geminiService';

const App: React.FC = () => {
  const [view, setView] = useState<'welcome' | 'planner' | 'summary'>('welcome');
  const [gardenType, setGardenType] = useState<GardenType>('bed');
  const [grid, setGrid] = useState<GridCell[]>([]);
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);
  const [summary, setSummary] = useState<string>('');
  const [loadingSummary, setLoadingSummary] = useState(false);

  // Initialize grid based on garden type
  useEffect(() => {
    const size = gardenType === 'balcony' ? 4 : 9;
    setGrid(Array.from({ length: size }, (_, i) => ({ id: i, plantId: null })));
  }, [gardenType]);

  const activePlantsInGrid = useMemo(() => {
    const ids = grid.map(c => c.plantId).filter(Boolean) as string[];
    return Array.from(new Set(ids)).map(id => PLANTS.find(p => p.id === id)!);
  }, [grid]);

  const handleCellClick = (cellId: number) => {
    if (!selectedPlant) {
      // Remove plant if clicking occupied cell without selection
      setGrid(prev => prev.map(c => c.id === cellId ? { ...c, plantId: null } : c));
      return;
    }

    setGrid(prev => prev.map(c => c.id === cellId ? { ...c, plantId: selectedPlant.id } : c));
  };

  const getCellFeedback = (cellId: number): Feedback | null => {
    const cell = grid.find(c => c.id === cellId);
    if (!cell || !cell.plantId || !selectedPlant || cell.plantId === selectedPlant.id) return null;

    const currentPlant = PLANTS.find(p => p.id === cell.plantId)!;
    
    // Logic: Is selectedPlant a friend/enemy of currentPlant?
    if (currentPlant.friends.includes(selectedPlant.id)) {
      return { type: 'success', message: 'Tolle Nachbarn!' };
    }
    if (currentPlant.enemies.includes(selectedPlant.id)) {
      return { type: 'error', message: 'Lieber nicht daneben.' };
    }
    if (currentPlant.size === 'Groß' && selectedPlant.size === 'Groß') {
      return { type: 'warning', message: 'Brauchen beide Platz.' };
    }
    
    return { type: 'info', message: 'Passt meistens gut.' };
  };

  const generateSummary = async () => {
    setLoadingSummary(true);
    setView('summary');
    const result = await getGardenSummary(activePlantsInGrid);
    setSummary(result);
    setLoadingSummary(false);
  };

  if (view === 'welcome') {
    return (
      <div className="min-h-screen bg-emerald-50 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Sprout className="w-16 h-16 text-emerald-600" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-emerald-900">Pflanz-Glück</h1>
            <p className="text-emerald-700 text-lg">Einfach Gärtnern lernen.</p>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <button 
              onClick={() => { setGardenType('bed'); setView('planner'); }}
              className="bg-white active:scale-95 transition-transform p-6 rounded-2xl shadow-md border-2 border-transparent hover:border-emerald-500 text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-emerald-900 text-xl">Garten-Beet</h3>
                <p className="text-emerald-600">Ein klassisches Raster.</p>
              </div>
              <LayoutGrid className="text-emerald-500 w-8 h-8" />
            </button>
            <button 
              onClick={() => { setGardenType('balcony'); setView('planner'); }}
              className="bg-white active:scale-95 transition-transform p-6 rounded-2xl shadow-md border-2 border-transparent hover:border-emerald-500 text-left flex items-center justify-between"
            >
              <div>
                <h3 className="font-bold text-emerald-900 text-xl">Balkonkasten</h3>
                <p className="text-emerald-600">Kompakt & nah.</p>
              </div>
              <Flower2 className="text-emerald-500 w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (view === 'summary') {
    return (
      <div className="min-h-screen bg-emerald-50 p-4 sm:p-6 flex flex-col items-center">
        <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl p-6 sm:p-8 space-y-6 sm:space-y-8">
          <div className="flex items-center gap-4">
            <div className="bg-emerald-100 p-3 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-900">Dein Pflanzplan</h1>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {activePlantsInGrid.map(p => (
              <div key={p.id} className="flex flex-col items-center bg-stone-50 p-4 rounded-xl border border-stone-100">
                <span className="text-3xl mb-1">{p.icon}</span>
                <span className="text-xs font-semibold text-stone-600 text-center">{p.name}</span>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 p-5 rounded-2xl border border-emerald-100">
            <h3 className="font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5" /> Garten-Coach
            </h3>
            {loadingSummary ? (
              <div className="flex items-center gap-2 text-emerald-600 italic py-2">
                <div className="animate-spin h-4 w-4 border-2 border-emerald-500 border-t-transparent rounded-full"></div>
                Denke nach...
              </div>
            ) : (
              <p className="text-emerald-800 text-sm sm:text-base leading-relaxed">{summary}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => setView('planner')}
              className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-700 py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" /> Weiterplanen
            </button>
            <button 
              onClick={() => {
                setGrid(prev => prev.map(c => ({ ...c, plantId: null })));
                setView('welcome');
              }}
              className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-bold shadow-lg transition-all"
            >
              Neues Beet starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[100dvh] bg-stone-50 flex flex-col overflow-hidden">
      {/* Top Navigation */}
      <header className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-2">
          <Sprout className="text-emerald-600 w-5 h-5" />
          <h2 className="font-bold text-stone-800 truncate">
            {gardenType === 'bed' ? 'Garten-Beet' : 'Balkon'}
          </h2>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setGrid(prev => prev.map(c => ({ ...c, plantId: null })))}
            className="p-2 text-stone-400 active:text-red-500 transition-colors"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
          <button 
            onClick={generateSummary}
            disabled={activePlantsInGrid.length === 0}
            className="bg-emerald-600 active:bg-emerald-700 disabled:opacity-50 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-all flex items-center gap-1"
          >
            Fertig <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Garden Grid Area */}
        <main className="flex-1 bg-garden flex flex-col items-center justify-center p-4 relative overflow-y-auto">
          <div className={`grid gap-2 sm:gap-4 w-full max-w-[400px] aspect-square ${gardenType === 'bed' ? 'grid-cols-3' : 'grid-cols-2'}`}>
            {grid.map(cell => {
              const plant = cell.plantId ? PLANTS.find(p => p.id === cell.plantId) : null;
              const feedback = getCellFeedback(cell.id);
              
              return (
                <div key={cell.id} className="relative aspect-square">
                  <button
                    onClick={() => handleCellClick(cell.id)}
                    className={`w-full h-full rounded-2xl sm:rounded-3xl border-2 sm:border-4 transition-all flex flex-col items-center justify-center p-2 sm:p-4 ${
                      plant 
                        ? 'bg-white border-stone-200 shadow-sm active:scale-95' 
                        : 'bg-stone-200/30 border-dashed border-stone-300 active:bg-emerald-50'
                    }`}
                  >
                    {plant ? (
                      <>
                        <span className="text-4xl sm:text-6xl animate-bounce-slow leading-none">{plant.icon}</span>
                        <span className="text-[10px] sm:text-xs font-bold text-stone-400 uppercase mt-1 truncate w-full text-center">{plant.name}</span>
                      </>
                    ) : (
                      <Sprout className="w-6 h-6 sm:w-8 h-8 text-stone-300" />
                    )}
                  </button>
                  
                  {feedback && selectedPlant && (
                    <div className={`absolute -top-2 -right-2 px-2 py-0.5 rounded-full text-white text-[9px] sm:text-[10px] font-bold shadow-lg z-10 flex items-center gap-1 animate-in fade-in zoom-in duration-300 ${
                      feedback.type === 'success' ? 'bg-green-500' :
                      feedback.type === 'error' ? 'bg-red-500' :
                      feedback.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}>
                      {feedback.type === 'success' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      <span className="">{feedback.message}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 text-center text-stone-400 text-xs sm:text-sm px-4">
            {selectedPlant 
              ? `Tippe auf ein Feld, um ${selectedPlant.name} zu pflanzen.` 
              : activePlantsInGrid.length > 0 
                ? "Tippe auf eine Pflanze im Beet, um sie zu entfernen."
                : "Wähle unten eine Pflanze aus."}
          </div>
        </main>

        {/* Plant Catalog - Desktop Sidebar / Mobile Bottom Slider */}
        <aside className="lg:w-80 bg-white border-t lg:border-t-0 lg:border-l border-stone-200 flex flex-col shrink-0 z-30 max-h-[40%] lg:max-h-full">
          {/* Active selection bar / Drawer handle */}
          <div className="p-3 bg-stone-50 border-b border-stone-100 flex items-center justify-between lg:hidden">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-widest">Pflanzen-Katalog</span>
            {selectedPlant && (
              <button 
                onClick={() => setSelectedPlant(null)}
                className="text-emerald-600 text-xs font-bold flex items-center gap-1"
              >
                Abbrechen <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Catalog List */}
          <div className="flex-1 overflow-x-auto lg:overflow-y-auto p-3 lg:p-4">
            <div className="flex lg:flex-col gap-3 lg:gap-3 min-w-max lg:min-w-0">
              {PLANTS.map(plant => (
                <button
                  key={plant.id}
                  onClick={() => setSelectedPlant(plant)}
                  className={`w-32 lg:w-full text-left p-3 lg:p-4 rounded-xl lg:rounded-2xl transition-all border-2 flex flex-col lg:flex-row items-center lg:items-center gap-2 lg:gap-4 shrink-0 ${
                    selectedPlant?.id === plant.id 
                      ? 'bg-emerald-50 border-emerald-500 shadow-sm' 
                      : 'bg-stone-50 border-transparent active:border-stone-200'
                  }`}
                >
                  <span className="text-3xl lg:text-4xl">{plant.icon}</span>
                  <div className="flex-1 overflow-hidden text-center lg:text-left">
                    <div className="font-bold text-stone-800 text-xs lg:text-base truncate">{plant.name}</div>
                    <div className="flex justify-center lg:justify-start gap-1.5 mt-1">
                      {plant.sun === 'Sonne' && <Sun className="w-3 h-3 text-orange-400" />}
                      {plant.water === 'Viel' && <Droplets className="w-3 h-3 text-blue-400" />}
                      {plant.size === 'Groß' && <ArrowUpCircle className="w-3 h-3 text-emerald-400" />}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Desktop Only Detail Tip */}
          {selectedPlant && (
            <div className="hidden lg:block p-4 bg-emerald-900 text-white">
              <p className="text-xs text-emerald-100 italic leading-relaxed">"{selectedPlant.tip}"</p>
            </div>
          )}
        </aside>
      </div>

      <style>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-3%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: none; animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
        /* Mobile height fix */
        .h-[100dvh] {
          height: 100dvh;
        }
      `}</style>
    </div>
  );
};

export default App;
