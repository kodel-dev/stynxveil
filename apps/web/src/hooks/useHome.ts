// apps/web/src/hooks/useHome.ts
"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api/client";
import { HomeResponse, HeroSlide, Manga } from "@/types/manga";

// Fungsi utilitas untuk mencegat dan memaksa tipe menjadi 'Mirror'
const enforceMirrorType = (comics: Manga[]): Manga[] => {
    if (!comics) return [];
    return comics.map(comic => ({ ...comic, type: "Mirror" }));
};

export function useHome() {
    // State bawaan Homepage & Slider
    const [home, setHome] = useState<HomeResponse["data"]>();
    const [slides, setSlides] = useState<HeroSlide[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // State khusus untuk Pagination Update Log
    const [latestComics, setLatestComics] = useState<Manga[]>([]);
    const [latestPage, setLatestPage] = useState(1);
    const [latestTotalPages, setLatestTotalPages] = useState(1);
    const [loadingLatest, setLoadingLatest] = useState(false);

    useEffect(() => {
        // Fetch data awal secara paralel
        Promise.all([
            api.get<HomeResponse>("/comic/shinigami/home"),
            api.get<{status: string, data: HeroSlide[]}>("/comic/shinigami/slider/explore-1"),
            api.get("/comic/shinigami/latest?page=1&page_size=20")
        ])
        .then(([homeRes, sliderRes, latestRes]) => {
            if (homeRes.data.status === "success") {
                const rawData = homeRes.data.data;
                // Timpa tipe dari semua kategori menjadi Mirror sebelum masuk ke state
                setHome({
                    latest: enforceMirrorType(rawData.latest),
                    recommended: enforceMirrorType(rawData.recommended),
                    popular: enforceMirrorType(rawData.popular)
                });
            }
            if (sliderRes.data.status === "success") {
                setSlides(sliderRes.data.data);
            }
            if (latestRes.data.status === "success") {
                // Timpa tipe untuk blok Update Terbaru
                setLatestComics(enforceMirrorType(latestRes.data.data));
                setLatestTotalPages(latestRes.data.pagination.total_pages);
            }
        })
        .catch(e => {
            setError(e.message || "Terjadi kegagalan transmisi data sistem.");
        })
        .finally(() => {
            setLoading(false);
        });
    }, []);

    // Fungsi transmisi untuk memuat halaman berikutnya pada Update Log
    const fetchLatestPage = async (page: number) => {
        setLoadingLatest(true);
        try {
            const res = await api.get(`/comic/shinigami/latest?page=${page}&page_size=20`);
            if (res.data.status === "success") {
                // Pastikan hasil pagination selanjutnya juga dipaksa menjadi Mirror
                setLatestComics(enforceMirrorType(res.data.data));
                setLatestPage(page);
                setLatestTotalPages(res.data.pagination.total_pages);
            }
        } catch (e: any) {
            console.error("Gagal mensinkronisasi data log:", e);
        } finally {
            setLoadingLatest(false);
        }
    };

    return { 
        home, 
        slides, 
        loading, 
        error, 
        latestComics, 
        latestPage, 
        latestTotalPages, 
        fetchLatestPage, 
        loadingLatest 
    };
}