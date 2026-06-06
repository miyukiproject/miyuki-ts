import "./helpers/editorConfig";
import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom"
import './i18n';
import { BookView } from "./components/Book/BookView";
import { pdep } from "./components/Book/Book.data";
import { Chapter } from "./components/Chapter/Chapter";
import { Lesson } from "./components/Lesson/Lesson";
import Exercise from "./Exercise";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<BookView book={pdep}/>} />
        <Route path="/chapters/:chapterId" element={<Chapter />} />
        <Route path="/lessons/:lessonId" element={<Lesson/>} />
        <Route path="/lessons/:lessonId/exercises/:exerciseId" element={<Exercise />} />
      </Routes>
    </HashRouter>
  );
}
export default App;

/**
 * 
        {/* <Route path="/chapters/:chapterId/appendix" element={<Appendix />} /> }
        {/* <Route path="/faqs" element={<Faqs />} /> }
 */