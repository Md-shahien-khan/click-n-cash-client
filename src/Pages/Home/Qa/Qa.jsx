import React from 'react';
import SectionTitle from '../../../Components/sectiontitle/SectionTitle';

const Qa = () => {
    return (
        <div className='p-2 md:p-4 lg:p-7'>
            <SectionTitle
                subHeading={"Question & Answer"}
                heading={"You can see all the answers"}>
            </SectionTitle>

            {/* Question 1 */}
            <div className="collapse collapse-arrow bg-base-200 mb-2">
                <input type="radio" name="my-accordion-2" defaultChecked />
                <div className="collapse-title text-xl font-medium">
                    How can I find a worker for my project?
                </div>
                <div className="collapse-content">
                    <p>
                        To find a worker, simply post a job with all the details about the task, the skills required, and the budget. Workers can view your job listing and apply, and you can select the most suitable candidate.
                    </p>
                </div>
            </div>

            {/* Question 2 */}
            <div className="collapse collapse-arrow bg-base-200 mb-2">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How do workers get paid?
                </div>
                <div className="collapse-content">
                    <p>
                        Workers get paid through the platform's secure payment system. Once the job is completed and approved by the buyer, the payment is released to the worker's account.
                    </p>
                </div>
            </div>

            {/* Question 3 */}
            <div className="collapse collapse-arrow bg-base-200 mb-2">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    What fees are associated with using the platform?
                </div>
                <div className="collapse-content">
                    <p>
                        The platform charges a small service fee on each transaction. This fee ensures the platform remains secure and reliable for both buyers and workers.
                    </p>
                </div>
            </div>

            {/* Question 4 */}
            <div className="collapse collapse-arrow bg-base-200 mb-2">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    Can I rate the worker or buyer after the job is completed?
                </div>
                <div className="collapse-content">
                    <p>
                        Yes, both workers and buyers can leave ratings and reviews for each other after the job is completed. This helps maintain transparency and trust on the platform.
                    </p>
                </div>
            </div>

            {/* Question 5 */}
            <div className="collapse collapse-arrow bg-base-200 mb-2">
                <input type="radio" name="my-accordion-2" />
                <div className="collapse-title text-xl font-medium">
                    How do I ensure the quality of work?
                </div>
                <div className="collapse-content">
                    <p>
                        Before hiring a worker, you can review their profile, ratings, and past work samples. Additionally, clear communication and setting expectations upfront can help ensure quality work.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Qa;
