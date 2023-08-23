
import { useEffect, useState } from 'react';
import styles from "./app.module.css";
import AppHeader from '../app-header/app-header'
import Main from "../main/main";

function App() {

  const URL = "https://norma.nomoreparties.space/api/ingredients";
  const [ingredientsData, setIngredientsData] = useState([])

  useEffect(
    () => {
      fetch ( `${URL}`, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => {
        return res.json()
      }).then(res => {
        setIngredientsData(res.data)
      }).catch(err => 
        console.log(err)
      )
    }, [])


  return (
   <div className={styles.app}>
    <div className="pb-4 pt-4"> 
      <AppHeader />
      </div>
      <Main ingredientsData={ingredientsData}/>
    </div>
  );
}

export default App;

