"use client";

import React from 'react';
// import Link from 'next/link';
// import { motion } from 'framer-motion';
import styles from "./style.module.css";
import StripesBackground from "@/components/ui/StripesBackground";

export const HeroSection = () => {
  return (
    <main className={styles.container}>
      <StripesBackground position="full" opacity={0.25} /> {/* Full opacity of stripes*/}

      {/* Grid Lines Overlay */}
      {/* <div className={styles.gridOverlay}>
        {[...Array(12)].map((_, i) => (
          <div key={i} className={styles.gridLine}></div>
        ))}
      </div> */}

      <div className={styles.layout}>
        <div className={styles.sectionTop}>
          <div className={styles.indicatorCell}>
            <div className={styles.statusWrap}>
              <span className={styles.statusDot}></span>
              <span className={styles.statusText}>Available for work</span>
            </div>
          </div>
        </div>

        <div className={styles.sectionMain}>
          <h1 className={styles.firstName}>SUMIT</h1>
          <h1 className={styles.lastName}>PATEL</h1>
        </div>

        <div className={styles.sectionBottom}>
          <div className={styles.taglineCell}>
            <p className={styles.roleLabel}>AI ENGINEER × FULL-STACK DEV</p>
            <p className={styles.tagline}>
              AI engineer by major. Full-stack developer by necessity. <br />Builder by choice.
            </p>
          </div>
          <div className={styles.actionsCell}>
            <button className={`${styles.btn} ${styles.primary}`}>Get in touch</button>
            <button className={`${styles.btn} ${styles.secondary}`}>Explore Archive</button>
          </div>
        </div>
      </div>
    </main>
  
  );
};
