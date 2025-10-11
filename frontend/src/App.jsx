import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './app.css';
import NotesAll from './page/NotesAll';
import SubjectsAll from './page/SubjectsAll';

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
          <Route path='/' element={<Login />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />

          <Route element={<Layout />}>
            {/* new  */}
            {/* <Route path='/subject' element={<Subjects />} /> */}
            <Route path='/subject' element={<SubjectsAll />}/>


            <Route path='/subject/new' element={<NewSubject />} />
            <Route path='/subject/:id' element={<SpecificSub />} />
            <Route path='/subject/:id/newnote' element={<NewNote />} />
            <Route path='/note/:id' element={<Note />} />
            <Route path='/note/:id/edit' element={<EditNote />} />

            {/* new  */}
            {/* <Route path='/note' element={<AllNotes />} /> */}
            <Route path='/note' element={<NotesAll />} /> 

            <Route path='/dashboard' element={<DashLayout />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
