import { set, get } from 'lodash';
import { getLineArea } from '../../func';

export const bpdData = {
  bottomLine: [
    { x: 9, y: 39.6 },
    { x: 10, y: 42.6 },
    { x: 11, y: 45.6 },
    { x: 12, y: 48.6 },
    { x: 13, y: 51.6 },
    { x: 14, y: 54.7 },
    { x: 15, y: 57.7 },
    { x: 16, y: 60.6 },
    { x: 17, y: 63.5 },
    { x: 18, y: 66.3 },
    { x: 19, y: 69.0 },
    { x: 20, y: 71.5 },
    { x: 21, y: 73.9 },
    { x: 22, y: 76.2 },
    { x: 23, y: 78.3 },
    { x: 24, y: 80.2 },
    { x: 25, y: 81.9 },
    { x: 26, y: 83.5 },
    { x: 27, y: 84.8 },
    { x: 28, y: 86 },
    { x: 29, y: 87 },
    { x: 30, y: 87.7 },
  ],
  middleLine: [
    { x: 9, y: 43.1 },
    { x: 10, y: 46.1 },
    { x: 11, y: 49.2 },
    { x: 12, y: 52.3 },
    { x: 13, y: 55.5 },
    { x: 14, y: 58.6 },
    { x: 15, y: 61.7 },
    { x: 16, y: 64.7 },
    { x: 17, y: 67.7 },
    { x: 18, y: 70.6 },
    { x: 19, y: 73.3 },
    { x: 20, y: 76.0 },
    { x: 21, y: 78.5 },
    { x: 22, y: 80.8 },
    { x: 23, y: 83.0 },
    { x: 24, y: 85.0 },
    { x: 25, y: 86.8 },
    { x: 26, y: 88.5 },
    { x: 27, y: 89.9 },
    { x: 28, y: 91.1 },
    { x: 29, y: 92.1 },
    { x: 30, y: 93.0 },
  ],
  topLine: [
    { x: 9, y: 46.8 },
    { x: 10, y: 49.9 },
    { x: 11, y: 53.1 },
    { x: 12, y: 56.4 },
    { x: 13, y: 59.6 },
    { x: 14, y: 62.8 },
    { x: 15, y: 66.0 },
    { x: 16, y: 69.1 },
    { x: 17, y: 72.2 },
    { x: 18, y: 75.1 },
    { x: 19, y: 78.0 },
    { x: 20, y: 80.7 },
    { x: 21, y: 83.3 },
    { x: 22, y: 85.7 },
    { x: 23, y: 88.0 },
    { x: 24, y: 90.1 },
    { x: 25, y: 92.0 },
    { x: 26, y: 93.7 },
    { x: 27, y: 95.3 },
    { x: 28, y: 96.6 },
    { x: 29, y: 97.7 },
    { x: 30, y: 98.6 },
  ],
};
set(bpdData, 'lineArea', getLineArea(get(bpdData, 'bottomLine'), get(bpdData, 'topLine')));

export const flData = {
  bottomLine: [
    { x: 0, y: 1.8 },
    { x: 1, y: 3.2 },
    { x: 2, y: 5.1 },
    { x: 3, y: 7.6 },
    { x: 4, y: 10.5 },
    { x: 5, y: 13.6 },
    { x: 6, y: 16.8 },
    { x: 7, y: 19.8 },
    { x: 8, y: 22.6 },
    { x: 9, y: 25.3 },
    { x: 10, y: 28.0 },
    { x: 11, y: 30.7 },
    { x: 12, y: 33.4 },
    { x: 13, y: 36.0 },
    { x: 14, y: 38.6 },
    { x: 15, y: 41.0 },
    { x: 16, y: 43.4 },
    { x: 17, y: 45.7 },
    { x: 18, y: 47.8 },
    { x: 19, y: 49.9 },
    { x: 20, y: 51.9 },
    { x: 21, y: 53.9 },
    { x: 22, y: 55.7 },
    { x: 23, y: 57.5 },
    { x: 24, y: 59.2 },
    { x: 25, y: 60.9 },
    { x: 26, y: 62.4 },
    { x: 27, y: 63.9 },
    { x: 28, y: 65.3 },
    { x: 29, y: 66.6 },
    { x: 30, y: 67.7 },
  ],
  middleLine: [
    { x: 0, y: 2.2 },
    { x: 1, y: 3.8 },
    { x: 2, y: 6.1 },
    { x: 3, y: 8.9 },
    { x: 4, y: 12.2 },
    { x: 5, y: 15.7 },
    { x: 6, y: 19.1 },
    { x: 7, y: 22.4 },
    { x: 8, y: 25.4 },
    { x: 9, y: 28.2 },
    { x: 10, y: 31.0 },
    { x: 11, y: 33.8 },
    { x: 12, y: 36.5 },
    { x: 13, y: 39.1 },
    { x: 14, y: 41.7 },
    { x: 15, y: 44.2 },
    { x: 16, y: 46.6 },
    { x: 17, y: 49.0 },
    { x: 18, y: 51.2 },
    { x: 19, y: 53.4 },
    { x: 20, y: 55.5 },
    { x: 21, y: 57.5 },
    { x: 22, y: 59.5 },
    { x: 23, y: 61.4 },
    { x: 24, y: 63.2 },
    { x: 25, y: 65.0 },
    { x: 26, y: 66.7 },
    { x: 27, y: 68.3 },
    { x: 28, y: 69.7 },
    { x: 29, y: 71.1 },
    { x: 30, y: 72.4 },
  ],
  topLine: [
    { x: 0, y: 2.6 },
    { x: 1, y: 4.6 },
    { x: 2, y: 7.21 },
    { x: 3, y: 10.5 },
    { x: 4, y: 14.2 },
    { x: 5, y: 18.1 },
    { x: 6, y: 21.9 },
    { x: 7, y: 25.4 },
    { x: 8, y: 28.5 },
    { x: 9, y: 31.5 },
    { x: 10, y: 34.3 },
    { x: 11, y: 37.1 },
    { x: 12, y: 39.9 },
    { x: 13, y: 42.5 },
    { x: 14, y: 45.1 },
    { x: 15, y: 47.7 },
    { x: 16, y: 50.1 },
    { x: 17, y: 52.5 },
    { x: 18, y: 54.8 },
    { x: 19, y: 57.1 },
    { x: 20, y: 59.3 },
    { x: 21, y: 61.4 },
    { x: 22, y: 63.5 },
    { x: 23, y: 65.6 },
    { x: 24, y: 67.5 },
    { x: 25, y: 69.4 },
    { x: 26, y: 71.2 },
    { x: 27, y: 72.9 },
    { x: 28, y: 74.5 },
    { x: 29, y: 76.0 },
    { x: 30, y: 77.4 },
  ],
};
set(flData, 'lineArea', getLineArea(get(flData, 'bottomLine'), get(flData, 'topLine')));

export const acData = {
  bottomLine: [
    { x: 4, y: 7.18 },
    { x: 5, y: 8.3 },
    { x: 6, y: 9.43 },
    { x: 7, y: 10.57 },
    { x: 8, y: 11.7 },
    { x: 9, y: 12.81 },
    { x: 10, y: 13.92 },
    { x: 11, y: 15.02 },
    { x: 12, y: 16.1 },
    { x: 13, y: 17.15 },
    { x: 14, y: 18.18 },
    { x: 15, y: 19.19 },
    { x: 16, y: 20.18 },
    { x: 17, y: 21.15 },
    { x: 18, y: 22.12 },
    { x: 19, y: 23.09 },
    { x: 20, y: 24.08 },
    { x: 21, y: 25.05 },
    { x: 22, y: 26.02 },
    { x: 23, y: 26.96 },
    { x: 24, y: 27.87 },
    { x: 25, y: 28.73 },
    { x: 26, y: 29.54 },
    { x: 27, y: 30.31 },
    { x: 28, y: 31.06 },
    { x: 29, y: 31.79 },
    { x: 30, y: 32.52 },
  ],
  middleLine: [
    { x: 4, y: 7.84 },
    { x: 5, y: 9.04 },
    { x: 6, y: 10.25 },
    { x: 7, y: 11.45 },
    { x: 8, y: 12.63 },
    { x: 9, y: 13.8 },
    { x: 10, y: 14.96 },
    { x: 11, y: 16.11 },
    { x: 12, y: 17.24 },
    { x: 13, y: 18.34 },
    { x: 14, y: 19.43 },
    { x: 15, y: 20.49 },
    { x: 16, y: 21.54 },
    { x: 17, y: 22.58 },
    { x: 18, y: 23.61 },
    { x: 19, y: 24.67 },
    { x: 20, y: 25.73 },
    { x: 21, y: 26.8 },
    { x: 22, y: 27.87 },
    { x: 23, y: 28.91 },
    { x: 24, y: 29.93 },
    { x: 25, y: 30.9 },
    { x: 26, y: 31.83 },
    { x: 27, y: 32.72 },
    { x: 28, y: 33.59 },
    { x: 29, y: 34.45 },
    { x: 30, y: 35.33 },
  ],
  topLine: [
    { x: 4, y: 8.57 },
    { x: 5, y: 9.85 },
    { x: 6, y: 11.13 },
    { x: 7, y: 12.39 },
    { x: 8, y: 13.64 },
    { x: 9, y: 14.87 },
    { x: 10, y: 16.08 },
    { x: 11, y: 17.28 },
    { x: 12, y: 18.46 },
    { x: 13, y: 19.62 },
    { x: 14, y: 20.76 },
    { x: 15, y: 21.88 },
    { x: 16, y: 22.99 },
    { x: 17, y: 24.1 },
    { x: 18, y: 25.21 },
    { x: 19, y: 26.34 },
    { x: 20, y: 27.5 },
    { x: 21, y: 28.67 },
    { x: 22, y: 29.85 },
    { x: 23, y: 31.01 },
    { x: 24, y: 32.14 },
    { x: 25, y: 33.24 },
    { x: 26, y: 34.29 },
    { x: 27, y: 35.32 },
    { x: 28, y: 36.32 },
    { x: 29, y: 37.34 },
    { x: 30, y: 38.33 },
  ],
};
set(acData, 'lineArea', getLineArea(get(acData, 'bottomLine'), get(acData, 'topLine')));

export const hcData = {
  bottomLine: [
    { x: 4, y: 8.99 },
    { x: 5, y: 10.25 },
    { x: 6, y: 11.47 },
    { x: 7, y: 12.66 },
    { x: 8, y: 13.81 },
    { x: 9, y: 14.94 },
    { x: 10, y: 16.08 },
    { x: 11, y: 17.23 },
    { x: 12, y: 18.39 },
    { x: 13, y: 19.53 },
    { x: 14, y: 20.66 },
    { x: 15, y: 21.77 },
    { x: 16, y: 22.84 },
    { x: 17, y: 23.88 },
    { x: 18, y: 24.86 },
    { x: 19, y: 25.79 },
    { x: 20, y: 26.66 },
    { x: 21, y: 27.47 },
    { x: 22, y: 28.21 },
    { x: 23, y: 28.88 },
    { x: 24, y: 29.49 },
    { x: 25, y: 30.03 },
    { x: 26, y: 30.5 },
    { x: 27, y: 30.9 },
    { x: 28, y: 31.22 },
    { x: 29, y: 31.45 },
    { x: 30, y: 31.59 },
  ],
  middleLine: [
    { x: 4, y: 9.73 },
    { x: 5, y: 11.05 },
    { x: 6, y: 12.33 },
    { x: 7, y: 13.56 },
    { x: 8, y: 14.75 },
    { x: 9, y: 15.9 },
    { x: 10, y: 17.07 },
    { x: 11, y: 18.24 },
    { x: 12, y: 19.4 },
    { x: 13, y: 20.57 },
    { x: 14, y: 21.71 },
    { x: 15, y: 22.83 },
    { x: 16, y: 23.92 },
    { x: 17, y: 24.97 },
    { x: 18, y: 25.98 },
    { x: 19, y: 26.93 },
    { x: 20, y: 27.83 },
    { x: 21, y: 28.67 },
    { x: 22, y: 29.45 },
    { x: 23, y: 30.17 },
    { x: 24, y: 30.83 },
    { x: 25, y: 31.42 },
    { x: 26, y: 31.95 },
    { x: 27, y: 32.41 },
    { x: 28, y: 32.78 },
    { x: 29, y: 33.07 },
    { x: 30, y: 33.26 },
  ],
  topLine: [
    { x: 4, y: 10.53 },
    { x: 5, y: 11.92 },
    { x: 6, y: 13.26 },
    { x: 7, y: 14.53 },
    { x: 8, y: 15.74 },
    { x: 9, y: 16.93 },
    { x: 10, y: 18.11 },
    { x: 11, y: 19.3 },
    { x: 12, y: 20.48 },
    { x: 13, y: 21.66 },
    { x: 14, y: 22.81 },
    { x: 15, y: 23.95 },
    { x: 16, y: 25.05 },
    { x: 17, y: 26.12 },
    { x: 18, y: 27.15 },
    { x: 19, y: 28.13 },
    { x: 20, y: 29.06 },
    { x: 21, y: 29.93 },
    { x: 22, y: 30.75 },
    { x: 23, y: 31.52 },
    { x: 24, y: 32.23 },
    { x: 25, y: 32.88 },
    { x: 26, y: 33.47 },
    { x: 27, y: 33.98 },
    { x: 28, y: 34.42 },
    { x: 29, y: 34.77 },
    { x: 30, y: 35.03 },
  ],
};
set(hcData, 'lineArea', getLineArea(get(hcData, 'bottomLine'), get(hcData, 'topLine')));

export const hlData = {
  bottomLine: [
    { x: 0, y: 1.9 },
    { x: 1, y: 3.4 },
    { x: 2, y: 5.5 },
    { x: 3, y: 8.1 },
    { x: 4, y: 11.0 },
    { x: 5, y: 14.1 },
    { x: 6, y: 17.2 },
    { x: 7, y: 20.0 },
    { x: 8, y: 22.6 },
    { x: 9, y: 25.0 },
    { x: 10, y: 27.4 },
    { x: 11, y: 29.7 },
    { x: 12, y: 31.9 },
    { x: 13, y: 34.1 },
    { x: 14, y: 36.3 },
    { x: 15, y: 38.3 },
    { x: 16, y: 40.2 },
    { x: 17, y: 42.0 },
    { x: 18, y: 43.7 },
    { x: 19, y: 45.3 },
    { x: 20, y: 46.8 },
    { x: 21, y: 48.2 },
    { x: 22, y: 49.5 },
    { x: 23, y: 50.8 },
    { x: 24, y: 52.0 },
    { x: 25, y: 53.3 },
    { x: 26, y: 54.5 },
    { x: 27, y: 55.6 },
    { x: 28, y: 56.7 },
    { x: 29, y: 57.6 },
    { x: 30, y: 58.3 },
  ],
  middleLine: [
    { x: 0, y: 2.3 },
    { x: 1, y: 4.1 },
    { x: 2, y: 6.4 },
    { x: 3, y: 9.4 },
    { x: 4, y: 12.7 },
    { x: 5, y: 16.1 },
    { x: 6, y: 19.4 },
    { x: 7, y: 22.5 },
    { x: 8, y: 25.2 },
    { x: 9, y: 27.7 },
    { x: 10, y: 30.0 },
    { x: 11, y: 32.4 },
    { x: 12, y: 34.7 },
    { x: 13, y: 36.9 },
    { x: 14, y: 39.1 },
    { x: 15, y: 41.2 },
    { x: 16, y: 43.1 },
    { x: 17, y: 45.0 },
    { x: 18, y: 46.8 },
    { x: 19, y: 48.5 },
    { x: 20, y: 50.1 },
    { x: 21, y: 51.6 },
    { x: 22, y: 53.1 },
    { x: 23, y: 54.5 },
    { x: 24, y: 55.9 },
    { x: 25, y: 57.3 },
    { x: 26, y: 58.6 },
    { x: 27, y: 59.8 },
    { x: 28, y: 60.9 },
    { x: 29, y: 61.9 },
    { x: 30, y: 62.7 },
  ],
  topLine: [
    { x: 0, y: 2.8 },
    { x: 1, y: 4.8 },
    { x: 2, y: 7.6 },
    { x: 3, y: 10.9 },
    { x: 4, y: 14.6 },
    { x: 5, y: 18.4 },
    { x: 6, y: 22.0 },
    { x: 7, y: 25.3 },
    { x: 8, y: 28.1 },
    { x: 9, y: 30.6 },
    { x: 10, y: 33.0 },
    { x: 11, y: 35.4 },
    { x: 12, y: 37.7 },
    { x: 13, y: 39.9 },
    { x: 14, y: 42.1 },
    { x: 15, y: 44.2 },
    { x: 16, y: 46.3 },
    { x: 17, y: 48.3 },
    { x: 18, y: 50.1 },
    { x: 19, y: 52.0 },
    { x: 20, y: 53.7 },
    { x: 21, y: 55.4 },
    { x: 22, y: 57.0 },
    { x: 23, y: 58.6 },
    { x: 24, y: 60.1 },
    { x: 25, y: 61.5 },
    { x: 26, y: 63.0 },
    { x: 27, y: 64.3 },
    { x: 28, y: 65.5 },
    { x: 29, y: 66.6 },
    { x: 30, y: 67.5 },
  ],
};
set(hlData, 'lineArea', getLineArea(get(hlData, 'bottomLine'), get(hlData, 'topLine')));

export const efwData = {
  bottomLine: [
    { x: 0, y: 2 / 50 },
    { x: 1, y: 28 / 50 },
    { x: 2, y: 39 / 50 },
    { x: 3, y: 53 / 50 },
    { x: 4, y: 71 / 50 },
    { x: 5, y: 92 / 50 },
    { x: 6, y: 118 / 50 },
    { x: 7, y: 149 / 50 },
    { x: 8, y: 185 / 50 },
    { x: 9, y: 227 / 50 },
    { x: 10, y: 275 / 50 },
    { x: 11, y: 331 / 50 },
    { x: 12, y: 394 / 50 },
    { x: 13, y: 466 / 50 },
    { x: 14, y: 546 / 50 },
    { x: 15, y: 637 / 50 },
    { x: 16, y: 740 / 50 },
    { x: 17, y: 853 / 50 },
    { x: 18, y: 978 / 50 },
    { x: 19, y: 1114 / 50 },
    { x: 20, y: 1260 / 50 },
    { x: 21, y: 1414 / 50 },
    { x: 22, y: 1574 / 50 },
    { x: 23, y: 1740 / 50 },
    { x: 24, y: 1911 / 50 },
    { x: 25, y: 2085 / 50 },
    { x: 26, y: 2262 / 50 },
    { x: 27, y: 2437 / 50 },
    { x: 28, y: 2604 / 50 },
    { x: 29, y: 2752 / 50 },
    { x: 30, y: 2873 / 50 },
  ],
  middleLine: [
    { x: 0, y: 24 / 50 },
    { x: 1, y: 34 / 50 },
    { x: 2, y: 47 / 50 },
    { x: 3, y: 63 / 50 },
    { x: 4, y: 83 / 50 },
    { x: 5, y: 108 / 50 },
    { x: 6, y: 138 / 50 },
    { x: 7, y: 173 / 50 },
    { x: 8, y: 215 / 50 },
    { x: 9, y: 264 / 50 },
    { x: 10, y: 320 / 50 },
    { x: 11, y: 385 / 50 },
    { x: 12, y: 458 / 50 },
    { x: 13, y: 541 / 50 },
    { x: 14, y: 634 / 50 },
    { x: 15, y: 740 / 50 },
    { x: 16, y: 859 / 50 },
    { x: 17, y: 990 / 50 },
    { x: 18, y: 1136 / 50 },
    { x: 19, y: 1293 / 50 },
    { x: 20, y: 1463 / 50 },
    { x: 21, y: 1642 / 50 },
    { x: 22, y: 1830 / 50 },
    { x: 23, y: 2026 / 50 },
    { x: 24, y: 2229 / 50 },
    { x: 25, y: 2438 / 50 },
    { x: 26, y: 2653 / 50 },
    { x: 27, y: 2869 / 50 },
    { x: 28, y: 3077 / 50 },
    { x: 29, y: 3269 / 50 },
    { x: 30, y: 3434 / 50 },
  ],
  topLine: [
    { x: 0, y: 3 / 50 },
    { x: 1, y: 41 / 50 },
    { x: 2, y: 55 / 50 },
    { x: 3, y: 74 / 50 },
    { x: 4, y: 97 / 50 },
    { x: 5, y: 125 / 50 },
    { x: 6, y: 160 / 50 },
    { x: 7, y: 202 / 50 },
    { x: 8, y: 250 / 50 },
    { x: 9, y: 307 / 50 },
    { x: 10, y: 373 / 50 },
    { x: 11, y: 447 / 50 },
    { x: 12, y: 532 / 50 },
    { x: 13, y: 628 / 50 },
    { x: 14, y: 737 / 50 },
    { x: 15, y: 859 / 50 },
    { x: 16, y: 997 / 50 },
    { x: 17, y: 1149 / 50 },
    { x: 18, y: 1318 / 50 },
    { x: 19, y: 1501 / 50 },
    { x: 20, y: 1698 / 50 },
    { x: 21, y: 1908 / 50 },
    { x: 22, y: 2129 / 50 },
    { x: 23, y: 2360 / 50 },
    { x: 24, y: 2600 / 50 },
    { x: 25, y: 2851 / 50 },
    { x: 26, y: 3111 / 50 },
    { x: 27, y: 3376 / 50 },
    { x: 28, y: 3637 / 50 },
    { x: 29, y: 3884 / 50 },
    { x: 30, y: 4105 / 50 },
  ],
};
set(efwData, 'lineArea', getLineArea(get(efwData, 'bottomLine'), get(efwData, 'topLine')));
