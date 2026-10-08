import { onCLS, onLCP, onFCP, onTTFB, onINP } from 'web-vitals';

interface WebVitalMetric {
  name: 'CLS' | 'LCP' | 'FCP' | 'TTFB' | 'INP';
  value: number;
  delta: number;
  id: string;
}

const reportWebVitals = (onPerfEntry?: (metric: WebVitalMetric) => void) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    onCLS(onPerfEntry);
    onFCP(onPerfEntry);
    onLCP(onPerfEntry);
    onTTFB(onPerfEntry);
    onINP(onPerfEntry);
  } else {
    // Default logger to console with professional and scannable visual styling
    const logMetric = (metric: WebVitalMetric) => {
      const { name, value, id } = metric;
      const formattedValue = name === 'CLS' ? value.toFixed(4) : `${Math.round(value)}ms`;
      
      // Determine rating based on standard Google Core Web Vitals thresholds
      let status = 'GOOD';
      let color = '#10B981'; // Emerald/Green

      if (name === 'LCP') {
        if (value > 4000) { status = 'POOR'; color = '#EF4444'; }
        else if (value > 2500) { status = 'NEEDS IMPROVEMENT'; color = '#F59E0B'; }
      } else if (name === 'CLS') {
        if (value > 0.25) { status = 'POOR'; color = '#EF4444'; }
        else if (value > 0.1) { status = 'NEEDS IMPROVEMENT'; color = '#F59E0B'; }
      } else if (name === 'FCP') {
        if (value > 3000) { status = 'POOR'; color = '#EF4444'; }
        else if (value > 1800) { status = 'NEEDS IMPROVEMENT'; color = '#F59E0B'; }
      } else if (name === 'TTFB') {
        if (value > 1800) { status = 'POOR'; color = '#EF4444'; }
        else if (value > 800) { status = 'NEEDS IMPROVEMENT'; color = '#F59E0B'; }
      } else if (name === 'INP') {
        if (value > 500) { status = 'POOR'; color = '#EF4444'; }
        else if (value > 200) { status = 'NEEDS IMPROVEMENT'; color = '#F59E0B'; }
      }

      console.log(
        `%c⚡ [Web Vital] ${name}: ${formattedValue} (%c${status}%c) - ID: ${id}`,
        'color: #3B82F6; font-weight: bold;',
        `color: ${color}; font-weight: bold;`,
        'color: inherit;'
      );
    };

    onCLS(logMetric);
    onFCP(logMetric);
    onLCP(logMetric);
    onTTFB(logMetric);
    onINP(logMetric);
  }
};

export default reportWebVitals;
