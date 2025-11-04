import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./Components/LoginComponent/LoginPage";
import RegisterUser from "./Components/LoginComponent/RegisterUser";
import AdminMenu from "./Components/LoginComponent/AdminMenu";
import StudentMenu from "./Components/LoginComponent/StudentMenu";
import StudentProfile from './Components/LoginComponent/StudentProfile'; // Fixed path
import StudentList from "./Components/LoginComponent/StudentList";
import SingleStudentDetails from "./Components/LoginComponent/SingleStuentdetails";
import LostItemSubmit from "./Components/ItemComponent/LostItemSubmit"
import FoundItemSubmit from "./Components/ItemComponent/FoundItemSubmit"
import LostItemReport from "./Components/ItemComponent/LostItemReport"
import FoundItemReport from"./Components/ItemComponent/FoundItemReport"
import StudentLostItemReport from"./Components/ItemComponent/StudentLostItemReport"
import StudentFoundItemReport from"./Components/ItemComponent/StudentFoundItemReport"
import FuzzySearch from "./Components/ItemComponent/FuzzySearch";
import ChatMessage from "./Components/MessageComponent/ChatMessage";
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
        <Route path="/Register" element={<RegisterUser/>}/>
        <Route path="/AdminMenu" element={<AdminMenu/>}/>
        <Route path="/StudentList" element={<StudentList/>}/>

        <Route path="/StudentMenu" element={<StudentMenu/>}/>
        <Route path="/personal" element={<StudentProfile />} /> {/* Use new profile page */}
        {/* Removed duplicate: <Route path="/personal" element={<SingleStudentDetails/>}/> */}
        
        <Route path="/LostItemsubmit" element={<LostItemSubmit/>}/>
        <Route path="/FoundItemSubmit" element={<FoundItemSubmit/>}/>
        <Route path="/LostItemReport" element={<LostItemReport/>}/>
        <Route path="/FoundItemReport" element={<FoundItemReport/>}/>
        <Route path="/studentlostReport" element={<StudentLostItemReport/>}/>
        <Route path="/studentfoundReport" element={<StudentFoundItemReport/>}/>
        <Route path="/fuzzySearch" element={<FuzzySearch/>}/>
        <Route path="/ChatMessage" element={<ChatMessage/>}/>

        </Routes>
     </BrowserRouter>

    </div>
  );
}

export default App;
