import React, { useState } from 'react';
import { Form, Button, Collapse, Card } from "react-bootstrap";

import { calculations } from '../../utils/calculations';

export const EenerateEstimation = (props) => {
    const {
        showEstimation,
        handleFocus,
        generate,
        personalData,
        baseYearEarnings,
        nonBaseYearEarnings,
        generateEstimate
    } = props;

    const [moreDetails, setMoreDetails] = useState(false)
    const [customBaseYear, setCustomBaseYear] = useState(new Date().getFullYear())
    const [customBaseError, setCustomBaseYearError] = useState()

    const { aveOverYMPE, aveUnderYMPE, nonBasePeriodOver, nonBasePeriodUnder, maxBaseYear } = calculations(personalData, baseYearEarnings, nonBaseYearEarnings, generateEstimate.estimatedRetirementDate);

    const showMoreDetails = () => {
        setMoreDetails(!moreDetails);
    }

    const handleChangeCustomBaseYear = (e) => {
        e.preventDefault()

        setCustomBaseYearError("");
        if(e.target.value > maxBaseYear || e.target.value < new Date().getFullYear()) {
            setCustomBaseYearError("Must be within current and max base year")
        }
        setCustomBaseYear(e.target.value);
    }

    const cred = Math.abs(customBaseYear - new Date().getFullYear())

    return (
        <div className={`container ${showEstimation ? 'd-none' : ''}`}>
            <div>
                Nicely done! Your estimated monthly pension is indicated below. These figures are subject to change if updated information is provided.
            </div>
            <div className='mt-4'>
                <b>Disclaimer</b>
                <p className='mt-2'>The below figures represent the estimated gross pension based on the inputs & assumptions you provided.
                    At retirement, your pension will be adjusted depending on what form of pension you elect and required statutory deductions.
                    Learn more about <a>Survivorship Options</a> and <a>Pension Reductions</a>.
                    <div className='mt-2'>Your results will not be saved by TTCPP. If you'd like a copy, click print.</div>
                </p>
            </div>
            <div>
                <b className='fs-5'>Results</b>
                <div>Your pension entitlement was calculated assuming the base year stays current.</div>
            </div>
            <div className='fs-6 mt-3'>
                <b>Adjust base year</b>
                <Form.Control
                    type="number"
                    placeholder="YYYY"
                    className="small"
                    onFocus={handleFocus}
                    onChange={e => handleChangeCustomBaseYear(e)}
                    value={customBaseYear}
                />
                <Form.Control.Feedback type="invalid">
                    {customBaseError}
                </Form.Control.Feedback>
                <span></span>
            </div>
            <div className='mt-4'>
                <b className='fs-2 text-danger'>$
                {
                    ((aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)) + (nonBasePeriodUnder * 0.004)) > (143.20 * (parseFloat(personalData.totalCreditedService) + cred))
                    ? ((aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)) + (nonBasePeriodUnder * 0.004)).toFixed(2)
                    : (143.20 * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)
                }</b>
                <div><b>Lifetime monthly pension</b></div>
                {generateEstimate.estimatedRetirementDate && <div className='mt-2'>Estimated pension on {generateEstimate.estimatedRetirementDate.toDateString()} at {generateEstimate.estimatedRetirementDate.getFullYear() - personalData.dob.getFullYear()}.</div>}
            </div>
            <div className='my-5'>
                <b className='fs-5'>More Details <span><i className={`arrow ${moreDetails ? 'up' : 'down'}`} onClick={() => showMoreDetails()}></i></span></b>
            </div>
            <Collapse in={moreDetails}>
                <div id="example-collapse-text">
                    <b>Annual pension calculations</b>

                    {/* Part 1 */}
                    <Card className="my-2">
                        <Card.Body style={{ background: '#DCDCDC' }}>
                            <Card.Title className='h6 fw-600'> <span className='text-danger'>Part 1:</span> <b>Base period</b></Card.Title>
                            <Card.Text>
                                Includes your best four years of pensionable earnings and credited pension service up to December 31st of the Board-approved base year. Your best four years do not have to be consecutive.
                                <div className='row'>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Average earnings up to YMPE X1.6%</span>
                                            <div>$ {aveUnderYMPE} × 1.6% = ${(aveUnderYMPE * 0.016).toFixed(2)}</div>
                                        </div>
                                        <span className='fs-3'>+</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Average earnings above YMPE'× 2%</span>
                                            <div>${aveOverYMPE} * 2% = ${(aveOverYMPE * 0.02).toFixed(2)}</div>
                                        </div>
                                        <span className='fs-3'>x</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Credited service up to base year</span>
                                            <div>{(parseFloat(personalData.totalCreditedService) + cred).toFixed(2)} years</div>
                                        </div>
                                        <span className='fs-3'>=</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Credited service up to base year</span>
                                            <div>${(((aveUnderYMPE * 0.016) + (aveOverYMPE * 0.02)) * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    {/* Part 2 */}
                    <Card className="mt-4 mb-2">
                        <Card.Body style={{ background: '#DCDCDC' }}>
                            <Card.Title className='h6 fw-600'> <span className='text-danger'>Part 2:</span> <b> Non-base beriod</b></Card.Title>
                            <Card.Text>
                                Includes your pensionable earnings every year after the base period. Your pensionable earnings are the gross earnings on which you have made TTCPP contributions.
                                <div className='row'>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Sum of earnings to to YMPE x 1.6%</span>
                                            <div>${nonBasePeriodUnder} * 1.6% = ${(nonBasePeriodUnder * 0.016).toFixed(2)}</div>
                                        </div>
                                        <span className='fs-3'>+</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Sum of earnings above YMPE × 2%</span>
                                            <div>${nonBasePeriodOver} x 2% = ${(nonBasePeriodOver * 0.02).toFixed(2)}</div>
                                        </div>
                                        <span className='fs-3'>=</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Non-base sum</span>
                                            <div>${((nonBasePeriodUnder * 0.016) + (nonBasePeriodOver * 0.02)).toFixed(2)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <div className='my-4 mx-5'>
                        <div className='row'>
                            <div className='col-4 d-flex justify-content-center text-center'>
                                <div className='me-5'><span className='top-label fs-4'>Base Period</span>
                                    <div className='fs-3 fw-600'>${(((aveUnderYMPE * 0.016) + (aveOverYMPE * 0.02)) * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)}</div>
                                    <div className='fw-600 fs-5'>x 0.814</div>
                                </div>
                            </div>
                            <div className='col-4 d-flex justify-content-center text-center'>
                                <div className='me-5'><span className='top-label fs-4'>Non-base Period</span>
                                    <div className='fs-3 fw-600'>${((nonBasePeriodUnder * 0.016) + (nonBasePeriodOver * 0.02)).toFixed(2)}</div>
                                    <div className='fw-600 fs-5'>x 0.814</div>
                                </div>
                            </div>
                            <div className='col-4 d-flex justify-content-center text-center'>
                                <div className='me-5'><span className='top-label fs-4'>Annual pension</span>
                                    <div className='fs-3 fw-600'>${(((((aveUnderYMPE * 0.016) + (aveOverYMPE * 0.02)) * (parseFloat(personalData.totalCreditedService) + cred)) + ((nonBasePeriodUnder * 0.016) + (nonBasePeriodOver * 0.02))) * 0.814).toFixed(2)}</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div style={{ fontSize: '13px' }}>
                        When retiring early with a reduced pension, two reduction factors apply. One factor applies to the base period sum, and the other applies to the non-base sum.
                        This reduction factor is calculated by comparing member age to years of service. To see how this is determined, click here
                    </div>

                    <div className='mt-5'>
                        <b>Bridge benefit for early retirement calculations</b>
                        {/* Formula 1 */}
                        <Card className="my-2">
                            <Card.Body style={{ background: '#DCDCDC' }}>
                                <Card.Title className='h6 fw-600'>
                                    <span className='text-danger'>Formula 1</span>
                                    <div>Bridge benefit for service to the end of the base period</div>
                                </Card.Title>
                                <Card.Text>
                                    <div className='row'>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'>
                                                <div>0.40%</div>
                                            </div>
                                            <span className='fs-3'>x</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Average or your best four years of earnings up to the average YMPE in the same four years
                                            </span>
                                                <div>${aveUnderYMPE}</div>
                                            </div>
                                            <span className='fs-3'>x</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Credited service up to base year</span>
                                                <div>{(parseFloat(personalData.totalCreditedService) + cred)} years</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>End of base period results
                                            </span>
                                                <div>${(aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>

                                <Card.Title className='h6 fw-600'>
                                    <div>Bridge benefit for service after the base period
                                    </div>
                                </Card.Title>
                                <Card.Text>
                                    <div className='row'>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'>
                                                <div>0.40%</div>
                                            </div>
                                            <span className='fs-3'>x</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Sum of the earnings up to the YMPE</span>
                                                <div>${nonBasePeriodUnder}</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>After base period results</span>
                                                <div>${(nonBasePeriodUnder * 0.004).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>

                                <Card.Title className='h6 fw-600'>
                                    <div>Total bridge benefit</div>
                                </Card.Title>
                                <Card.Text>
                                    <div className='row'>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>End of base period results</span>
                                                <div>${(aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)}</div>
                                            </div>
                                            <span className='fs-3'>+</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>After base period results</span>
                                                <div>${(nonBasePeriodUnder * 0.004).toFixed(2)}</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Total Formula 1</span>
                                                <div>${((aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)) + (nonBasePeriodUnder * 0.004)).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        {/* Formula 2*/}
                        <Card className="mb-2 mt-4">
                            <Card.Body style={{ background: '#DCDCDC' }}>
                                <Card.Title className='h6 fw-600'>
                                    <span className='text-danger'>Formula 2</span>
                                    <div>Minimum bridge benefit using the minimum bridge factor of $143.20</div>
                                </Card.Title>
                                <Card.Text>
                                    <div className='row'>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'>
                                                <div>$143.20</div>
                                            </div>
                                            <span className='fs-3'>x</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Total years of credited service</span>
                                                <div>{(parseFloat(personalData.totalCreditedService) + cred).toFixed(2)} years</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Minimum bridge factor results</span>
                                                <div>${(143.20 * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Text>
                            </Card.Body>
                        </Card>

                        <div className='mt-3 fw-600 fs-5'>The formula that yields a higher result will be used for your bridge benefit which is payable to you until you reach age 65.</div>
                        <div className='my-4 mx-5'>
                            <div className='row'>
                                <div className='col-4 d-flex justify-content-center text-center'>
                                    <div className='me-5'><span className='top-label fs-4'>Formula 1</span>
                                        <div className='fs-3 fw-600'>${((aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)) + (nonBasePeriodUnder * 0.004)).toFixed(2)}</div>
                                    </div>
                                    <span className='fs-3 d-flex justify-content-center text-center'>{'>'}</span>
                                </div>
                                <div className='col-4 d-flex justify-content-center text-center'>
                                    <div className='me-5'><span className='top-label fs-4'>Formula 2</span>
                                        <div className='fs-3 fw-600'>${(143.20 * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)}</div>
                                    </div>
                                    <span className='fs-3 d-flex justify-content-center text-center'>=</span>
                                </div>
                                <div className='col-4 d-flex justify-content-center text-center'>
                                    <div className='me-5'><span className='top-label fs-4'>Bridge Benefit</span>
                                        <div className='fs-3 fw-600'>
                                            $
                                            {
                                                ((aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)) + (nonBasePeriodUnder * 0.004)) > (143.20 * (parseFloat(personalData.totalCreditedService) + cred))
                                                ? ((aveUnderYMPE * 0.004 * (parseFloat(personalData.totalCreditedService) + cred)) + (nonBasePeriodUnder * 0.004)).toFixed(2)
                                                : (143.20 * (parseFloat(personalData.totalCreditedService) + cred)).toFixed(2)
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div style={{fontSize: '13px'}} className='mb-5'>
                            When retiring early with a reduced pension, a reduction factor applies to whichever sum is greater between Formula 1 and Formula 2.
                            This reduction factor is calculated by comparing member age to years of service. To see how this is determined, click here.
                        </div>

                    </div>
                </div>
            </Collapse>
            <div>
                <Button variant="outline-danger common_button mr-5">
                    Print
                </Button>
                <Button variant="outline-danger common_button">
                    Save Pdf
                </Button>
                <Button onClick={generate} variant="outline-danger common_button">
                    Return to input
                </Button>
            </div>
        </div>
    );
}