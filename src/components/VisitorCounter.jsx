import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const VisitorCounter = () => {
    const { t, i18n } = useTranslation();
    const [count, setCount] = useState(null);
    const [firstVisit, setFirstVisit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Unique namespace to reset the counter to 1 for you
        const namespace = 'sttrvr_portfolio_v4_pure';
        const key = 'visits';
        const storageKey = 'sttrvr_visited_final';

        const updateCounter = async () => {
            try {
                let storedVisit = localStorage.getItem(storageKey);

                // If it's a new visitor (no storage key)
                if (!storedVisit) {
                    // 1. IMMEDIATELY mark as visited to prevent race conditions on refresh
                    const now = Date.now().toString();
                    localStorage.setItem(storageKey, now);
                    setFirstVisit(now);

                    // 2. Increment the counter on the server
                    const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
                    const data = await response.json();
                    if (data.count !== undefined) {
                        setCount(data.count);
                    }
                } else {
                    // If returning visitor, just get the current count without incrementing
                    setFirstVisit(storedVisit);
                    const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
                    const data = await response.json();
                    if (data.count !== undefined) {
                        setCount(data.count);
                    }
                }
            } catch (error) {
                console.warn('Counter API error');
            } finally {
                setLoading(false);
            }
        };

        updateCounter();
    }, []);

    const formatDate = (timestamp) => {
        if (!timestamp) return '';
        const date = new Date(parseInt(timestamp));
        return date.toLocaleDateString(i18n.language === 'en' ? 'en-US' : (i18n.language === 'ru' ? 'ru-RU' : 'uz-UZ'), {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 flex flex-col items-center justify-center gap-3 min-h-[40px]"
        >
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-[11px] font-medium text-gray-500 backdrop-blur-sm transition-all hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20">
                <div className="relative flex h-2 w-2">
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 ${!loading ? 'animate-ping' : ''}`}></span>
                    <span className={`relative inline-flex h-2 w-2 rounded-full ${loading ? 'bg-gray-400' : 'bg-green-500'}`}></span>
                </div>
                <span className="tracking-wide uppercase">
                    {loading ? '...' : (count?.toLocaleString() || '1')} {t('footer.visitors')}
                </span>
            </div>

            {firstVisit && !loading && (
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-[10px] text-gray-400 dark:text-gray-500 font-light"
                >
                    {t('footer.first_visit')}: <span className="font-medium text-gray-500 dark:text-gray-400">{formatDate(firstVisit)}</span>
                </motion.p>
            )}
        </motion.div>
    );
};

export default VisitorCounter;
