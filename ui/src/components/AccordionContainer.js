import React from 'react';
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel
} from 'react-accessible-accordion';
import './../styles/AccordionContainerStyles.css';

const AccordionContainer = ({captionInfo}) => {
    return (
        <div>
            <h4 className="accordionTitle">Description of differences</h4>
            <Accordion>
                {
                    captionInfo.map(difference => {
                        return (
                            <AccordionItem>
                                <AccordionItemHeading>
                                    <AccordionItemButton>
                                        Difference {difference.differenceNum}
                                    </AccordionItemButton>
                                </AccordionItemHeading>
                                <AccordionItemPanel>
                                    <p>
                                        {difference.content}
                                    </p>
                                </AccordionItemPanel>
                            </AccordionItem>
                        );
                    }
                    )}
            </Accordion>
        </div>
    )
};


export default AccordionContainer;