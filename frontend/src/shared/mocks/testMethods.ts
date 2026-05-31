import type { TestMethod } from "../../features/application/model/types";

export const TEST_METHODS: TestMethod[] = [
  {
    id: "1",

    name: "Растяжение",
    standard: "ASTM D3039",

    supportsModulus: true,

    testTemperatureMin: -60,
    testTemperatureMax: 350,

    modulusTemperatureMin: -60,
    modulusTemperatureMax: 150,
  },

  {
    id: "2",

    name: "Растяжение",
    standard: "ГОСТ Р 56785-2015",

    supportsModulus: true,

    testTemperatureMin: -60,
    testTemperatureMax: 350,

    modulusTemperatureMin: -60,
    modulusTemperatureMax: 150,
  },
  {
    id: "3",

    name: "Сжатие",
    standard: "ГОСТ Р 56812-2015",

    supportsModulus: true,

    testTemperatureMin: -60,
    testTemperatureMax: 300,

    modulusTemperatureMin: -60,
    modulusTemperatureMax: 150,
  },
  {
    id: "4",

    name: "Межслойный сдвиг",
    standard: "ГОСТ Р 57745-2017",

    supportsModulus: false,

    testTemperatureMin: -60,
    testTemperatureMax: 300,
  },
  {
    id: "5",

    name: "Межслойный сдвиг",
    standard: "ГОСТ Р 32659-2014",

    supportsModulus: false,

    testTemperatureMin: -60,
    testTemperatureMax: 300,
  },
  {
    id: "6",

    name: "Межслойный сдвиг",
    standard: "ASTM D2344",

    supportsModulus: false,

    testTemperatureMin: -60,
    testTemperatureMax: 300,
  },
];
