import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';

import styles from './styles.module.scss';

const currentDate = format(new Date(), 'EEEEEE, d MMMM', { locale: ptBR });

export const Header = (): JSX.Element => {
  return (
    <header className={styles.container}>
      <img src="/logo.svg" alt="Podcastr" />

      <p>O melhor para você oubir, sempre</p>

      <span>{currentDate}</span>
    </header>
  );
};
