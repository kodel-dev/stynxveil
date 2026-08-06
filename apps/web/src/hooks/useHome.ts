// apps/web/src/hooks/useHome.ts
import { useState, useEffect } from 'react';

export function useHome() {
  const [home, setHome] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        // Mengambil data langsung dari backend lokal Anda, atau Anda bisa arahkan langsung ke mirror aktif jika diperlukan
        const res = await fetch('http://localhost:5000/comic/shinigami/home');
        
        if (!res.ok) throw new Error('Gagal mengambil data dari server');
        
        const json = await res.json();
        
        // Otomatis memastikan seluruh data dari Shinigami berlabel Mirror
        if (json && json.data) {
          const markMirror = (list: any[]) => Array.isArray(list) ? list.map(item => ({ ...item, type: 'Mirror' })) : [];
          
          json.data.latest = markMirror(json.data.latest);
          json.data.recommended = markMirror(json.data.recommended);
          json.data.popular = markMirror(json.data.popular);
          json.data.mirrorComics = markMirror(json.data.mirrorComics);
          json.data.projectComics = json.data.projectComics || [];
        }

        setHome(json.data);
      } catch (err: any) {
        setError(err.message || 'Terjadi kesalahan');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return { home, loading, error };
}