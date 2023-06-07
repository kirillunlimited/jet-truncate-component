import {useRef} from 'react';
import Truncator from './Truncator';
import styles from './Table.module.css';

const ROWS = 2000;
const COLS = 2;
const TEXT = 'Lorem ipsum dolor sit amet consectetur adipisicing elit.';

export default function Table() {
  const tBodyRef = useRef<HTMLTableSectionElement>(null);

  return (
    <table className={styles.table}>
      <tbody ref={tBodyRef}>
        {[...Array(ROWS)].map((_, i) => <tr key={i}>
          {[...Array(COLS)].map((_, i) => <td key={i} className={styles.td}>
            <Truncator
              tailLength={Math.floor(Math.random() * 11)}
              title={TEXT}
              className={styles.text}
            >
              {TEXT}
            </Truncator>
          </td>)}
        </tr>)}
      </tbody>
    </table>
  );
}
