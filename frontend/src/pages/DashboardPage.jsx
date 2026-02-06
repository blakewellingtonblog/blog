import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/Pages/DashboardPage.module.css';


function DashboardPage() {

    return(
        <div className={styles.page}>
            <h1>Welcome, Blake</h1>
            <div className={styles.goalSection}>
                <h2>North Star Goal</h2>

                <div className={styles.timeline}>

                </div>

            </div>
            <div className={styles.choiceSection}>
                <div>
                    <h2>Reflection</h2>
                    <Link className='button-outline'>Start</Link>
                </div>
                <div>
                    <h2>Master Vision</h2>
                    <Link className='button-outline'>Review</Link>
                </div>
            </div>
            <div className={styles.reflectionSection}>
                <h2>Past Reflections</h2>
                <p>Past reflections</p>
            </div>
            <div className={styles.blogSection}>
                <div className={styles.blogContainer}>
                    <h2>Create New Blog</h2>
                    <Link>Create +</Link>
                </div>
                <div>
                    <p>Past Blogs</p>
                </div>

            </div>
        </div>
    );
}

export default DashboardPage;