export const calcRetirementEligibility = (tcs, dob) => {
    let curDate = new Date().getTime() / 8640000;
    let dobTime = new Date(dob).getTime()

    const earliestReducedRetirementDate = new Date(Math.min(
        ((29-tcs)*365.25 + curDate) * 86400000,
        new Date(dobTime).setFullYear(new Date(dobTime).getFullYear() + 50)
    ))

    let third = ((29-tcs) + ((((29-tcs)*365.25)+curDate)-(dobTime / 86400000))/365.25)>79.999
                ? ((29-tcs)*365.25+curDate)*86400000
                : ((80-(29-tcs)*365.25+curDate)/2 + (29-tcs)*365.25+curDate)*86400000
    const earliestUnReducedRetirementDate = new Date(Math.min(
        ((30-tcs)*365.25 + curDate)*86400000,
        new Date(dobTime).setFullYear(new Date(dobTime).getFullYear() + 60),
        third
    ))

    const compulsoryPensionStartDate = new Date(new Date(dobTime).getFullYear() + 71, 11, 30)

    const normalRetirmentDate = new Date(dobTime).setFullYear(new Date(dobTime).getFullYear() + 60)

    return { earliestReducedRetirementDate, earliestUnReducedRetirementDate, compulsoryPensionStartDate }
}

export const calculations = (personalData, baseYearEarnings, nonBaseYearEarnings, estimatedRetirementDate) => {

    let aveUnderYMPE = 0, aveOverYMPE = 0;
    for(let i=0; i<baseYearEarnings.length; i++) {
        aveOverYMPE += parseFloat(baseYearEarnings[i].overYMPE);
        aveUnderYMPE += parseFloat(baseYearEarnings[i].underYMPE);
    }
    aveOverYMPE = parseFloat(aveOverYMPE / baseYearEarnings.length).toFixed(2);
    aveUnderYMPE = parseFloat(aveUnderYMPE / baseYearEarnings.length).toFixed(2);

    const maxBaseYear = Math.max(new Date(estimatedRetirementDate).getFullYear()-1, new Date().getFullYear())

    const basePeriodUnder = parseFloat(parseFloat(aveUnderYMPE) * 0.016).toFixed(2);
    const basePeriodOver = parseFloat(parseFloat(aveOverYMPE) * 0.02).toFixed(2);

    const nonBasePeriodUnder = parseFloat(parseFloat(baseYearEarnings[0].underYMPE) + parseFloat(baseYearEarnings[1].underYMPE)).toFixed(2)
    const nonBasePeriodOver = parseFloat(parseFloat(baseYearEarnings[0].overYMPE) + parseFloat(baseYearEarnings[1].overYMPE)).toFixed(2)

    console.log({ aveOverYMPE, aveUnderYMPE, nonBasePeriodOver, nonBasePeriodUnder, maxBaseYear, estimatedRetirementDate })

    return { aveOverYMPE, aveUnderYMPE, nonBasePeriodOver, nonBasePeriodUnder, maxBaseYear }
}