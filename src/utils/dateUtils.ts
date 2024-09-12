import { format, differenceInSeconds } from 'date-fns';

export const formatDate = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
};

export const calculateTimeLeft = (endDate: Date) => {
    const now = new Date();
    const difference = differenceInSeconds(endDate, now);
    
    let timeLeft = {
        days: Math.floor(difference / (3600 * 24)),
        hours: Math.floor((difference % (3600 * 24)) / 3600),
        minutes: Math.floor((difference % 3600) / 60),
        seconds: difference % 60
    };

    return timeLeft;
};
