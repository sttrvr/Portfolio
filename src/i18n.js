import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
    en: {
        translation: {
            "navbar": {
                "home": "Home",
                "about": "About me",
                "projects": "Projects",
                "skills": "Skills",
                "ai_chat": "AI Chat",
                "contact": "Contact"
            },
            "hero": {
                "available": "Available for new projects",
                "title_part1": "Digital",
                "title_part2": "Experiences",
                "title_part3": "Creating",
                "description": "I create high-quality web interfaces, paying attention to every detail, ensuring smooth transitions and perfect execution.",
                "view_projects": "View projects",
                "contact": "Contact me"
            },
            "about": {
                "title": "About me",
                "subtitle": "Creating digital experiences with precision, attention to detail and a passion for innovation.",
                "goal": {
                    "title": "Goal",
                    "desc": "I believe in creating digital experiences that feel natural, intuitive and pleasant. Every interaction should have a purpose and meaning."
                },
                "approach": {
                    "title": "Approach",
                    "desc": "Motion-first design with thoughtful animations, smooth transitions and performance optimization at the core of every project."
                },
                "focus": {
                    "title": "Focus",
                    "desc": "Specializing in React, Next.js, Framer Motion and modern web technologies to build scalable, maintainable applications."
                },
                "stats": {
                    "projects": "Completed projects",
                    "experience": "Years of experience",
                    "satisfaction": "Client satisfaction",
                    "support": "Support"
                }
            },
            "projects": {
                "title": "Projects",
                "subtitle": "Projects created using modern technologies and best practices",
                "view_project": "View project",
                "cta": {
                    "title": "Ready to work on a project?",
                    "desc": "Let's turn your idea into reality and create an amazing product",
                    "button": "Start a project"
                },
                "items": {
                    "ecomm": {
                        "title": "E-Commerce Platform",
                        "tag": "Web App",
                        "desc": "Modern online store with payment system and product management. With Stripe integration and real-time updates."
                    },
                    "luma": {
                        "title": "Luma AI",
                        "tag": "Artificial Intelligence",
                        "desc": "Platform for analyzing large amounts of data and training AI models. Modern chat interface powered by GPT-4o model."
                    },
                    "portfolio": {
                        "title": "Portfolio Website",
                        "tag": "Design System",
                        "desc": "Personal website with minimal design and interactive elements. Created with Framer Motion and Tailwind CSS."
                    },
                    "tasks": {
                        "title": "Task Management",
                        "tag": "Productivity App",
                        "desc": "Real-time task and team collaboration app. Powered by Socket.io and MongoDB."
                    }
                }
            },
            "skills": {
                "title": "Skills",
                "subtitle": "A comprehensive toolkit for creating modern, efficient and beautiful web experiences.",
                "categories": {
                    "frontend": "Frontend Development",
                    "motion": "Animation and Motion",
                    "design": "Design and UX",
                    "backend": "Backend and Tools"
                },
                "experience": {
                    "title": "Experience",
                    "items": [
                        {
                            "year": "2024",
                            "title": "Senior Frontend Developer",
                            "company": "Tech Startup",
                            "desc": "Led the development of responsive web applications with modern frameworks."
                        },
                        {
                            "year": "2023",
                            "title": "UI/UX Designer",
                            "company": "Design Agency",
                            "desc": "Created user-centered designs and interactive prototypes for various clients."
                        },
                        {
                            "year": "2022",
                            "title": "Frontend Developer",
                            "company": "Software Company",
                            "desc": "Built and maintained web applications using React and modern CSS frameworks."
                        }
                    ]
                }
            },
            "contact": {
                "title": "Let's work together",
                "subtitle": "Ready to bring your ideas to life? I'm available for new projects and collaborations.",
                "form": {
                    "name": "Name",
                    "name_placeholder": "Your name",
                    "email": "Email",
                    "email_placeholder": "your@email.com",
                    "details": "Project details",
                    "details_placeholder": "Tell me about your project, timeline and budget...",
                    "telegram": "Telegram Username (required if you want to work)",
                    "telegram_placeholder": "@username",
                    "submit": "Send message",
                    "success": "Message sent successfully!",
                    "error": "Failed to send message. Please try again.",
                    "back_to_top": "Back to top"
                },
                "alt": {
                    "title": "Prefer another way to connect?",
                    "email": "Email",
                    "telegram": "Telegram",
                    "linkedin_val": "Connect with me",
                    "github_val": "View my code"
                }
            },
            "footer": {
                "created_with": "Created with precision and care."
            },
            "themes": {
                "light": "Light mode",
                "dark": "Dark mode",
                "system": "System mode",
                "title": "Theme"
            },
            "languages": {
                "en": "English",
                "ru": "Russian",
                "uz": "Uzbek",
                "title": "Language"
            }
        }
    },
    ru: {
        translation: {
            "navbar": {
                "home": "Главная",
                "about": "Обо мне",
                "projects": "Проекты",
                "skills": "Навыки",
                "ai_chat": "AI Чат",
                "contact": "Контакты"
            },
            "hero": {
                "available": "Доступен для новых проектов",
                "title_part1": "Создаю",
                "title_part2": "Цифровой",
                "title_part3": "Опыт",
                "description": "Я создаю высококачественные веб-интерфейсы, уделяя внимание каждой детали, обеспечивая плавные переходы и безупречное исполнение.",
                "view_projects": "Посмотреть проекты",
                "contact": "Связаться"
            },
            "about": {
                "title": "Обо мне",
                "subtitle": "Создание цифрового опыта с точностью, вниманием к деталям и страстью к инновациям.",
                "goal": {
                    "title": "Цель",
                    "desc": "Я верю в создание цифрового опыта, который кажется естественным, интуитивно понятным и приятным. Каждое взаимодействие должно иметь цель и смысл."
                },
                "approach": {
                    "title": "Подход",
                    "desc": "Дизайн, ориентированный на движение, с продуманной анимацией, плавными переходами и оптимизацией производительности в основе каждого проекта."
                },
                "focus": {
                    "title": "Фокус",
                    "desc": "Специализация на React, Next.js, Framer Motion и современных веб-технологиях для создания масштабируемых и поддерживаемых приложений."
                },
                "stats": {
                    "projects": "Завершенных проектов",
                    "experience": "Лет опыта",
                    "satisfaction": "Удовлетворенность клиентов",
                    "support": "Поддержка"
                }
            },
            "projects": {
                "title": "Проекты",
                "subtitle": "Проекты, созданные с использованием современных технологий и лучших практик",
                "view_project": "Посмотреть проект",
                "cta": {
                    "title": "Готовы работать над проектом?",
                    "desc": "Давайте воплотим вашу идею в реальность и создадим потрясающий продукт",
                    "button": "Начать проект"
                },
                "items": {
                    "ecomm": {
                        "title": "E-Commerce Платформа",
                        "tag": "Веб-приложение",
                        "desc": "Современный интернет-магазин с системой оплаты и управлением продуктами. С интеграцией Stripe и обновлениями в реальном времени."
                    },
                    "luma": {
                        "title": "Luma AI",
                        "tag": "Искусственный интеллект",
                        "desc": "Платформа для анализа больших объемов данных и обучения моделей ИИ. Современный чат-интерфейс на базе модели GPT-4o."
                    },
                    "portfolio": {
                        "title": "Сайт-портфолио",
                        "tag": "Дизайн-система",
                        "desc": "Персональный сайт с минималистичным дизайном и интерактивными элементами. Создан с помощью Framer Motion и Tailwind CSS."
                    },
                    "tasks": {
                        "title": "Управление задачами",
                        "tag": "Приложение для продуктивности",
                        "desc": "Приложение для совместной работы над задачами в реальном времени. Работает на Socket.io и MongoDB."
                    }
                }
            },
            "skills": {
                "title": "Навыки",
                "subtitle": "Комплексный набор инструментов для создания современных, эффективных и красивых веб-интерфейсов.",
                "categories": {
                    "frontend": "Frontend Разработка",
                    "motion": "Анимация и движение",
                    "design": "Дизайн и UX",
                    "backend": "Backend и инструменты"
                },
                "experience": {
                    "title": "Опыт",
                    "items": [
                        {
                            "year": "2024",
                            "title": "Senior Frontend Разработчик",
                            "company": "Технологический стартап",
                            "desc": "Руководил разработкой адаптивных веб-приложений с использованием современных фреймворков."
                        },
                        {
                            "year": "2023",
                            "title": "UI/UX Дизайнер",
                            "company": "Дизайнерское агентство",
                            "desc": "Создавал ориентированные на пользователя дизайны и интерактивные прототипы для различных клиентов."
                        },
                        {
                            "year": "2022",
                            "title": "Frontend Разработчик",
                            "company": "ИТ-компания",
                            "desc": "Создавал и поддерживал веб-приложения с использованием React и современных CSS-фреймворков."
                        }
                    ]
                }
            },
            "contact": {
                "title": "Давайте работать вместе",
                "subtitle": "Готовы воплотить свои идеи в жизнь? Я открыт для новых проектов и сотрудничества.",
                "form": {
                    "name": "Имя",
                    "name_placeholder": "Ваше имя",
                    "email": "Email",
                    "email_placeholder": "your@email.com",
                    "details": "Детали проекта",
                    "details_placeholder": "Расскажите о своем проекте, сроках и бюджете...",
                    "telegram": "Telegram никнейм (обязательно если хотите работать)",
                    "telegram_placeholder": "@username",
                    "submit": "Отправить сообщение",
                    "success": "Сообщение успешно отправлено!",
                    "error": "Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.",
                    "back_to_top": "Наверх"
                },
                "alt": {
                    "title": "Предпочитаете другой способ связи?",
                    "email": "Электронная почта",
                    "telegram": "Telegram",
                    "linkedin_val": "Свяжитесь со мной",
                    "github_val": "Посмотреть мой код"
                }
            },
            "footer": {
                "created_with": "Создано с точностью и заботой."
            },
            "themes": {
                "light": "Светлая тема",
                "dark": "Темная тема",
                "system": "Системная тема",
                "title": "Тема"
            },
            "languages": {
                "en": "Английский",
                "ru": "Русский",
                "uz": "Узбекский",
                "title": "Язык"
            }
        }
    },
    uz: {
        translation: {
            "navbar": {
                "home": "Bosh sahifa",
                "about": "Men haqimda",
                "projects": "Loyihalar",
                "skills": "Mahoratlar",
                "ai_chat": "AI Chat",
                "contact": "Aloqa"
            },
            "hero": {
                "available": "Yangi loyihalar uchun mavjud",
                "title_part1": "Raqamiy",
                "title_part2": "Tajribalar",
                "title_part3": "Yaratish",
                "description": "Men yuqori sifatli veb-interfeyslari yarataman, har bir detailga e'tibor beraman, silliq o'tishlar va mukammal bajarishni ta'minlayman.",
                "view_projects": "Loyihalarni ko'rish",
                "contact": "Bog'lanish"
            },
            "about": {
                "title": "Men haqimda",
                "subtitle": "Aniqlik, detallarga e'tibor va innovatsiyaga bo'lgan ishtiyoq bilan raqamiy tajribalar yaratish.",
                "goal": {
                    "title": "Maqsad",
                    "desc": "Men tabiiy, intuitiv va yoqimli his qiladigan raqamiy tajribalar yaratishga ishonaman. Har bir o'zaro ta'sir maqsad va ma'noga ega bo'lishi kerak."
                },
                "approach": {
                    "title": "Yondashuv",
                    "desc": "O'ylangan animatsiyalar, silliq o'tishlar va har bir loyihaning markazida ishlash optimizatsiyasi bilan harakat-birinchi dizayn."
                },
                "focus": {
                    "title": "E'tibor",
                    "desc": "Kengaytiriladigan, saqlash mumkin bo'lgan ilovalar yaratish uchun React, Next.js, Framer Motion va zamonaviy veb texnologiyalarga ixtisoslashish."
                },
                "stats": {
                    "projects": "Tugallangan loyihalar",
                    "experience": "Yillik tajriba",
                    "satisfaction": "Mijozlar mamnunligi",
                    "support": "Qo'llab-quvvatlash"
                }
            },
            "projects": {
                "title": "Loyihalar",
                "subtitle": "Zamonaviy texnologiyalar va eng yaxshi amaliyotlar yordamida yaratilgan loyihalar",
                "view_project": "Loyihani ko'rish",
                "cta": {
                    "title": "Loyiha ustida ishlashga tayyormisiz?",
                    "desc": "Keling, sizning g'oyangizni hayotga tatbiq etaylik va ajoyib mahsulot yarataylik",
                    "button": "Loyiha boshlash"
                },
                "items": {
                    "ecomm": {
                        "title": "Elektron Tijorat Platformasi",
                        "tag": "Veb Ilova",
                        "desc": "Zamonaviy onlayn do'kon. Stripe integratsiyasi va real-time yangilanishlar bilan."
                    },
                    "luma": {
                        "title": "Luma AI",
                        "tag": "Sun'iy Intellekt",
                        "desc": "AI modelini o'qitish platformasi. GPT-4o modeli bilan quvvatlanadigan zamonaviy chat interfeysi."
                    },
                    "portfolio": {
                        "title": "Portfolio Veb-sayti",
                        "tag": "Dizayn Tizimi",
                        "desc": "Minimal dizayn va interaktiv elementlarga ega shaxsiy veb-sayt. Framer Motion va Tailwind bilan yaratilgan."
                    },
                    "tasks": {
                        "title": "Vazifalar Boshqaruvi",
                        "tag": "Samaradorlik Ilovasi",
                        "desc": "Real vaqtda yangilanuvchi vazifalar va jamoa hamkorligi ilovasi. Socket.io va MongoDB bilan."
                    }
                }
            },
            "skills": {
                "title": "Mahoratlar",
                "subtitle": "Zamonaviy, samarali va chiroyli veb-tajribalar yaratish uchun keng qamrovli vositalar to'plami.",
                "categories": {
                    "frontend": "Frontend Dasturlash",
                    "motion": "Animatsiya va Harakat",
                    "design": "Dizayn va UX",
                    "backend": "Backend va Vositalar"
                },
                "experience": {
                    "title": "Tajriba",
                    "items": [
                        {
                            "year": "2024",
                            "title": "Katta Frontend Dasturchi",
                            "company": "Texnologik Startap",
                            "desc": "Zamonaviy freymvorklar bilan javobgar veb-ilovalar ishlab chiqishni boshqardim."
                        },
                        {
                            "year": "2023",
                            "title": "UI/UX Dizayner",
                            "company": "Dizayn Agentligi",
                            "desc": "Turli mijozlar uchun foydalanuvchi-markazli dizaynlar va interaktiv prototiplar yaratdim."
                        },
                        {
                            "year": "2022",
                            "title": "Frontend Dasturchi",
                            "company": "Dasturiy Ta'minot Kompaniyasi",
                            "desc": "React va zamonaviy CSS freymvorklari yordamida veb-ilovalar yaratdim."
                        }
                    ]
                }
            },
            "contact": {
                "title": "Birga ishlaylik",
                "subtitle": "G'oyalaringizni hayotga tatbiq etishga tayyormisiz? Men yangi loyihalar uchun mavjudman.",
                "form": {
                    "name": "Ism",
                    "name_placeholder": "Ismingiz",
                    "email": "Email",
                    "email_placeholder": "your@email.com",
                    "details": "Loyiha tafsilotlari",
                    "details_placeholder": "Loyihangiz, vaqt jadvali va byudjet haqida gapirib bering...",
                    "telegram": "Telegram Username (ishlashni xohlasangiz majburiy)",
                    "telegram_placeholder": "@username",
                    "submit": "Xabar yuborish",
                    "success": "Xabar muvaffaqiyatli yuborildi!",
                    "error": "Xabarni yuborishda xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.",
                    "back_to_top": "Boshiga qaytish"
                },
                "alt": {
                    "title": "Bog'lanishning boshqa usulini afzal ko'rasizmi?",
                    "email": "Email",
                    "telegram": "Telegram",
                    "linkedin_val": "Men bilan bog'laning",
                    "github_val": "Kodlarimni ko'ring"
                }
            },
            "footer": {
                "created_with": "Aniqlik va g'amxo'rllik bilan yaratilgan."
            },
            "themes": {
                "light": "Yorug' rejim",
                "dark": "Qorong'u rejim",
                "system": "System rejimi",
                "title": "Tema"
            },
            "languages": {
                "en": "Inglizcha",
                "ru": "Ruscha",
                "uz": "O'zbekcha",
                "title": "Til"
            }
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "ru",
        detection: {
            order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
            caches: ['localStorage', 'cookie']
        },
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;
