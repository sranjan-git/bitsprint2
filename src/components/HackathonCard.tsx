import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import { Hackathon } from '../../types';
import { calculateTimeLeft } from '../utils/dateUtils';

interface HackathonCardProps {
    hackathon: Hackathon;
    onClick: () => void;
}

const HackathonCard: React.FC<HackathonCardProps> = ({ hackathon, onClick }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(hackathon.endDate));

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft(hackathon.endDate));
        }, 1000);

        return () => clearInterval(timer);
    }, [hackathon.endDate]);

    return (
        <Card onClick={onClick} sx={{ cursor: 'pointer', maxWidth: 345, boxShadow: 3 }}>
            <CardMedia
                component="img"
                height="140"
                image={hackathon.image}
                alt={hackathon.name}
                sx={{ objectFit: 'cover' }}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" sx={{ mb: 1.5, fontWeight: 'bold' }}>
                    {hackathon.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {hackathon.description}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Level: <strong>{hackathon.level}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Ends in: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
                </Typography>
            </CardContent>
        </Card>
    );
};

export default HackathonCard;
