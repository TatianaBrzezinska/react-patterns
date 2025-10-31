import styles from "./home-work.module.css";

/**
 * Имплементируйте компонент AppClassName
 * Так что бы он добавлял className к элементу
 * который передан в children
 *
 * Не перезаписывайте старый className а добавляйте через clsx
 *
 * Для типизации внутрянки any в помощь)
 */

function AddClassName({
  children,
}: {
  className?: string;
  children: React.ReactElement;
}) {
  return <>{children}</>;
}

export function Layout({
  footer,
  header,
  main,
  sidebar,
}: {
  header: React.ReactElement;
  sidebar: React.ReactElement;
  main: React.ReactElement;
  footer: React.ReactElement;
}) {
  return (
    <div className={styles.layout}>
      <AddClassName className={styles.layoutHeader}>{header}</AddClassName>
      <AddClassName className={styles.layoutSidebar}>{sidebar}</AddClassName>
      <AddClassName className={styles.layoutMain}>{main}</AddClassName>
      <AddClassName className={styles.layoutFooter}>{footer}</AddClassName>
    </div>
  );
}

export function HomeWork() {
  return (
    <Layout
      header={<div className={styles.header}>Header</div>}
      sidebar={<div className={styles.sidebar}>Sidebar</div>}
      main={<div className={styles.main}>Main</div>}
      footer={<div className={styles.footer}>Footer</div>}
    />
  );
}
