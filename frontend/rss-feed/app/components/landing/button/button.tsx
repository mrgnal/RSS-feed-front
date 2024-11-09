import React from "react";
import Link from "next/link";
import styles from "./button.module.css";

interface GetStartedButtonProps {
  href: string;
}

const GetStartedButton: React.FC<GetStartedButtonProps> = ({ href }) => {
  return (
    <Link href={href} passHref>
      <button className={styles.button}>Get started</button>
    </Link>
  );
};

export default GetStartedButton;
