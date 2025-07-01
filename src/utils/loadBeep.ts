import gravitational_beep from "../assets/audios/gravitational_beep.mp3";

export const loadBeep = () => {
  const audio = new Audio(gravitational_beep);
  audio.load();

  return () => {
    audio.currentTime = 0;
    audio.play().catch((error) => console.log("Erro ao tocar audio", error));
  };
};
