export const YMPE = {
    '2001': 37600,
    '2002': 38300,
    '2003': 39100,
    '2004': 39900,
    '2005': 40500,
    '2006': 41100,
    '2007': 42100,
    '2008': 43700,
    '2009': 44900,
    '2010': 46300,
    '2011': 47200,
    '2012': 48300,
    '2013': 50100,
    '2014': 51100,
    '2015': 52500,
    '2016': 53600,
    '2017': 54900,
    '2018': 55300,
    '2019': 55900,
    '2020': 57400,
    '2021': 58700,
    '2022': 61600,
    '2023': 64900
}

export const initPersonalInformation = {
    dob: '',
    totalCreditedService: '',
    totalContinuousService: '',
};

export const initBaseYearEarnings = [
    {
        year: '',
        earning: 0,
        underYMPE: 0,
        overYMPE: 0,
    },
    {
        year: '',
        earning: 0,
        underYMPE: 0,
        overYMPE: 0,
    },
    {
        year: '',
        earning: 0,
        underYMPE: 0,
        overYMPE: 0,
    },
    {
        year: '',
        earning: 0,
        underYMPE: 0,
        overYMPE: 0,
    },
];

export const initNonBaseYearEarnings = {
    currentPensionableEarnings: '',
    estimatedYearPensionableEarnings: '',
    estimatedAnnualSalaryIncrease: 0,
};

export const initRetirementEligibility = {
    earliestReducedRetirementDate: '',
    earliestUnReducedRetirementDate: '',
    compulsoryPensionStartDate: '',
};

export const initGenerateEstimate = {
    estimatedRetirementDate: null,
};

export const staticData = [
    {
        title: 'Personal<br/>Information',
        description: 'You can find the credited and continuous service on the second page of your Annual Statement. Your credited service is the length of time during which you have contributed to the plan, while your continuous service is the total length of time you have been employed.',
    },
    {
        title: 'Best Four-Year<br/>Earnings to Base Year',
        description: 'Your best four years are on the second page of your Annual Statement. Your pensionable earnings include your regular base salary plus earnings on which you make pension contributions. These earnings do not include tool allowance, most settlements, Ontario health premiums, refunds, or shortage allowances.',
    },
    {
        title: 'Non-Base<br/>Year Earnings',
        description: 'Complete the second and third fields by making some assumptions about your future pensionable earnings and annual salary increase. Your non-base year is on the second page of your Annual Statement.',
    },
    {
        title: 'Retirement<br/>Eligibility',
        description: 'Your retirement dates outline when you can first start collecting a reduced pension, an unreduced pension, and when you must start collecting your pension by law. These dates were estimated based off your inputs; you can refer to your Annual Statement for your actual dates.',
    },
    {
        title: 'Generate<br/>Estimate',
        description: '',
    },
];