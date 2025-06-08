
import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  Tile,
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Tag,
  ProgressBar,
  InlineNotification,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  OverflowMenu,
  OverflowMenuItem,
} from '@carbon/react';

interface ValidationResultsProps {
  results: any;
  onNavigate: (page: string) => void;
  onReset: () => void;
}

const ValidationResults: React.FC<ValidationResultsProps> = ({ results, onNavigate, onReset }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showOnlyMismatches, setShowOnlyMismatches] = useState(false);

  const summaryData = [
    { metric: 'Total Rows', value: results.totalRows.toLocaleString(), status: 'info' },
    { metric: 'Matching Rows', value: results.matchingRows.toLocaleString(), status: 'success' },
    { metric: 'Mismatched Rows', value: results.mismatchedRows.toLocaleString(), status: results.mismatchedRows > 0 ? 'warning' : 'success' },
    { metric: 'Match Percentage', value: `${((results.matchingRows / results.totalRows) * 100).toFixed(2)}%`, status: results.matchingRows === results.totalRows ? 'success' : 'warning' },
  ];

  if (results.countDifference !== null) {
    summaryData.push({
      metric: 'Count Difference',
      value: results.countDifference.toString(),
      status: results.countDifference === 0 ? 'success' : 'error'
    });
  }

  if (results.checksumMatch !== null) {
    summaryData.push({
      metric: 'Checksum Match',
      value: results.checksumMatch ? 'Pass' : 'Fail',
      status: results.checksumMatch ? 'success' : 'error'
    });
  }

  const filteredDetails = showOnlyMismatches 
    ? results.details.filter(item => item.status === 'mismatch')
    : results.details;

  const detailHeaders = [
    { key: 'column', header: 'Column Name' },
    { key: 'source', header: 'Source Value' },
    { key: 'target', header: 'Target Value' },
    { key: 'status', header: 'Status' },
  ];

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'match':
        return <Tag type="green">Match</Tag>;
      case 'mismatch':
        return <Tag type="red">Mismatch</Tag>;
      default:
        return <Tag type="gray">Unknown</Tag>;
    }
  };

  const getMetricTag = (status: string) => {
    switch (status) {
      case 'success':
        return <Tag type="green">Good</Tag>;
      case 'warning':
        return <Tag type="magenta">Warning</Tag>;
      case 'error':
        return <Tag type="red">Error</Tag>;
      default:
        return <Tag type="blue">Info</Tag>;
    }
  };

  const exportResults = (format: string) => {
    console.log(`Exporting results in ${format} format`);
    // Implementation would go here
  };

  return (
    <div className="cds--content" style={{ padding: '6rem 2rem 2rem' }}>
      <Grid className="cds--grid--full-width">
        <Column lg={16} md={8} sm={4}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h1 className="cds--productive-heading-06">
                Validation Results
              </h1>
              <div>
                <Button kind="secondary" onClick={onReset} style={{ marginRight: '1rem' }}>
                  Run New Validation
                </Button>
                <Button kind="ghost" onClick={() => onNavigate('home')}>
                  Back to Home
                </Button>
              </div>
            </div>

            {/* Summary Cards */}
            <Grid style={{ marginBottom: '2rem' }}>
              {summaryData.map((item, index) => (
                <Column lg={4} md={4} sm={4} key={index} style={{ marginBottom: '1rem' }}>
                  <Tile style={{ 
                    padding: '1.5rem', 
                    textAlign: 'center',
                    backgroundColor: item.status === 'success' ? '#e8f5e8' : 
                                   item.status === 'warning' ? '#fff8e6' :
                                   item.status === 'error' ? '#ffe6e6' : '#e5f6ff'
                  }}>
                    <h3 className="cds--productive-heading-03" style={{ marginBottom: '0.5rem' }}>
                      {item.value}
                    </h3>
                    <p className="cds--body-short-01" style={{ marginBottom: '0.5rem' }}>
                      {item.metric}
                    </p>
                    {getMetricTag(item.status)}
                  </Tile>
                </Column>
              ))}
            </Grid>

            {/* Progress Bar */}
            <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
              <h3 className="cds--productive-heading-04" style={{ marginBottom: '1rem' }}>
                Validation Progress
              </h3>
              <ProgressBar 
                value={(results.matchingRows / results.totalRows) * 100}
                max={100}
                label={`${results.matchingRows} of ${results.totalRows} rows validated`}
              />
            </Tile>

            {/* Detailed Results */}
            <Tile style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 className="cds--productive-heading-04">
                  Detailed Comparison Results
                </h3>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Button 
                    kind="ghost" 
                    size="sm"
                    onClick={() => setShowOnlyMismatches(!showOnlyMismatches)}
                  >
                    {showOnlyMismatches ? 'Show All' : 'Show Mismatches Only'}
                  </Button>
                  <OverflowMenu>
                    <OverflowMenuItem itemText="Export as CSV" onClick={() => exportResults('csv')} />
                    <OverflowMenuItem itemText="Export as Excel" onClick={() => exportResults('excel')} />
                    <OverflowMenuItem itemText="Export as PDF" onClick={() => exportResults('pdf')} />
                  </OverflowMenu>
                </div>
              </div>

              {results.mismatchedRows > 0 && (
                <InlineNotification
                  kind="warning"
                  title="Data Mismatches Found"
                  subtitle={`${results.mismatchedRows} rows have differences between source and target`}
                  style={{ marginBottom: '1rem' }}
                />
              )}

              <DataTable
                rows={filteredDetails.map((item, index) => ({ 
                  id: index.toString(), 
                  ...item 
                }))}
                headers={detailHeaders}
                render={({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
                  <TableContainer title="Comparison Details">
                    <Table {...getTableProps()}>
                      <TableHead>
                        <TableRow>
                          {headers.map((header) => (
                            <TableHeader key={header.key} {...getHeaderProps({ header })}>
                              {header.header}
                            </TableHeader>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row.id} {...getRowProps({ row })}>
                            {row.cells.map((cell) => (
                              <TableCell key={cell.id}>
                                {cell.info.header === 'status' 
                                  ? getStatusTag(cell.value)
                                  : cell.value
                                }
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              />

              {filteredDetails.length === 0 && showOnlyMismatches && (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <p>No mismatches found! All data matches between source and target.</p>
                </div>
              )}
            </Tile>
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default ValidationResults;
