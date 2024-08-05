

/**
 * 判断血压是否异常
 * @param systolic  收缩
 * @param diastolic 舒张
 */
export function checkBloodPressure(systolic: number, diastolic: number) {
    if (!systolic || !diastolic) return false
    if (systolic < 90 || systolic > 130) {
        return true;
    }
    if (diastolic < 60 || diastolic > 90) {
        return true;
    }
    return false;
}
/**
 * 判断体温是否异常
 * @param value
 */
export function checkTemperature(value: number) {
    if (!value) return false
    if (value < 36.5 || value > 37.7) {
        return true;
    }
    return false;
}

/**
 * 判断脉搏是否异常
 * @param value
 */
export function checkPulse(value: number) {
    if (value === undefined || value === null) return false
    if (value < 60 || value > 100) {
        return true;
    }
    return false;
}

/**
 * 判断产后出血是否异常
 * @param value
 */
export function checkPostpartumBleeding(value: number) {
    if (value === undefined || value === null) return false
    if (value > 500) {
        return true;
    }
    return false;
}