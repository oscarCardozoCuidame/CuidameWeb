import styles from "./Home.layout.module.css";
import Header from "../../components/common/Header/Header";
import HomeMain from "../../pages/Home/Home";
import Footer from "../../components/common/Footer/Footer";

const MarketLayout: React.FC = () => {
  return (
    <div className={styles.home_layout}>
      <Header className={styles.header} />

      <HomeMain />

      <Footer className={styles.footer} />
    </div>
  );
};

export default MarketLayout;
