"use client";

import { useEffect, useState } from "react";
import { getHome } from "@/lib/api/shinigami";
import { HomeResponse } from "@/types/manga";

export function useHome() {

    const [home,setHome]=useState<HomeResponse>();

    const [loading,setLoading]=useState(true);

    const [error,setError]=useState("");

    useEffect(()=>{

        getHome()

        .then(res=>{

            setHome(res);

        })

        .catch(e=>{

            setError(e.message);

        })

        .finally(()=>{

            setLoading(false);

        });

    },[]);

    return {

        home,

        loading,

        error

    };

}