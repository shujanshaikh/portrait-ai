import Image, { type ImageProps } from "next/image";
import styles from "./page.module.css";
import { Button } from "@/components/ui/button"
import { HeroBar } from "@/components/HeroBar";



export default function Home() {
  return (
    <HeroBar />

  );
}
