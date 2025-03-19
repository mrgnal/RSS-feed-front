import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from './question.module.css';  

const FAQ = () => {
  const faqs = [
    {
      question: 'What are my payment options?',
      answer: 'All major credit cards and PayPal are accepted. The payments are processed through secure third party payment services such as Chargebee, Stripe and PayPal. We do not store any credit card information on our servers.'
    },
    {
      question: 'Can I try RSS.app before I buy?',
      answer: 'Yes, you can try RSS.app with a free trial to see if it meets your needs before making a purchase.'
    },
    {
        question: 'Can I upgrade or cancel my plan at any time?',
        answer: 'Yes, of course! You can change your plan at any time. If you choose to upgrade, you will be charged a prorated amount for the rest of the month until the next billing cycle. If you choose to downgrade, you will be credited on the next billing cycle. To cancel your plan, simply downgrade to the free plan. We do not offer refunds.'
    },
    {
        question: 'What does it mean 25 posts per feed? ',
        answer: 'Depending on the plan, each feed will return up to 5, 15, 25, or 50 posts per feed when it is refreshed. New posts will always replace older posts when they become available on each refresh.'
    },
    {
        question: 'What are widgets?',
        answer: 'Great question! Widgets are embeddable code snippets that allow you to embed the feed on your website. Widgets can be created from any feed, bundle or collection.'
    },
    {
        question: 'How many widgets can I embed on my website?',
        answer: 'Depending on the plan, you can embed the widgets on either 4, 10, or 50 pages in total from the 7 widget types we currently have.'
    },
    {
        question: 'What if I need more than 500 feeds?',
        answer: 'For larger plans, contact us at support@rss.app or chat with us below.'
    },
    {
        question: 'What are collections?',
        answer: 'Awesome question! Collections allow you to save specific posts to review later. Check out our guide on collections.'
    },
  ];

  return (
    <div className={styles.faqContainer}>
      <Typography variant="h4" className={styles.faqTitle}>
        Frequently Asked Questions
      </Typography>
      {faqs.map((faq, index) => (
        <Accordion key={index} className={styles.faqItem}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography variant="h6" className={styles.faqQuestion}>
              {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body1" className={styles.faqAnswer}>
              {faq.answer}
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default FAQ;
