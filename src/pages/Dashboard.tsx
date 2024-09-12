import React, { useState } from "react";
import { Container, Grid, Button, TextField, MenuItem, Box, Typography } from "@mui/material";
import HackathonCard from "../components/HackathonCard";
import HackathonForm from "../components/HackathonForm";
import { Hackathon } from "../../types";

interface DashboardProps {
  hackathons: Hackathon[];
  setHackathons: React.Dispatch<React.SetStateAction<Hackathon[]>>;
}

const Dashboard: React.FC<DashboardProps> = ({ hackathons, setHackathons }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterLevel, setFilterLevel] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [editingHackathon, setEditingHackathon] = useState<Hackathon | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const saveHackathon = (hackathon: Hackathon) => {
    if (editingHackathon) {
      setHackathons(
        hackathons.map((h) => (h.id === hackathon.id ? hackathon : h))
      );
    } else {
      setHackathons([hackathon, ...hackathons]);
    }
    setShowForm(false);
    setEditingHackathon(null);
  };

  const deleteHackathon = (id: string) => {
    setHackathons(hackathons.filter((h) => h.id !== id));
  };

  const filteredHackathons = hackathons
    .filter((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((h) => (filterLevel ? h.level === filterLevel : true))
    .sort((a, b) =>
      sortOrder === "newest"
        ? b.startDate.getTime() - a.startDate.getTime()
        : a.startDate.getTime() - b.startDate.getTime()
    );

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, textAlign: 'center', fontWeight: 'bold' }}>
        Hackathon Dashboard
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            fullWidth
            label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            fullWidth
            select
            label="Level"
            value={filterLevel}
            onChange={(e) => setFilterLevel(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="easy">Easy</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="hard">Hard</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={4} md={3}>
          <TextField
            fullWidth
            select
            label="Sort"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: 'white', borderRadius: 1 }}
          >
            <MenuItem value="newest">Newest First</MenuItem>
            <MenuItem value="oldest">Oldest First</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => setShowForm(true)}
            sx={{ height: '100%' }}
          >
            Create Hackathon
          </Button>
        </Grid>
      </Grid>

      {showForm && (
        <Box mt={4}>
          <HackathonForm
            hackathon={editingHackathon ?? undefined} // Convert null to undefined
            onSave={saveHackathon}
          />
        </Box>
      )}
      <Grid container spacing={3} mt={2}>
        {filteredHackathons.length > 0 ? (
          filteredHackathons.map((hackathon) => (
            <Grid item xs={12} sm={6} md={4} key={hackathon.id}>
              <HackathonCard
                hackathon={hackathon}
                onClick={() => setEditingHackathon(hackathon)}
              />
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                sx={{ mt: 1 }}
                onClick={() => deleteHackathon(hackathon.id)}
              >
                Delete
              </Button>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant="h6" textAlign="center">
              No Hackathons found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Dashboard;
