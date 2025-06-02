import React, { useState } from 'react';
import { Grid, Column, Button, TextArea, Tile } from '@carbon/react';

interface QuestionnaireBaseProps {
  title: string;
  content: string;
  onNavigate: (page: string) => void;
}

const QuestionnaireBase: React.FC<QuestionnaireBaseProps> = ({ title, content, onNavigate }) => {
  const [responses, setResponses] = useState<{ [key: string]: string }>({});

  const handleResponseChange = (questionKey: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [`question-${questionKey}`]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Questionnaire Responses:', responses);
    alert('Questionnaire responses saved successfully!');
  };

  const parseQuestions = (content: string) => {
    const lines = content.split('\n').filter(line => line.trim());
    const questions: string[] = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (
        (trimmedLine.endsWith('?') || trimmedLine.endsWith(':')) &&
        trimmedLine.length > 5 &&
        !trimmedLine.toLowerCase().includes('questionnaire') &&
        !trimmedLine.toLowerCase().includes('overview') &&
        !trimmedLine.toLowerCase().includes('section')
      ) {
        questions.push(trimmedLine);
      }
    }

    return questions;
  };

  const formatContent = (content: string) => {
    const questions = parseQuestions(content);
    const sections = content.split('\n\n').filter(section => section.trim());

    return sections.map((section, sectionIndex) => {
      const lines = section.split('\n').filter(line => line.trim());

      return (
        <div key={sectionIndex} style={{ marginBottom: '2rem' }}>
          {lines.map((line, lineIndex) => {
            const trimmedLine = line.trim();
            const uniqueKey = `${sectionIndex}-${lineIndex}`;

            if (
              (trimmedLine.endsWith('?') || trimmedLine.endsWith(':')) &&
              trimmedLine.length > 5 &&
              !trimmedLine.toLowerCase().includes('questionnaire') &&
              !trimmedLine.toLowerCase().includes('overview') &&
              !trimmedLine.toLowerCase().includes('section')
            ) {
              return (
                <div key={uniqueKey} style={{ marginBottom: '2rem' }}>
                  <h4 className="cds--productive-heading-03" style={{ marginBottom: '1rem' }}>
                    {trimmedLine}
                  </h4>
                  <TextArea
                    id={`response-${uniqueKey}`}
                    labelText="Your Response"
                    placeholder="Enter your response here..."
                    rows={4}
                    value={responses[`question-${uniqueKey}`] || ''}
                    onChange={(e) => handleResponseChange(uniqueKey, e.target.value)}
                  />
                </div>
              );
            }

            return (
              <div key={uniqueKey} style={{ marginBottom: '1rem' }}>
                <p className="cds--body-long-01" style={{ color: '#525252' }}>
                  {trimmedLine}
                </p>
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="cds--content" style={{ padding: '6rem 2rem 2rem' }}>
      <Grid className="cds--grid--full-width">
        <Column lg={16} md={8} sm={4}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Button
              kind="ghost"
              onClick={() => onNavigate('home')}
              style={{ marginBottom: '2rem' }}
            >
              ← Back to Home
            </Button>

            <h1 className="cds--productive-heading-06" style={{ marginBottom: '1rem' }}>
              {title}
            </h1>

            <Tile style={{ padding: '2rem', marginBottom: '2rem', backgroundColor: 'white' }}>
              {formatContent(content)}

              <div style={{ marginTop: '3rem', textAlign: 'center' }}>
                <Button kind="primary" size="lg" onClick={handleSubmit}>
                  Submit Questionnaire
                </Button>
              </div>
            </Tile>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default QuestionnaireBase;