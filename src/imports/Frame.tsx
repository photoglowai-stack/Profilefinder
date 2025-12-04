import svgPaths from "./svg-osb8kvu2n8";
import imgMan from "figma:asset/a09286d16cb2e61dcf74ec8ac8654c045da214eb.png";
import imgWoman from "figma:asset/8efef5880f89d6834ee5c2665d6e6809b1da0c14.png";

function Heading() {
  return (
    <div className="absolute box-border content-stretch flex items-start justify-center left-0 pb-[16px] pt-0 px-0 right-0 top-[19.67px]" data-name="Heading 4">
      <div className="flex flex-col font-['Inter_Tight:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#020817] text-[36px] text-center text-nowrap">
        <p className="leading-[40px] whitespace-pre">Qui recherchez-vous ?</p>
      </div>
    </div>
  );
}

function Man() {
  return (
    <div className="absolute bottom-[39.67px] h-[180.53px] left-1/2 translate-x-[-50%] w-[170.67px]" data-name="man">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgMan} />
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="absolute bg-[#ff4e71] bottom-[3.67px] content-stretch flex h-[60px] items-center justify-center left-[2.59%] right-[2.59%] rounded-bl-[15px] rounded-br-[15px]" data-name="Background">
      <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-center text-nowrap text-white">
        <p className="leading-[32px] whitespace-pre">Homme</p>
      </div>
    </div>
  );
}

function Border() {
  return (
    <div className="relative rounded-[20px] shrink-0 size-[180px]" data-name="Border">
      <div aria-hidden="true" className="absolute border-4 border-green-500 border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Man />
      <Background />
    </div>
  );
}

function Woman() {
  return (
    <div className="absolute bottom-[39.66px] left-1/2 size-[170.67px] translate-x-[-50%]" data-name="woman">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <img alt="" className="absolute left-0 max-w-none size-full top-0" src={imgWoman} />
      </div>
    </div>
  );
}

function Background1() {
  return (
    <div className="absolute bg-[#dddddd] bottom-[3.67px] content-stretch flex h-[60px] items-center justify-center left-[2.59%] right-[2.59%] rounded-bl-[15px] rounded-br-[15px]" data-name="Background">
      <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[24px] text-black text-center text-nowrap">
        <p className="leading-[32px] whitespace-pre">Femme</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-white relative rounded-[20px] shrink-0 size-[180px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-4 border-slate-200 border-solid inset-0 pointer-events-none rounded-[20px]" />
      <Woman />
      <Background1 />
    </div>
  );
}

function Container() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="box-border content-stretch flex gap-[24px] items-start justify-center px-[64px] py-0 relative w-full">
          <Border />
          <BackgroundBorder />
        </div>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="box-border content-stretch flex flex-col items-center pb-[4px] pt-0 px-0 relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[30px] text-center text-nowrap text-slate-50">
        <p className="leading-[36px] whitespace-pre">Lancer la recherche</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter_Tight:ExtraLight',sans-serif] font-extralight justify-center leading-[0] relative shrink-0 text-[12px] text-center text-nowrap text-slate-50">
        <p className="leading-[16px] whitespace-pre">️ Obtenez votre réponse en 2 min</p>
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <Container1 />
      <Container2 />
    </div>
  );
}

function Component() {
  return (
    <div className="absolute right-[12px] size-[40px] top-1/2 translate-y-[-50%]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Component 1">
          <path d={svgPaths.p6a7c500} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
          <path d="M3.33333 20H36.6667" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.33333" />
        </g>
      </svg>
    </div>
  );
}

function Container4() {
  return (
    <div className="absolute content-stretch flex flex-col items-center right-[-16px] top-[32px]" data-name="Container">
      <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] not-italic relative shrink-0 text-[48px] text-center text-nowrap text-slate-50">
        <p className="leading-[48px] whitespace-pre">👆</p>
      </div>
    </div>
  );
}

function Component1() {
  return (
    <div className="bg-black box-border content-stretch flex items-center justify-center px-[72px] py-[8px] relative rounded-[9999px] shrink-0" data-name="Component 2">
      <Container3 />
      <Component />
      <Container4 />
    </div>
  );
}

function Container5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-row justify-center size-full">
        <div className="box-border content-stretch flex items-start justify-center px-[24px] py-0 relative w-full">
          <Component1 />
        </div>
      </div>
    </div>
  );
}

function Form() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] items-start left-0 right-0 top-[108px]" data-name="Form">
      <Container />
      <Container5 />
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Inter_Tight:Light',sans-serif] font-light justify-center leading-[0] relative shrink-0 text-[#020817] text-[14px] text-center w-full">
        <p className="leading-[20px]">{`1031 personnes ont trouvé des réponses aujourd'hui.`}</p>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component 1">
          <path d={svgPaths.p3f3d8e00} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container7() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0" data-name="Container">
      <Component2 />
      <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Confidentialité</p>
      </div>
    </div>
  );
}

function Component3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component 1">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 6V12L16 14" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0" data-name="Container">
      <Component3 />
      <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Résultats instantanés</p>
      </div>
    </div>
  );
}

function Component4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Component 1">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Component 1">
          <path d={svgPaths.pace200} id="Vector" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 12L11 14L15 10" id="Vector_2" stroke="var(--stroke-0, white)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative self-stretch shrink-0" data-name="Container">
      <Component4 />
      <div className="flex flex-col font-['Inter_Tight:SemiBold',sans-serif] font-semibold justify-center leading-[0] relative shrink-0 text-[12px] text-nowrap text-white">
        <p className="leading-[16px] whitespace-pre">Précision de 99%</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#f10c1a] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row justify-center size-full">
        <div className="box-border content-stretch flex flex-wrap gap-[16px] items-start justify-center px-[16px] py-[4px] relative w-full">
          <Container7 />
          <Container8 />
          <Container9 />
        </div>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Margin">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col items-start px-[22.094px] py-0 relative w-full">
          <Background2 />
        </div>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="absolute box-border content-stretch flex flex-col gap-[12px] items-start left-0 pb-0 pt-[8px] px-[16px] right-0 top-[376px]" data-name="Container">
      <Container6 />
      <Margin />
    </div>
  );
}

export default function Frame() {
  return (
    <div className="bg-white relative rounded-[30px] shadow-[0px_3px_8px_0px_rgba(0,0,0,0.24)] size-full" data-name="Frame">
      <Heading />
      <Form />
      <Container10 />
    </div>
  );
}