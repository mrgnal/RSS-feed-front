import { ReactNode } from "react";
import Navbar from "@/app/components/landing/navbar/navbar"
import styles from "@/app/pages/main/layout.module.css";

interface LayoutProps {
  children: ReactNode;
}
const Layout: React.FC<LayoutProps> = ({ children }) => {

  return (

    <div className={styles.flex} >
      <div className={styles.main}>
        
        
        {children}
      </div>
    </div>
  );
};

export default Layout;