import { Inter } from 'next/font/google'
import { useRouter } from 'next/router';
import styles from '@/styles/Home.module.css'
import Userlayout from '@/layouts/userlayouts/index.jsx';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const router=useRouter();
  return (
    <Userlayout>
    <main className={inter.className}>
    <div className={styles.container}>
      <div className={styles.maincontainer}>
        <div className={styles.maincontainer_left}>
          <p>Connect with Friends without Exaggeration </p>
          <p>A true social media platform ,with stories no blufs!</p>
          <div className={styles.buttonjoin} onClick={()=>{
            router.push("/login")
          }}>
            <p>Join Now</p>
          </div>
          
        </div>
        <div className={styles.maincontainer_right}>
          <img src="images/final1.jpg" alt="" />

        </div>
      </div>
    </div>
   
       
     </main>
    </Userlayout>
  )
}
