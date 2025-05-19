import Image from 'next/image';

export function InsyteLogo({className}: {className?: string}) {
  return (
    <div className={className} style={{ position: "relative" }}>
      <Image
        src="/assets/logo-transparent.png"
        alt="Logo"
        width={100}
        height={100}
      />
    </div>
  );
}

export function InsyteLogoWithName({className}: {className?: string}) {
  return (
    <div className={className} style={{ position: "relative" }}>
      <Image
        src="/assets/logo-with-name-transparent.png"
        alt="Logo"
        width={500}
        height={500}
      />
    </div>
  );
}
