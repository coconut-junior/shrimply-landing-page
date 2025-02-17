export default function CardLogos({ darkMode }: any) {
  const bg = darkMode
    ? './5_Card_White_horizontal.svg'
    : './5_Card_CUP_color_horizontal.svg';
  return (
    <>
      <div className="break-column"></div>
      <div
        style={{
          height: 64,
          width: 250,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundImage: `url("${bg}")`,
          filter: 'blur(0.5px)',
          flexBasis: 'column wrap',
        }}
      ></div>
    </>
  );
}
