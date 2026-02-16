import Image from "next/image";

export function HeroImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Licensed electrician working on an electrical panel"
      width={1600}
      height={900}
      priority
    />
  );
}
