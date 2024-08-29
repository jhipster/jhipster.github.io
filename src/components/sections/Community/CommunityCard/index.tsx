import styles from './styles.module.scss';

type Props = {
  value: string;
  text: string;
  postfix?: string;
};

export default function CommunityCard({ value, text, postfix }: Props) {
  return (
    <div className={styles.card}>
      <h3
        className={styles.cardTitle}
      >{`${value.replace(/^(.*)(.{3})$/, '$1 $2')}${postfix ?? ''}`}</h3>

      <span className={styles.cardDescription}>{text}</span>
    </div>
  );
}
