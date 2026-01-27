import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const VisitorCounter = () => {
    const { t, i18n } = useTranslation();
    const [count, setCount] = useState(null);
    const [firstVisit, setFirstVisit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storageKey = 'sttrvr_visited_final';
        const counterNamespace = 'sttrvr_portfolio_v7_final';
        const counterKey = 'unique_visits';

        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        const updateCounter = async () => {
            const hasVisited = localStorage.getItem(storageKey);
            let url = `https://api.counterapi.dev/v1/${counterNamespace}/${counterKey}`;

            // If not visited, use the /up endpoint to increment
            if (!hasVisited) {
                url += '/up';
            }

            try {
                const response = await fetch(url);
                const data = await response.json();
                setCount(data.count);

                if (!hasVisited) {
                    localStorage.setItem(storageKey, 'true');
                    // Only send telegram notification for new unique visitors
                    if (botToken && chatId) {
                        try {
                            const ipResp = await fetch('https://ipapi.co/json/');
                            const ipData = await ipResp.json();
                            const message = `🚀 NEW VISIT: ${ipData.ip} (${ipData.city}, ${ipData.country_name})`;
                            await fetch(`https://api.telegram.org/bot${botToken.trim()}/sendMessage`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ chat_id: chatId.trim(), text: message })
                            });
                        } catch (e) { console.error(e); }
                    }
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        updateCounter();
    }, []);

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 flex flex-col items-center justify-center gap-2">
            <div className="flex items-center gap-3 border-2 border-white/5 bg-white/[0.02] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 transition-all hover:border-purple-500/50">
                <div className="relative flex h-1.5 w-1.5">
                    <span className={`absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75 ${!loading ? 'animate-ping' : ''}`}></span>
                    <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${loading ? 'bg-gray-800' : 'bg-purple-600'}`}></span>
                </div>
                <span>{loading ? 'CALCULATING...' : `${count || '0000'} ${t('footer.visitors')}`}</span>
            </div>
        </motion.div>
    );
};

export default VisitorCounter;
