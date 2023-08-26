import { useEffect } from "react";
import styles from "./app.module.css";
import AppHeader from "../app-header/app-header";
import Main from "../main/main";
import { useDispatch } from "react-redux";
import { getIngredients } from "../../services/actions/ingredent";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <div className="pb-4 pt-4">
        <AppHeader />
      </div>
      <Main />
    </div>
  );
}

export default App;
