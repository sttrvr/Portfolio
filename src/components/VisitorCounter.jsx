import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const VisitorCounter = () => {
    const { t, i18n } = useTranslation();
    const [count, setCount] = useState(null);
    const [firstVisit, setFirstVisit] = useState(null);

    useEffect(() => {
        // We use counterapi.dev which is simple and free
        const namespace = 'sttrvr_portfolio_unique';
        const key = 'main_visits';
        const storageKey = 'sttrvr_visited_v1';

        const updateCounter = async () => {
            try {
                const storedVisit = localStorage.getItem(storageKey);

                if (!storedVisit) {
                    // First time visit for this browser - increment
                    const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}/up`);
                    const data = await response.json();
                    if (data.count !== undefined) {
                        setCount(data.count);
                        const now = Date.now().toString();
                        localStorage.setItem(storageKey, now);
                        setFirstVisit(now);
                    }
                } else {
                    // Already visited - just fetch the current count
                    setFirstVisit(storedVisit);
                    const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${key}`);
                    const data = await response.json();
                    if (data.count !== undefined) {
                        setCount(data.count);
                    }
                }
            } catch (error) {
                // Quietly fail if API is down
                console.warn('Visitor counter unavailable');
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

    if (count === null) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 flex flex-col items-center justify-center gap-3"
        >
            <div className="flex items-center gap-1.5 rounded-full border border-gray-200 bg-white/50 px-3 py-1 text-[11px] font-medium text-gray-500 backdrop-blur-sm transition-all hover:border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-gray-400 dark:hover:border-white/20">
                <div className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </div>
                <span className="tracking-wide uppercase">
                    {count.toLocaleString()} {t('footer.visitors')}
                </span>
            </div>

            {firstVisit && (
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
