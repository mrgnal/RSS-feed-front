'use client'

import React from "react";
import Image from 'next/image';
import styles from "@/app/components/Auth/waitRestore/waitRestore.module.css";


export default function WaitRestore(){
    return(
        <div>
            <div className={styles.restoreWrapper}>
                <Image
                    src="/waitRestore-icon.svg" 
                    alt="Wait Restore icon"
                    className={styles.restoreIcon} 
                    width={80}
                    height={80}
                />
                <h1 className={styles.h1}>Check your email</h1>
                <h2 className={styles.h2}>An email with the link to reset your password has been sent to your inbox.</h2>
            </div>
        </div>
    );
}