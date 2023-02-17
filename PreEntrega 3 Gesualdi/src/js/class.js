import { addIva } from "./functions.js";

class Product {
  constructor(input) {
    this.category = input.category;
    this.price = parseFloat(addIva(input.price).toFixed(2));
    this.series = input.series;
    this.img = input.img;
    this.brand = input.brand;
    this.name = input.name;
  }
}

class GraphicCard extends Product {
  constructor(input) {
    super(input);
    this.pci = input.pci;
    this.chipsetManufacturer = input.chipsetManufacturer;
    this.gpuSeries = input.gpuSeries;
    this.gpu = input.gpu;
    this.coreClock = input.coreClock;
    this.boostClock = input.boostClock;
    this.cudaCores = input.cudaCores;
    this.streamProcessors = input.streamProcessors;
    this.effectiveMc = input.effectiveMc;
    this.memorySize = input.memorySize;
    this.memoryInterface = input.memoryInterface;
    this.memoryType = input.memoryType;
    this.directX = input.directX;
    this.openGL = input.openGL;
    this.multiMonitor = input.multiMonitor;
    this.hdmi = input.hdmi;
    this.displayPort = input.displayPort;
    this.dvi = input.dvi;
    this.resolution = input.resolution;
    this.sli = input.sli;
    this.cooler = input.cooler;
    this.tdp = input.tdp;
    this.psuRecWattage = input.psuRecWattage;
    this.connector = input.connector;
    this.lowProfile = input.lowProfile;
    this.dimensions = input.dimensions;
  }
}

class Processor extends Product {
  constructor(input) {
    super(input);
    this.type = input.type;
    this.series = input.series;
    this.name = input.name;
    this.model = input.model;
    this.socket = input.socket;
    this.coreName = input.coreName;
    this.cores = input.cores;
    this.threads = input.threads;
    this.opFrecuency = input;
    this.maxFrecuency = input.maxFrecuency;
    this.intelTurboBoostTech = input.intelTurboBoostTech;
    this.l1Cache = input.l1Cache;
    this.l2Cache = input.l2Cache;
    this.l3Cache = input.l3Cache;
    this.manufacturingTech = input.manufacturingTech;
    this.sup64Bit = input.sup64Bit;
    this.hyperThreadingSp = input.hyperThreadingSp;
    this.memType = input.memType;
    this.memChannel = input.memChannel;
    this.maxMemSize = input.maxMemSize;
    this.eccMem = input.eccMem;
    this.integratedGraphics = input.integratedGraphics;
    this.pciExpressRevision = input.pciExpressRevision;
    this.tdp = input.tdp;
    this.windows11 = input.windows11;
  }
}

class RapidAccessMemory extends Product {
  constructor(input) {
    super(input);
    this.model = input.model;
    this.capacity = input.capacity;
    this.ddr = input.ddr;
    this.type = input.type;
    this.speed = input.speed;
    this.casLatency = input.casLatency;
    this.timing = input.timing;
    this.voltage = input.voltage;
    this.ecc = input.ecc;
    this.bufferedRegistered = input.bufferedRegistered;
    this.chipset = input.chipset;
    this.color = input.color;
    this.heatSpreader = input.heatSpreader;
  }
}

class ComputerCases extends Product {
  constructor(input) {
    super(input);
    this.brand = input.brand;
    this.model = input.model;
    this.maxFormat = input.maxFormat;
    this.cooler = input.cooler;
    this.led = input.led;
    this.temperedGlass = input.temperedGlass;
  }
}

export { Product, GraphicCard, Processor, RapidAccessMemory, ComputerCases };
