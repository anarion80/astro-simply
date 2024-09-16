export const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const day = `0${date.getDate()}`.slice(-2);
    const hours = `0${date.getHours()}`.slice(-2);
    const minutes = `0${date.getMinutes()}`.slice(-2);
    const seconds = `0${date.getSeconds()}`.slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const prettyDate = ({ dateString, locale = 'en-GB' }: { dateString: Date; locale?: string }): string => {
    return dateString.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
    });
};

import { format } from 'date-fns';

export const dateFormats = {
    /** Jan 13, 2024 */
    cardDate: 'MMM dd, yyyy',
    /** 2024-02-26 */
    isoDate: 'yyyy-MM-dd',
    /** Tue, 16th July, 9am */
    shortDate: 'do MMMM, haaa',
} as const;

export const formatDateCard = (date: Date): string => format(date, dateFormats.cardDate);

export const formatDateIso = (date: Date): string => format(date, dateFormats.isoDate);

export const shortDate = (date: Date): string => format(date, dateFormats.shortDate);
