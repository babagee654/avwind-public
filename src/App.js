import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import Commercial from './routes/Commercial';
import Military from './routes/Military';
import Home from './routes/Home';
import CompanyInfo from './routes/CompanyInfo';
import Contact from './routes/Contact';
import Login from './routes/Login';
import Dashboard from './routes/Dashboard';
import AppContainer from './components/AppContainer';
import useToken from './hooks/useToken';



export default function App() {

  const { token, saveToken } = useToken();

  /**
   * 
   * Home : Banner Text
   * Capabilities : body text, pdfs
   * Company info: text for each
   * Contact us: body text
   * 
   */

  React.useEffect(() => {
    async function getDashboard() {
      try {
        const res = await fetch("http://localhost:9000/dashboardData")
        const data = await res.json()
        setPageData(data)

      } catch (error) {
        console.log("Unable to fetch page data")
      }
    }
    getDashboard();
  }, [])

  const [pageData, setPageData] = React.useState([])
  let content = pageData.map(element => element?.Body_Content)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Home Body_Content={content[0]} />} />
          <Route path="/commercial" element={<Commercial Body_Content={content[1]} />} />
          <Route path="/military" element={<Military Body_Content={content[2]} />} />
          <Route path="/company-info" element={<CompanyInfo />} />
          <Route path="/contact" element={<Contact Body_Content={content[3]} />} />
          {/* <Route path="/contact/:location" element={<Contact />} /> */}
          <Route path="/login" element={<Login saveToken={saveToken} />} />
          <Route path="/dashboard" element={<Dashboard LoggedIn={token} />} />
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                <p>Unable to find page. <a href='/'>Click here to return to safety!</a></p>
              </main>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}