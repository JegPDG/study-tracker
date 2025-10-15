import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import NotesAll from './page/NotesAll';
import SubjectsAll from './page/SubjectsAll';
import AddNewSubject from './components/modals/AddNewSubject';
import SubjectDetail from './page/SubjectDetail';
import NoteDetailView from './page/NoteDetailViewandEdit';
import NoteDetailViewandEdit from './page/NoteDetailViewandEdit';
import Overview from './page/Overview';
import Landing from './page/Landing';
import AuthLayout from './pages/AuthLayout';
import AuthLayoutNew from './layout/AuthLayoutNew';
import LoginPage from './page/LoginPage';
import SignUpPage from './page/SignUpPage';

const Login = lazy(() => import('./pages/Login'));
const Subjects = lazy(() => import('./pages/Subjects'));
const Sidebar = lazy(() => import('./pages/Sidebar'));
const Navbar = lazy(() => import('./pages/Navbar'));
const NewSubject = lazy(() => import('./pages/NewSubject'));
const Layout = lazy(() => import('./layout/Layout'));
const SpecificSub = lazy(() => import('./pages/SpecificSub'));
const NewNote = lazy(() => import('./pages/NewNote'));
const Note = lazy(() => import('./pages/Note'));
const EditNote = lazy(() => import('./pages/EditNote'));
const AllNotes = lazy(() => import('./pages/AllNotes'));
const SignUp = lazy(() => import('./pages/SignUp'));
const DashLayout = lazy(() => import('./pages/Dashboard/DashLayout'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Auth */}
          <Route path='/' element={<Landing />} />
          <Route path='/auth/login' element={<LoginPage/>} />
          <Route path='/auth/sign-up' element={<SignUpPage/>} />


          {/* <Route path='/' element={<Login />} /> */}
          {/* <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} /> */}
          {/* <Route path='/auth' element={<AuthLayoutNew />} /> */}



          {/* Main Layout */}
          <Route element={<Layout />}>
            {/* Dashboard */}
            {/* <Route path='/dashboard' element={<DashLayout />} /> */}
            <Route path='/overview' element={<Overview />} />


            {/* Subjects */}
            <Route path='/subjects' element={<SubjectsAll />} />
            <Route path='/subjects/add' element={<AddNewSubject />} />
            <Route path='/subjects/:subjectId' element={<SubjectDetail />} />

            {/* Notes for a Subject */}
            <Route path='/subjects/:subjectId/notes/new' element={<NoteDetailViewandEdit />} />
            <Route path='/subjects/:subjectId/notes/:noteId' element={<NoteDetailViewandEdit />} />

            {/* All Notes */}
            <Route path='/notes' element={<NotesAll />} />
            <Route path='/notes/:noteId' element={<NoteDetailViewandEdit />} />
            <Route path='/notes/:noteId/edit' element={<EditNote />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
