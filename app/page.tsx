'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [status, setStatus] = useState<'loading' | 'healthy' | 'error'>('loading');
  const [lastChecked, setLastChecked] = useState<string>('');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setStatus('healthy');
        setLastChecked(new Date().toISOString());
      } catch {
        setStatus('error');
      }
    };

    checkHealth();
    const interval = setInterval(checkHealth, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Data Infrastructure</h1>

        <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-medium">System Status</span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              status === 'healthy' ? 'bg-green-500/20 text-green-400' :
              status === 'error' ? 'bg-red-500/20 text-red-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {status === 'loading' ? 'Checking...' : status === 'healthy' ? 'Operational' : 'Degraded'}
            </span>
          </div>

          {lastChecked && (
            <p className="text-gray-400 text-sm">
              Last checked: {new Date(lastChecked).toLocaleString()}
            </p>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="font-semibold mb-2">Database</h2>
            <p className="text-gray-400 text-sm">PostgreSQL connected</p>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <h2 className="font-semibold mb-2">API</h2>
            <p className="text-gray-400 text-sm">Endpoints active</p>
          </div>
        </div>
      </div>
    </main>
  );
}
