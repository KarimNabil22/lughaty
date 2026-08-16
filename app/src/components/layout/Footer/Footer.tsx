import styles from './Footer.module.css'

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={styles.logo}>لغتي</div>
        <p>© 2026 لغتي · نسخة تجريبية للعرض</p>
      </div>
    </footer>
  )
}

export default Footer
