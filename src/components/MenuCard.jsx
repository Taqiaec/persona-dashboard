import styles from './MenuCard.module.css'

export default function MenuCard({ title, icon, url, hovered, onHover, onLeave, onClick }) {
  const isExternal = url && url.startsWith('http')
  const Tag = onClick ? 'button' : 'a'
  const props = onClick
    ? { onClick }
    : { href: url, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Tag
      className={`${styles.card} ${hovered ? styles.hovered : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      {...props}
    >
      <div className={styles.glitchBar} />
      <div className={styles.iconWrap}>
        {icon}
      </div>
      <div className={styles.textWrap}>
        <span className={styles.title}>{title}</span>
        <span className={styles.arrow}>&#x25B6;</span>
      </div>
      <div className={styles.bottomAccent} />
    </Tag>
  )
}
