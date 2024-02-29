import Header from "../header/Header";
import styles from "./DefaultLayout.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function DefaultLayout({children}) {
    return (
        <div className={cx("wrapper")}>
            <div className={cx("header")}>
            <Header></Header>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}