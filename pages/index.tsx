import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { Container, List } from '@mantine/core';
import { GetStaticProps } from "next";
import { Prism } from '@mantine/prism';
import fs from 'fs';
import MyButton from '../components/MyButton';

type MyProps = {
  intro_yaml: string,
  sns: Sns[],
};

export interface JsonData {
  sns: Sns[];
  works: Work[];
}

export interface Sns {
  name:  string;
  url:   string;
  icon:  string;
  color: string;
}

export interface Work {
  name: string;
  url:  string;
}

const Home: NextPage<MyProps> = (props: MyProps) => {
  return (
    <>
      <Head>
        <title>turai.work</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container className={styles.container}>
        <span className={styles.title}>turai.work</span>
        <div>
          <Prism language="yaml" noCopy={true} colorScheme='dark'>{props.intro_yaml}</Prism>
        </div>
        
        <List size="xl">
          {props.sns.map(({ name, url, color, icon }) => (
            <div key={name}>
              <MyButton url={url} name={name} color={color} icon={icon}></MyButton>
            </div>
          ))}
        </List>
      </Container>
    </>
  );
};

export const getStaticProps: GetStaticProps<MyProps> = async (context) => {  
  const intro_yaml = fs.readFileSync('./pages/self_introduction.yaml', 'utf8');
  const json: JsonData = JSON.parse(fs.readFileSync('./data/links.json', 'utf8'));
  return {
    props: {
      intro_yaml,
      sns: json.sns,
    },
  };
};

export default Home;
