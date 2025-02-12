import React from 'react';

const Accordion = ({ id, title, content }) => (
    <div className="mb-3 mt-3">
        <div className="accordion" id={id}>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`heading-${id}`}>
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${id}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${id}`}
                        style={{ fontWeight: 'bold' }}
                    >
                        {title}
                    </button>
                </h2>
                <div
                    id={`collapse-${id}`}
                    className="accordion-collapse collapse"
                    aria-labelledby={`heading-${id}`}
                    data-bs-parent={`#${id}`}
                >
                    <div className="accordion-body">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Accordion;
