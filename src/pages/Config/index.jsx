import React, {useState} from 'react';

import styles from './Config.module.scss'
import {Slider} from "@mui/material";

import tarifIcon from "../../assets/img/tarif-icon.svg"

const Index = ( props ) => {
    // процессор
    const marksProcessor = [
        {
            value: 2,
            label: "2" ,
        },
        {
            value: 4,
            label: "" ,
        },
        {
            value: 8,
            label: "8" ,
        },
    ];
    const [procVal, setProcVal] = useState(2);
    const updateRange = (e, data) => {
        setProcVal(data);
    };

    // Память
    const marksMemory = [
        {
            value: 8,
            label: "8" ,
        },
        {
            value: 16,
            label: "16" ,
        },
    ];
    const [memVal, setMemVal] = useState(8);
    const updateMemory = (e, data) => {
        setMemVal(data);
    };

    // Хранилище
    const marksDisk = [
        {
            value: 40,
            label: "40" ,
        },
        {
            value: 80,
            label: "80" ,
        },
    ];
    const [diskVal, setDiskVal] = useState(40);
    const updateDisk = (e, data) => {
        setDiskVal(data);
    };

    // Хранилище
    const marksDay = [
        {
            value: 7,
            label: "7" ,
        },
        {
            value: 14,
            label: "" ,
        },
        {
            value: 30,
            label: "30" ,
        },
    ];
    const [dayVal, setDayVal] = useState(7);
    const updateDay = (e, data) => {
        setDayVal(data);
    };

    const calculate = () => {
        let cpu = procVal
        let memory = memVal
        let storage = diskVal
        let days = dayVal

        let cpuF
        if (cpu === 4) {
            cpuF = 2 * 6.7
        } else if (cpu === 8) {
            cpuF = 6 * 6.7
        } else if (cpu === 2) {
            cpuF = 0
        }

        let memoryF

        if (memory === 16){memoryF = 8 * 5.3}
        else if (memory === 32){memoryF = 24 * 5.3}
        else if (memory === 8){memoryF = 0}

        let storageF
        if (storage === 80){storageF = 40 * 0.34}
        else if (storage === 40){storageF = 0}

        let daysF

        if (days === 14){daysF = 1000 }
        else if (days === 30){daysF = 2000}
        else if (days === 7){daysF = 500}

        let constParametrs = cpuF + memoryF + storageF

        let allPrice

        if ( constParametrs > 0){

            if (days === 7){
                allPrice = daysF + ( 7 * ( cpuF + memoryF + storageF ) )
            } else if (days === 14){
                allPrice = daysF + ( 14 * ( cpuF + memoryF + storageF ) )
            } else if (days === 30){
                allPrice = daysF + ( 30 * ( cpuF + memoryF + storageF ) )
            }
        } else {
            allPrice = daysF
        }
        allPrice = allPrice.toFixed(1)

        return allPrice
    }

    let finalPrice = calculate() + ' Р'



    // state для готового тарифа

    const [activeTarif, setActiveTarif] = useState(0)

    const priceTarif = [500, 1000, 2000]

    return (
        <div className={' i_cont'}>
            <div className="head_i">
                <div className="left_potr">
                    <div className="img_wrap">
                        <img src="img/config.svg" alt="" />
                    </div>
                    <div className="title">
                        Конфигуратор
                    </div>
                </div>
            </div>
            <div className={styles.config}>
                <div className={styles.left}>
                    <div className={styles.config__item}>
                        <h4 className={styles.config__title}>
                            Процессор
                        </h4>
                        <Slider
                            size="small"
                            defaultValue={2}
                            aria-label="Small"
                            min={2}
                            step={null}
                            max={8}
                            value={procVal}
                            onChange={updateRange}
                            marks={marksProcessor}
                        />
                        <div className={styles.config__info}>
                            <span className={styles.config__value}>
                                {procVal}
                            </span>
                            <span className={styles.config__label}>
                                Core
                            </span>
                        </div>
                    </div>
                    <div className={styles.config__item}>
                        <h4 className={styles.config__title}>
                            Память
                        </h4>
                        <Slider
                            size="small"
                            defaultValue={8}
                            aria-label="Small"
                            min={8}
                            max={16}
                            value={memVal}
                            step={8}
                            onChange={updateMemory}
                            marks={marksMemory}
                        />
                        <div className={styles.config__info}>
                            <span className={styles.config__value}>
                                {memVal}
                            </span>
                            <span className={styles.config__label}>
                                Core
                            </span>
                        </div>
                    </div>
                    <div className={styles.config__item}>
                        <h4 className={styles.config__title}>
                            Хранилище
                        </h4>
                        <Slider
                            size="small"
                            defaultValue={40}
                            aria-label="Small"
                            min={40}
                            max={80}
                            step={40}
                            value={diskVal}
                            onChange={updateDisk}
                            marks={marksDisk}
                        />
                        <div className={styles.config__info}>
                            <span className={styles.config__value}>
                                {diskVal}
                            </span>
                            <span className={styles.config__label}>
                                ГБNVMe
                            </span>
                        </div>
                    </div>
                    <div className={styles.config__item}>
                        <h4 className={styles.config__title}>
                            Кол-во дней
                        </h4>
                        <Slider
                            size="small"
                            defaultValue={7}
                            aria-label="Small"
                            min={7}
                            step={null}
                            max={30}
                            value={dayVal}
                            onChange={updateDay}
                            marks={marksDay}
                        />
                        <div className={styles.config__info}>
                            <span className={styles.config__value}>
                                {dayVal}
                            </span>
                            <span className={styles.config__label}>
                                дней
                            </span>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <h3 className={styles.right__title}>
                        Итого:
                    </h3>
                    <div className={styles.right__item}>
                        <span className={styles.right__itemLabel}>
                            Процессор
                        </span>
                        <span className={styles.right__itemValue}>
                            {procVal} Core
                        </span>
                    </div>
                    <div className={styles.right__item}>
                        <span className={styles.right__itemLabel}>
                            Память
                        </span>
                        <span className={styles.right__itemValue}>
                            {memVal} ГБ/RAM
                        </span>
                    </div>
                    <div className={styles.right__item}>
                        <span className={styles.right__itemLabel}>
                            Хранилище
                        </span>
                        <span className={styles.right__itemValue}>
                            {diskVal} ГБNVMe
                        </span>
                    </div>
                    <div className={styles.right__item}>
                        <span className={styles.right__itemLabel}>
                            Дней
                        </span>
                        <span className={styles.right__itemValue}>
                            {dayVal} Дней
                        </span>
                    </div>
                    <div className={styles.right__bottom}>
                        <span className={styles.right__bottomTitle}>
                            В месяц:
                            <input type="text" className={styles.finalValue} value={finalPrice}/>
                        </span>
                        <button className={styles.right__btn} onClick={() => props.setPayModal(true)}>
                            купить
                        </button>
                    </div>
                </div>
            </div>
            <div className="head_i">
                <div className="left_potr">
                    <div className="img_wrap">
                        <img src="img/tarif.svg" alt="" />
                    </div>
                    <div className="title">
                        Готовый тариф
                    </div>
                </div>
            </div>
            <div className={styles.tarif}>
                <div className={styles.tarif__left}>
                    <h3 className={styles.tarif__title}>
                        Готовый тариф
                    </h3>
                    <div className={styles.tarif__wrapper}>
                        <i className={styles.tarifIcon}>
                            <img src={tarifIcon} alt=""/>
                        </i>
                        <p className={styles.tarif__txt}>
                            Готовый тариф для вашего удобства. Также вы можете создать свой при помощи конфигуратора под ваши задачи.
                        </p>
                    </div>
                    <div className={styles.tarif__wrapper}>
                        <i className={styles.tarifIcon}>
                            <img src={tarifIcon} alt=""/>
                        </i>
                        <p className={styles.tarif__txt}>
                            *Скорость порта подключения к сети интернет - 1000 Мбит/сек.
                        </p>
                    </div>
                </div>
                <div className={styles.tarif__right}>
                    <h3 className={styles.tarif__title}>
                        Кол-во дней:
                    </h3>
                    <div className={styles.tarifSelect}>
                        <button
                            className={activeTarif === 0 ? styles.tarifSelect__item + ' ' + styles.tarifSelect__itemActive : styles.tarifSelect__item}
                            onClick={() => setActiveTarif(0)}
                        >
                            7
                        </button>
                        <button
                            className={activeTarif === 1 ? styles.tarifSelect__item + ' ' + styles.tarifSelect__itemActive : styles.tarifSelect__item}
                            onClick={() => setActiveTarif(1)}
                        >
                            14
                        </button>
                        <button
                            className={activeTarif === 2 ? styles.tarifSelect__item + ' ' + styles.tarifSelect__itemActive : styles.tarifSelect__item}
                            onClick={() => setActiveTarif(2)}
                        >
                            30
                        </button>
                    </div>
                    <div className={styles.tarifInfo}>
                        <div className={styles.tarifInfo__item}>
                            <span className={styles.tarifInfo__label}>
                                RAM
                            </span>
                            <span className={styles.tarifInfo__value}>
                                6 GB
                            </span>
                        </div>
                        <div className={styles.tarifInfo__item}>
                            <span className={styles.tarifInfo__label}>
                                CPU Cores
                            </span>
                            <span className={styles.tarifInfo__value}>
                                2
                            </span>
                        </div>
                        <div className={styles.tarifInfo__item}>
                            <span className={styles.tarifInfo__label}>
                                SSD Space
                            </span>
                            <span className={styles.tarifInfo__value}>
                                30 GB
                            </span>
                        </div>
                        <div className={styles.tarifInfo__item}>
                            <span className={styles.tarifInfo__label}>
                                Bandwidth
                            </span>
                            <span className={styles.tarifInfo__value}>
                                1 TB
                            </span>
                        </div>
                    </div>
                    <div className={styles.tarifInfo__bottom}>
                        <p className={styles.tarifInfo__price}>
                            {priceTarif[activeTarif]} Р
                        </p>
                        <button className={styles.right__btn} onClick={() => props.setPayModal(true)}>
                            купить
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Index;