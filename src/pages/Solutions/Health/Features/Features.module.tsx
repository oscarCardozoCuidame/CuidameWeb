import styles from './Features.module.css';

interface FeatureData {
  title: string;
  description: string;
}

interface FeaturesProps {
  preventiveHealth: FeatureData;
  monitoring: FeatureData;
  curativeHealth: FeatureData;
  padding_bottom?: string; 
  tryPlatformText: string;
}

const Features: React.FC<FeaturesProps> = ({
  preventiveHealth,
  monitoring,
  curativeHealth,
  padding_bottom,
  tryPlatformText
}) => {
  return (
    <section style={{paddingBottom: padding_bottom}} className={styles.try_grid}>

      <div className={`${styles.div1} ${styles.grid_div}`}>
        <h3 className={styles.title}>{preventiveHealth.title}</h3>
        <p className={styles.paragraph}>
          {preventiveHealth.description}
        </p>
      </div>
      <div className={`${styles.div2} ${styles.grid_div}`}>
        <h3 className={styles.title}>{monitoring.title}</h3>
        <p className={styles.paragraph}>
          {monitoring.description}
        </p>
      </div>
      <div className={`${styles.div3} ${styles.grid_div}`}>
        <h3 className={styles.title}>{curativeHealth.title}</h3>
        <p className={styles.paragraph}>
          {curativeHealth.description}
        </p>
      </div>
      <div className={`${styles.div4} ${styles.grid_div}`}>
        <h3 className={styles.title}>{tryPlatformText}</h3>
      </div>
      
    </section>
  );
};

export default Features;