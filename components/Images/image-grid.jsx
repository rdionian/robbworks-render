"use client";
import styles from "./image-grid.module.css";

export default function ImageGrid({ images }) {
  return (
    <section className={styles.imageGridSection}>
      <h2 className={styles.title}>Visual Highlights</h2>
      <div className={styles.grid}>
        {images.map((src, i) => (
          <img key={i} src={src} alt={`Highlight ${i + 1}`} className={styles.image} />
        ))}
      </div>
    </section>
  );
}

