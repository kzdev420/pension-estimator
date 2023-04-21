import React, { useState } from 'react';
import { Form, Button, Collapse, Card } from "react-bootstrap";

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

    const showMoreDetails = () => {
        setMoreDetails(!moreDetails);
    }

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
                />
                <span></span>
            </div>
            <div className='mt-4'>
                <b className='fs-2 text-danger'>$xx,xxx.xx</b>
                <div><b>Lifetime monthly pension</b></div>
                <div className='mt-2'>Estimated pension on [month] [day], [year] at [approximate age].</div>
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
                                            <div>$59,075 × 1.6% = $945.20</div>
                                        </div>
                                        <span className='fs-3'>+</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Average earnings above YMPE'× 2%</span>
                                            <div>$39,432.14
                                                * 2%
                                                $788.64
                                            </div>
                                        </div>
                                        <span className='fs-3'>x</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Credited service up to base year</span>
                                            <div>21.18 years</div>
                                        </div>
                                        <span className='fs-3'>=</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Credited service up to base year</span>
                                            <div>21.18 years</div>
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
                                            <div>$133,719.96 * 1.6% = $2,139.52</div>
                                        </div>
                                        <span className='fs-3'>+</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Sum of earnings above YMPE × 2%</span>
                                            <div>$133,719.96 x 2% = $1.305.52</div>
                                        </div>
                                        <span className='fs-3'>=</span>
                                    </div>
                                    <div className='col-2 custom-class'>
                                        <div className='me-5'><span className='top-label'>Non-base sum</span>
                                            <div>$3.445.03</div>
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
                                    <div className='fs-3 fw-600'>$36,722.80</div>
                                    <div className='fw-600 fs-5'>x 0.814</div>
                                </div>
                            </div>
                            <div className='col-4 d-flex justify-content-center text-center'>
                                <div className='me-5'><span className='top-label fs-4'>Non-base Period</span>
                                    <div className='fs-3 fw-600'>$3,445.03</div>
                                    <div className='fw-600 fs-5'>x 0.814</div>
                                </div>
                            </div>
                            <div className='col-4 d-flex justify-content-center text-center'>
                                <div className='me-5'><span className='top-label fs-4'>Annual pension</span>
                                    <div className='fs-3 fw-600'>$40,167.83</div>
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
                                                <div>$59,075.00
                                                </div>
                                            </div>
                                            <span className='fs-3'>x</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Credited service up to base year</span>
                                                <div>21.18 years</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>End of base period results
                                            </span>
                                                <div>55,004.83
                                                </div>
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
                                                <div>$133,719.96</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>After base period results</span>
                                                <div>$534.88</div>
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
                                                <div>$5,004.83</div>
                                            </div>
                                            <span className='fs-3'>+</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>After base period results</span>
                                                <div>$534.88</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Total Formula 1</span>
                                                <div>$5,539.71</div>
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
                                                <div>23.10 years</div>
                                            </div>
                                            <span className='fs-3'>=</span>
                                        </div>
                                        <div className='col-2 custom-class'>
                                            <div className='me-5'><span className='top-label'>Minimum bridge factor results</span>
                                                <div>$3,307.61</div>
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
                                        <div className='fs-3 fw-600'>$5,539.71</div>
                                        <div className='fw-600 fs-5'>× 0.499842*</div>
                                    </div>
                                    <span className='fs-3 d-flex justify-content-center text-center'>{'>'}</span>
                                </div>
                                <div className='col-4 d-flex justify-content-center text-center'>
                                    <div className='me-5'><span className='top-label fs-4'>Formula 2</span>
                                        <div className='fs-3 fw-600'>$3,307.61</div>
                                    </div>
                                    <span className='fs-3 d-flex justify-content-center text-center'>=</span>
                                </div>
                                <div className='col-4 d-flex justify-content-center text-center'>
                                    <div className='me-5'><span className='top-label fs-4'>Bridge Benefit</span>
                                        <div className='fs-3 fw-600'>$5,539.71</div>
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