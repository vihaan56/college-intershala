import React from "react";
const CardItem = ({
  companyname,
  companydesc,
  noofseats,
  purpose,
  deadline,
  duration,
  stipend,
  companyid,
  unique_key,
}) => {
  const url = "/internship/details/" + companyname + "/" + unique_key;
  console.log("hello");

  return (
    <>
      <div className="col-md-6">
        <div className="card">
          <div className="internship_meta">
            <div className="intern_header">
              <div className="company-name">{companyname}</div>
              <div className="internship_logo">
                <img
                  loading="lazy"
                  src="data:image/png;base64,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"
                  alt="Web Development Teaching Assistant (Virtual) Internship at Internshala in "
                />
              </div>
            </div>
            <div className="intern_info">
              <div className="location_name">
                <i className="fas fa-info-circle"></i>
                <span>
                  <a className="location_link" href="#!">
                    {companydesc}
                  </a>
                </span>
              </div>
            </div>

            <div className="internship_other_details_container">
              <div className="other_detail_item_row">
                <div className="other_detail_item large_stipend_text">
                  <div className="item_heading">
                    <i className="fas fa-chair"></i>
                    <span>No of seats </span>
                  </div>
                  <div className="item_body" id="start-date-first">
                    <span className="start_immediately_desktop">
                      {noofseats}
                    </span>
                  </div>
                </div>

                <div className="other_detail_item large_stipend_text">
                  <div className="item_heading">
                    <i className="far fa-calendar"></i>
                    <span>Duration</span>
                  </div>
                  <div className="item_body">{duration} </div>
                </div>
              </div>

              <div className="other_detail_item_row">
                <div className="other_detail_item large_stipend_text stipend_container">
                  <div className="item_heading">
                    <i className="fas fa-money-check"></i> <span>Stipend </span>
                  </div>
                  <div className="item_body">
                    <span className="stipend">
                      <i className="ic-16-currency-inr"></i> {stipend} /month
                    </span>
                    <i
                      className="rewards_popover ic-16-help-circle"
                      popover_content="This is a performance-based internship. In addition to the minimum-assured stipend, you will also be paid a performance-linked incentive (₹ 10 per additional thread (after target of 300 threads))."
                      data-original-title=""
                      title=""
                    ></i>
                  </div>
                </div>
                <div className="other_detail_item large_stipend_text apply_by">
                  <div className="item_heading">
                    <i className="fas fa-hourglass-end"></i>
                    <span>Apply By</span>
                  </div>
                  <div className="item_body">{deadline}</div>
                </div>
              </div>
            </div>
            <div className="button_container">
              <div className="tags_container">
                <div className="label_container label_container_desktop">
                  {purpose}{" "}
                </div>
              </div>
              <a className="view_detail_button view_detail_anchor" href={url}>
                <div>Enroll Now</div>
                <i className="fas fa-chevron-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="col-lg-4 mb-3 mb-lg-0 my-3">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{props.companyname}</h5>
          <p className="card-text">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <span className="mx-3">1200 seats</span>

          <a href="#" className="card-link enroll-now">
            Enroll Now
          </a>

        </div>
      </div>
    </div> */}
    </>
  );
};

export default CardItem;
