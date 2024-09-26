import Giscus, { type Theme } from '@giscus/react';
import { CONFIG } from '@config/config.ts';
import { useEffect, useState } from 'react';

interface CommentsProps {
    lightTheme?: Theme;
    darkTheme?: Theme;
}

export default function Comments({ lightTheme = 'light', darkTheme = 'dark' }: CommentsProps) {
    const [theme, setTheme] = useState(() => {
        const currentTheme = localStorage.getItem('theme');
        const browserTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

        return currentTheme || browserTheme;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = ({ matches }: MediaQueryListEvent) => {
            setTheme(matches ? 'dark' : 'light');
        };

        mediaQuery.addEventListener('change', handleChange);

        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    useEffect(() => {
        const themeButton = document.getElementById('themeToggle');
        const handleClick = () => {
            setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
        };

        themeButton?.addEventListener('click', handleClick);

        return () => themeButton?.removeEventListener('click', handleClick);
    }, []);

    return (
        <div className="giscus mx-auto mt-10 w-full">
            <Giscus theme={theme === 'light' ? lightTheme : darkTheme} {...CONFIG.giscusConfig} />
        </div>
    );
}
