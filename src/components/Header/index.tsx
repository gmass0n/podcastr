/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';

import styles from './styles.module.scss';

const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

export const Header = (): JSX.Element => {
  return (
    <header className={styles.container}>
      <Link href="/">
        <a>
          <img src="/logo.svg" alt="Podcastr" />
        </a>
      </Link>

      <p>O melhor para você oubir, sempre</p>

      <span>{currentDate}</span>
    </header>
  );
};
