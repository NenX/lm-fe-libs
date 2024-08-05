import { get } from 'lodash';
import styles from './index.less';
interface IProps {
  [key: string]: any;
}
export default function BorderTitle({ config, ...props }: IProps) {
  const specialConfig = get(config, 'specialConfig') ?? safe_json_parse(get(config, 'special_config'));
  return (
    <div className={styles["border-title-content"]}>
      <div className={styles["border"]}></div>
      <span className={styles["span"]}>{get(specialConfig, 'label')}</span>
    </div>
  );
}
