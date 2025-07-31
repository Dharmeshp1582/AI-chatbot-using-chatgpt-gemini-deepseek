import styles from "./loader.module.css";

export function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#f3f3f3] opacity-60 dark:bg-[#171717] dark:opacity-85">
      <svg
        className={styles.pl}
        viewBox="0 0 240 240"
        fill="none"
        strokeWidth="20"
        strokeLinecap="round"
      >
        <circle
          className={`${styles.pl__ring} ${styles["pl__ring--a"]}`}
          cx="120"
          cy="120"
          r="100"
        />
        <circle
          className={`${styles.pl__ring} ${styles["pl__ring--b"]}`}
          cx="120"
          cy="120"
          r="70"
        />
        <circle
          className={`${styles.pl__ring} ${styles["pl__ring--c"]}`}
          cx="120"
          cy="120"
          r="50"
        />
        <circle
          className={`${styles.pl__ring} ${styles["pl__ring--d"]}`}
          cx="120"
          cy="120"
          r="30"
        />
      </svg>
    </div>
  );
}
