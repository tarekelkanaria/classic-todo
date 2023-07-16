import classes from "./MainHeader.module.css";
const MainHeader = () => {
  return (
    <header className={classes["main-header"]}>
      <h1 className={classes.title}>Todo Manager</h1>
    </header>
  );
};

export default MainHeader;
