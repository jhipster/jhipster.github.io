import Link from '@docusaurus/Link';
import { HiOutlineUser } from 'react-icons/hi2';

import styles from './styles.module.scss';

import { books } from './data';

export default function Books() {
  return (
    <section className={styles.section}>
      <ul className={styles.sectionList}>
        {books.map((book, idx) => (
          <li key={`book-${idx}`}>
            <div className={styles.card}>
              <img
                className={styles.cardImage}
                src={book.image}
                alt={book.title}
                width={400}
                height={500}
              />

              <div className={styles.cardBody}>
                <h3>{book.title}</h3>
                <small className={styles.cardAuthor}>
                  <HiOutlineUser />
                  {book.authors.join(', ')}
                </small>

                <p className={styles.cardDescription}>{book.description}</p>

                <ul className={styles.cardLinks}>
                  {book.links.map((link, idx) => {
                    return (
                      <li key={`book-link-${idx}`}>
                        <Link
                          className="button button--secondary"
                          href={link.href}
                        >
                          Buy now on {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
