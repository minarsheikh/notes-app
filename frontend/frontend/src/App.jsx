import { useState, useEffect } from "react";
import axios from "axios";

const backendURL = "http://localhost:3001";

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const fetchNotes = async () => {
    const res = await axios.get(`${backendURL}/notes`);
    setNotes(res.data);
  };

  const addNote = async () => {
    if (!text.trim()) return;
    await axios.post(`${backendURL}/notes`, { text });
    setText("");
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`${backendURL}/notes/${id}`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // Styles
  const styles = {
    container: {
      
      margin: "40px auto",
      padding: 24,
      borderRadius: 16,
      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
      backgroundColor: "#fff",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      userSelect: "none",
        position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",         
  maxWidth: 600,
  boxSizing: "border-box",
    },
    heading: {
      textAlign: "center",
      color: "#222",
      marginBottom: 28,
      fontWeight: "700",
      fontSize: "2.4rem",
      letterSpacing: "1.2px",
    },
    inputWrapper: {
      display: "flex",
      marginBottom: 28,
      boxShadow: "0 2px 10px rgba(0, 123, 255, 0.15)",
      borderRadius: 12,
      overflow: "hidden",
    },
    input: {
      flexGrow: 1,
      padding: "14px 20px",
      fontSize: 18,
      border: "none",
      outline: "none",
      transition: "background-color 0.3s",
      fontWeight: 500,
      color: "#333",
    },
    inputFocus: {
      backgroundColor: "#e7f0ff",
    },
    addButton: {
      padding: "0 28px",
      fontSize: 18,
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.15s",
      fontWeight: "600",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      userSelect: "none",
    },
    addButtonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
    noteList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    noteItem: {
      backgroundColor: "#fefefe",
      marginBottom: 16,
      padding: 16,
      borderRadius: 12,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
      transition: "box-shadow 0.3s, transform 0.2s",
      cursor: "default",
    },
    noteItemHover: {
      boxShadow: "0 6px 20px rgba(0,0,0,0.12)",
      transform: "translateY(-3px)",
    },
    noteText: {
      margin: 0,
      fontSize: 18,
      color: "#444",
      wordBreak: "break-word",
      flex: 1,
      paddingRight: 16,
      userSelect: "text",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      padding: "8px 16px",
      borderRadius: 8,
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.15s",
      fontWeight: "600",
      userSelect: "none",
    },
    deleteButtonHover: {
      backgroundColor: "#a71d2a",
      transform: "scale(1.1)",
    },
  };

  // State for button hover effects & note hover (optional)
  const [addHover, setAddHover] = useState(false);
  const [deleteHoverId, setDeleteHoverId] = useState(null);
  const [noteHoverId, setNoteHoverId] = useState(null);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Notes App</h2>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a new note..."
          style={{
            ...styles.input,
            ...(text ? styles.inputFocus : {}),
          }}
          onFocus={(e) => (e.target.style.backgroundColor = styles.inputFocus.backgroundColor)}
          onBlur={(e) => (e.target.style.backgroundColor = "transparent")}
          onKeyDown={(e) => {
            if (e.key === "Enter") addNote();
          }}
          aria-label="New note text"
        />
        <button
          style={addHover ? { ...styles.addButton, ...styles.addButtonHover } : styles.addButton}
          onClick={addNote}
          onMouseEnter={() => setAddHover(true)}
          onMouseLeave={() => setAddHover(false)}
          aria-label="Add Note"
        >
          Add
        </button>
      </div>
      <ul style={styles.noteList}>
        {notes.map(({ id, text }) => (
          <li
            key={id}
            style={noteHoverId === id ? { ...styles.noteItem, ...styles.noteItemHover } : styles.noteItem}
            onMouseEnter={() => setNoteHoverId(id)}
            onMouseLeave={() => setNoteHoverId(null)}
          >
            <p style={styles.noteText}>{text}</p>
            <button
              style={
                deleteHoverId === id
                  ? { ...styles.deleteButton, ...styles.deleteButtonHover }
                  : styles.deleteButton
              }
              onClick={() => deleteNote(id)}
              onMouseEnter={() => setDeleteHoverId(id)}
              onMouseLeave={() => setDeleteHoverId(null)}
              aria-label={`Delete note ${id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
