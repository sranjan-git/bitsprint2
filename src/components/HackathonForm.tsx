import React, { useState } from 'react';
import { TextField, Button, MenuItem, Grid } from '@mui/material';
import { Hackathon } from '../../types';
import { formatDate } from '../utils/dateUtils';

interface HackathonFormProps {
    hackathon?: Hackathon;
    onSave: (hackathon: Hackathon) => void;
}

const HackathonForm: React.FC<HackathonFormProps> = ({ hackathon, onSave }) => {
    const [formData, setFormData] = useState<Hackathon>({
        id: hackathon?.id || '',
        name: hackathon?.name || '',
        startDate: hackathon?.startDate || new Date(),
        endDate: hackathon?.endDate || new Date(),
        description: hackathon?.description || '',
        image: hackathon?.image || '',
        level: hackathon?.level || 'easy',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: new Date(e.target.value) });
    };

    const handleSubmit = () => {
        if (!formData.id) {
            formData.id = Date.now().toString(); // Simple ID generation
        }
        onSave(formData);
    };

    return (
        <form noValidate autoComplete="off">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        label="Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }} // Margin bottom for spacing
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Start Date"
                        name="startDate"
                        value={formatDate(formData.startDate)}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        sx={{ mb: 2 }} // Margin bottom for spacing
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        type="date"
                        label="End Date"
                        name="endDate"
                        value={formatDate(formData.endDate)}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        required
                        sx={{ mb: 2 }} // Margin bottom for spacing
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        select
                        label="Level"
                        name="level"
                        value={formData.level}
                        onChange={handleChange}
                        required
                        sx={{ mb: 2 }} // Margin bottom for spacing
                    >
                        <MenuItem value="easy">Easy</MenuItem>
                        <MenuItem value="medium">Medium</MenuItem>
                        <MenuItem value="hard">Hard</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        sx={{ mb: 2 }} // Margin bottom for spacing
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Image URL"
                        name="image"
                        value={formData.image}
                        onChange={handleChange}
                        sx={{ mb: 2 }} // Margin bottom for spacing
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                        sx={{ mt: 2 }} // Margin top for spacing
                    >
                        Save Hackathon
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default HackathonForm;
