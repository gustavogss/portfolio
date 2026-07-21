import { create } from 'zustand';

export interface TelemetryLog {
  id: string;
  type: 'READ' | 'WRITE';
  entity: string;
  duration: number;
  cacheStatus: 'HIT' | 'NETWORK';
  timestamp: string;
}

interface TelemetryState {
  networkReads: number;
  networkWrites: number;
  cacheHits: number;
  totalTimeSaved: number;
  recentLogs: TelemetryLog[];
  recordRead: (entity: string, duration: number, cacheStatus: 'HIT' | 'NETWORK') => void;
  recordWrite: (entity: string, duration: number) => void;
  clearTelemetry: () => void;
}

export const useTelemetryStore = create<TelemetryState>((set) => ({
  networkReads: 0,
  networkWrites: 0,
  cacheHits: 0,
  totalTimeSaved: 0,
  recentLogs: [],

  recordRead: (entity, duration, cacheStatus) => {
    set((state) => {
      const isHit = cacheStatus === 'HIT';
      const savedTime = isHit ? duration : 0;
      
      const newLog: TelemetryLog = {
        id: Math.random().toString(36).substring(7),
        type: 'READ',
        entity,
        duration: isHit ? 0 : Math.round(duration),
        cacheStatus,
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      };

      // Prevent log duplication of hits on every component render
      const lastLog = state.recentLogs[0];
      if (lastLog && lastLog.type === 'READ' && lastLog.entity === entity && lastLog.cacheStatus === 'HIT' && isHit) {
        // If it's a duplicate hit log within 1 second, just return existing state
        return {};
      }

      return {
        networkReads: state.networkReads + (isHit ? 0 : 1),
        cacheHits: state.cacheHits + (isHit ? 1 : 0),
        totalTimeSaved: state.totalTimeSaved + savedTime,
        recentLogs: [newLog, ...state.recentLogs].slice(0, 30),
      };
    });
  },

  recordWrite: (entity, duration) => {
    set((state) => {
      const newLog: TelemetryLog = {
        id: Math.random().toString(36).substring(7),
        type: 'WRITE',
        entity,
        duration: Math.round(duration),
        cacheStatus: 'NETWORK',
        timestamp: new Date().toLocaleTimeString('pt-BR'),
      };

      return {
        networkWrites: state.networkWrites + 1,
        recentLogs: [newLog, ...state.recentLogs].slice(0, 30),
      };
    });
  },

  clearTelemetry: () => set({
    networkReads: 0,
    networkWrites: 0,
    cacheHits: 0,
    totalTimeSaved: 0,
    recentLogs: [],
  }),
}));
