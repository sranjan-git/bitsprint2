import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useParams, useNavigate } from "react-router-dom";
import { Typography, Container, Box } from "@mui/material"; // Added Box and Container for layout styling
import Dashboard from "./pages/Dashboard";
import HackathonDetailPage from "./pages/HackathonDetailPage";
import Navbar from "./components/Navbar";
import { Hackathon } from "../types";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';


function App() {
  const [hackathons, setHackathons] = useState<Hackathon[]>([]);

  const findHackathonById = (id: string): Hackathon | undefined => {
    return hackathons.find(hackathon => hackathon.id === id);
  };

  const handleEditHackathon = (updatedHackathon: Hackathon) => {
    setHackathons(hackathons.map(h => h.id === updatedHackathon.id ? updatedHackathon : h));
  };

  const handleDeleteHackathon = (id: string) => {
    setHackathons(hackathons.filter(h => h.id !== id));
  };

  return (
    <ThemeProvider theme={createTheme()}>
    <Router>
      <Navbar/>
      <Container maxWidth="lg" sx={{ mt: 4 }}> {/* Container for layout */}
        <Routes>
          <Route 
            path="/" 
            element={<Dashboard hackathons={hackathons} setHackathons={setHackathons} />} 
          />
          <Route
            path="/hackathon/:id"
            element={
              <HackathonDetailRoute
                findHackathonById={findHackathonById}
                onEdit={handleEditHackathon}
                onDelete={handleDeleteHackathon}
              />
            }
          />
        </Routes>
      </Container>
    </Router>
    </ThemeProvider>
  );
}

interface HackathonDetailRouteProps {
  findHackathonById: (id: string) => Hackathon | undefined;
  onEdit: (hackathon: Hackathon) => void;
  onDelete: (id: string) => void;
}

const HackathonDetailRoute: React.FC<HackathonDetailRouteProps> = ({ findHackathonById, onEdit, onDelete }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  if (!id) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}> {/* Center align the text and give some margin on top */}
        <Typography variant="h6" color="error"> {/* Apply error color to the text */}
          No Hackathon Found
        </Typography>
      </Box>
    );
  }

  const hackathon = findHackathonById(id);

  if (!hackathon) {
    return (
      <Box sx={{ mt: 4, textAlign: 'center' }}> {/* Center align the text and give some margin on top */}
        <Typography variant="h6" color="error"> {/* Apply error color to the text */}
          Hackathon not found
        </Typography>
      </Box>
    );
  }

  const handleEdit = () => {
    onEdit(hackathon);
    navigate("/");
  };

  const handleDelete = () => {
    onDelete(hackathon.id);
    navigate("/");
  };

  return (
    <HackathonDetailPage
      hackathon={hackathon}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
};

export default App;
