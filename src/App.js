import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Paper,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";

const API_URL = "http://54.82.2.136:5000/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setTodos(res.data);
    } catch (err) {
      showSnackbar("Failed to load todos", "error");
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const res = await axios.post(API_URL, { text });
      setTodos([...todos, res.data]);
      setText("");
      showSnackbar("Todo added successfully", "success");
    } catch (err) {
      showSnackbar("Failed to add todo", "error");
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
      setOpenDialog(false);
      showSnackbar("Todo deleted successfully", "success");
    } catch (err) {
      showSnackbar("Failed to delete todo", "error");
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo._id);
    setEditText(todo.text);
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;

    try {
      const res = await axios.put(`${API_URL}/${id}`, { text: editText });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, text: editText } : todo
        )
      );
      setEditingId(null);
      showSnackbar("Todo updated successfully", "success");
    } catch (err) {
      showSnackbar("Failed to update todo", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const confirmDelete = (todo) => {
    setSelectedTodo(todo);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        component="h1"
        gutterBottom
        align="center"
        color="primary"
      >
        Todo List
      </Typography>

      <Paper component="form" onSubmit={addTodo} sx={{ p: 2, mb: 4 }}>
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a new todo..."
            size="small"
          />
          <Button
            type="submit"
            variant="contained"
            startIcon={<AddIcon />}
            disabled={!text.trim()}
          >
            Add
          </Button>
        </Box>
      </Paper>

      {loading ? (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress />
        </Box>
      ) : (
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo._id}
              sx={{
                mb: 2,
                bgcolor: "background.paper",
                borderRadius: 1,
                boxShadow: 1,
              }}
              secondaryAction={
                editingId === todo._id ? (
                  <Box>
                    <IconButton
                      onClick={() => updateTodo(todo._id)}
                      color="success"
                    >
                      <SaveIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => setEditingId(null)}
                      color="error"
                    >
                      <CancelIcon />
                    </IconButton>
                  </Box>
                ) : (
                  <Box>
                    <IconButton onClick={() => startEdit(todo)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => confirmDelete(todo)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                )
              }
            >
              {editingId === todo._id ? (
                <TextField
                  fullWidth
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  size="small"
                  autoFocus
                />
              ) : (
                <ListItemText primary={todo.text} />
              )}
            </ListItem>
          ))}
        </List>
      )}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this todo?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={() => deleteTodo(selectedTodo?._id)} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
