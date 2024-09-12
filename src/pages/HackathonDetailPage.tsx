import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Hackathon } from '../../types';

interface HackathonDetailPageProps {
    hackathon: Hackathon;
    onEdit: () => void;
    onDelete: () => void;
}

const HackathonDetailPage: React.FC<HackathonDetailPageProps> = ({ hackathon, onEdit, onDelete }) => {
    const { id } = useParams<{ id: string }>();

    if (!hackathon) {
        return <Typography>Loading...</Typography>;
    }

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                {hackathon.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {hackathon.description}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Level: {hackathon.level}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                Start Date: {hackathon.startDate.toDateString()}
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                End Date: {hackathon.endDate.toDateString()}
            </Typography>
            <img src={hackathon.image} alt={hackathon.name} style={{ width: '100%', maxHeight: '400px' }} />

            <Grid container spacing={2} marginTop={2}>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={onEdit}>
                        Edit
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="secondary" onClick={onDelete}>
                        Delete
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default HackathonDetailPage;
