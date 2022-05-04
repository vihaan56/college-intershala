import React, { useContext, useEffect } from 'react';
import companyshowcontext from '../context/companyshowcontext';
import CardItem from './CardItem';

const Card = () => {

    const context = useContext(companyshowcontext);
    const { companies, getcompanies } = context;
    useEffect(() => {
        getcompanies();
    }, [])

    return (
        <>
            <div className="container card-container my-3">

                <h2 className="h4 mb-3 fw-normal intership_company_heading">Internship Companies</h2>

                <div className="container company-container">

                    <div className="row">


                        {
                            companies.map((ele) => {
                                return <CardItem key={ele.company_id} companyid={ele.company_id} companyname={ele.company_name} companydesc={ele.company_description} noofseats={ele.noofseats} purpose={ele.purposeofcompany} deadline={ele.deadline} stipend={ele.stipend} duration={ele.duration} unique_key={ele.unique_key}></CardItem>

                            })
                        }
                      

                    </div>
                </div>
            </div>
        </>

    );


}

export default Card;