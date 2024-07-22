import Image from "next/image";

interface Dimension {

  width: number,
  height: number

}

const TeamLogo = ({ width, height }: Dimension) => {
  
  return (
    
    <Image 
    src='/teamLogo/DublancLogo.png' 
    alt="Team Logo"
    layout="intrinsic"
    width={width}
    height={height}
    />
  );
}

export default TeamLogo;