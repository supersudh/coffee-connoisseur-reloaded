import Link from 'next/link';
import Image from 'next/image';
import classnames from 'classnames';

import styles from './Card.module.css';

const Card = (props: any) => {
  const {
    href,
    name,
    imgUrl
  } = props;
  return (
    <Link
      className={styles.cardLink}
      href={href}
    >
      <div className={classnames('glass', styles.container)}>
        <div className={styles.cardHeaderWrapper}>
          <h2>{name}</h2>
        </div>
        <div className={styles.cardImageWrapper}>
          <Image
            className={styles.cardImage}
            src={imgUrl}
            alt="Hello World"
            width={260}
            height={160}
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;