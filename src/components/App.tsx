import React, { useState } from "react";
import styles from "./App.module.scss";
import { Link, Outlet } from "react-router-dom";
import AvatarPng from "@/assets/avatar.png";
import AvatarJpg from "@/assets/avatar.jpg";
import Calendar from "@/assets/app-image.svg";


function toddo(){
    console.log('Привет я ваш первый проект!')
}

export const App = () => {

    const [count, setCount] = useState<number>(0);
    const increment = () => setCount(prev => prev + 1);

    toddo();

    return (
        <>
            <div data-testid={'platform'}>
                <img width={100} height={100} src={AvatarPng} alt="" /><br />
                <img width={100} height={100} src={AvatarJpg} alt="" />
            </div>
            <div>
                <Calendar className={styles.icon} />
                <Calendar color={"blue"} width={100} height={100}/>
            </div>
            <Link to={'/about'}>about</Link><br/>
            Hello world!
            <h1>{count}</h1>
            <button className={styles.button} onClick={increment}><span>inc</span></button><br/>
            <Link to={'/shop'}>shop</Link>
            <Outlet />
        </>
    );
};