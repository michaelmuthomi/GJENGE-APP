import LightDutyPaverIMG from "~/assets/images/LightDutyPaver.png";
import MediumDutyPaverIMG from "~/assets/images/medium_duty_paver.png";
import HeavyDutyPaverIMG from "~/assets/images/HeavyDutyPaver.png";

export const Products = [
  {
    id: 1,
    imageSrc: LightDutyPaverIMG,
    title: "LIGHT DUTY",
    details:
      "Best for Household Compounds Light & Strong, carries loads up to 100 N/mm2 or 82 metric tonnes",
    price: 1208,
    bgcolor: "#111111",
    additionalInfo: [
      "Best for household compounds.",
      "Light and strong carries up to 100 N/mm2 or 82 metric tonnes.",
      "It is 35 - 40 mm thick.",
      "Comes in different colors.",
      "Two times stronger than an ordinary concrete block.",
    ],
  },
  {
    id: 2,
    imageSrc: MediumDutyPaverIMG,
    title: "Medium DUTY",
    details:
      "Best for Commercial Premises Carries loads up to 140 N/mm2 or 115 metric tonnes",
    price: 1398,
    bgcolor: "#111111",
    additionalInfo: [
      "Best for commercial premises.",
      "Carries loads up to 140 N/mm2 or 115 metric tonnes.",
      "It is 40 - 45 mm thick.",
      "Comes in different colors.",
      "Two times stronger than an ordinary concrete block.",
    ],
  },
  {
    id: 3,
    imageSrc: HeavyDutyPaverIMG,
    title: "Heavy DUTY",
    details:
      "Best for Roads, operation areas of Heavy Machinery Carries loads up to 200 N/mm2 or 164 metric tonnes",
    price: 1780,
    bgcolor: "#111111",
  additionalInfo: [
    "Best for roads, operation areas of heavy machinery.",
    "Carries loads up to 200 N/mm2 or 164 metric tonnes.",
    "It is 55 - 60 mm thick.",
    "Comes in different colors.",
    "Two times stronger than an ordinary concrete block.",
  ],
  },
];
