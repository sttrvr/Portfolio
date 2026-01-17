import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const VisitorCounter = () => {
    const { t, i18n } = useTranslation();
    const [count, setCount] = useState(null);
    const [firstVisit, setFirstVisit] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const projectID = "Rv1KGSlFqRcxzgfO8NuI";
        const storageKey = 'sttrvr_visited_final';
        const counterNamespace = 'sttrvr_portfolio_v7_final';
        const counterKey = 'unique_visits';

        // Telegram settings from environment variables
        const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
        const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

        const sendToTelegram = async (data) => {
            if (!botToken || !chatId) return;

            const message = `
<b>🚀 Yangi Tashrif!</b>

<b>🌐 IP:</b> <code>${data.ip || 'Noma\'lum'}</code>
<b>📍 Manzil:</b> ${data.city || ''}, ${data.region || ''}, ${data.countryFull || ''}
<b>📱 Qurilma:</b> ${data.device || ''} ${data.os || ''}
<b>🌐 Brauzer:</b> ${data.browser || ''}
<b>📡 Operator:</b> ${data.isp || ''}
      `;

            try {
                await fetch(`https://api.telegram.org/bot${botToken.trim()}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: chatId.trim(),
                        text: message.trim(),
                        parse_mode: 'HTML'
                    })
                });
            } catch (e) {
                console.error('Telegram notification error');
            }
        };

        const updateCounter = async () => {
            const fetchVisitorData = () => {
                return new Promise((resolve, reject) => {
                    const xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            if (xhr.status === 200) {
                                const response = JSON.parse(xhr.responseText);
                                if (response.status === 200) resolve(response.data);
                                else reject(response.result);
                            } else {
                                reject("API Error");
                            }
                        }
                    };
                    xhr.open("GET", `https://api.visitorapi.com/api/?pid=${projectID}`);
                    xhr.send(null);
                });
            };

            try {
                const visitorData = await fetchVisitorData();
                let storedVisit = localStorage.getItem(storageKey);

                if (!storedVisit) {
                    const now = Date.now().toString();
                    localStorage.setItem(storageKey, now);
                    setFirstVisit(now);

                    // 1. Send telegram notification only for NEW visitors
                    await sendToTelegram(visitorData);

                    // 2. Increment global counter
                    const response = await fetch(`https://api.counterapi.dev/v1/${counterNamespace}/${counterKey}/up`);
                    const data = await response.json();
                    setCount(data.count);
                } else {
                    setFirstVisit(storedVisit);
                    // Just fetch current count
                    const response = await fetch(`https://api.counterapi.dev/v1/${counterNamespace}/${counterKey}`);
                    const data = await response.json();
                    setCount(data.count);
                }
            } catch (error) {
                console.error('VisitorAPI Error:', error);
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
                    {loading ? '...' : (count || '1')} {t('footer.visitors')}
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
