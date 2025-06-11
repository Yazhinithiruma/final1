import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  TextInput,
  Tile,
  Select,
  SelectItem,
  Toggle,
  Loading,
  Tag,
  MultiSelect,
  RadioButton,
  RadioButtonGroup,
  FileUploader,
  NumberInput,
  InlineNotification,
} from '@carbon/react';

interface DataValidationProps {
  onNavigate: (page: string) => void;
  onCompareData?: () => void;
  workspaceData?: {
    name: string;
    description: string;
  };
}

const DataValidation: React.FC<DataValidationProps> = ({ onNavigate, onCompareData, workspaceData }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Source, 2: Target, 3: Comparison
  const [isSourceConnected, setIsSourceConnected] = useState(false);
  const [isTargetConnected, setIsTargetConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [comparisonType, setComparisonType] = useState('single');
  const [columnSelectionType, setColumnSelectionType] = useState('');
  
  const [formData, setFormData] = useState({
    sourceDatabaseType: '',
    sourceHost: '',
    sourcePort: '',
    sourceUsername: '',
    sourcePassword: '',
    sourceDatabaseName: '',
    sourceUrl: '',
    sourceSchema: '',
    sourceTable: '',
    sourceFile: null,
    
    targetDatabaseType: '',
    targetHost: '',
    targetPort: '',
    targetUsername: '',
    targetPassword: '',
    targetDatabaseName: '',
    targetUrl: '',
    targetSchema: '',
    targetTable: '',
    targetFile: null,
    
    includeColumns: [],
    excludeColumns: [],
    enableChecksum: false,
    checksumType: 'SHA2',
    enableRowCount: false,
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSourceConnection = async () => {
    setIsLoading(true);
    // Simulate connection process
    setTimeout(() => {
      setIsSourceConnected(true);
      setCurrentStep(2);
      setIsLoading(false);
    }, 2000);
  };

  const handleTargetConnection = async () => {
    setIsLoading(true);
    // Simulate connection process
    setTimeout(() => {
      setIsTargetConnected(true);
      setCurrentStep(3);
      setIsLoading(false);
    }, 2000);
  };

  const handleCompareData = () => {
    console.log('Comparing data with configuration:', {
      comparisonType,
      formData
    });
    
    if (onCompareData) {
      onCompareData();
    }
  };

  const databaseTypeOptions = [
    { id: '', text: 'Select Option' },
    { id: 'teradata', text: 'Teradata' },
    { id: 'sqlserver', text: 'SQL Server' },
  ];

  const schemaOptions = [
    { id: 'select', text: 'Select Schema' },
    { id: 'public', text: 'Public' },
    { id: 'analytics', text: 'Analytics' },
    { id: 'staging', text: 'Staging' },
    { id: 'raw_data', text: 'Raw Data' },
  ];

  const tableOptions = [
    { id: 'select', text: 'Select Table' },
    { id: 'users', text: 'Users' },
    { id: 'customers', text: 'Customers' },
    { id: 'employees', text: 'Employees' },
    { id: 'orders', text: 'Orders' },
  ];

  const columnOptions = [
    { id: 'user_id', text: 'User ID' },
    { id: 'email', text: 'Email' },
    { id: 'name', text: 'Name' },
    { id: 'created_date', text: 'Created Date' },
    { id: 'status', text: 'Status' },
  ];

  const columnSelectionOptions = [
    { id: '', text: 'Select Option' },
    { id: 'include', text: 'Include Columns' },
    { id: 'exclude', text: 'Exclude Columns' },
  ];

  const renderSourceTable = () => (
    <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="cds--productive-heading-04">
          Source Database Connection
        </h3>
        {isSourceConnected && (
          <Tag type="green">Connected</Tag>
        )}
      </div>
      
      <Grid>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <Select
            id="source-database-type"
            labelText="Database Type"
            value={formData.sourceDatabaseType}
            onChange={(e) => handleInputChange('sourceDatabaseType', (e.target as HTMLSelectElement).value)}
            disabled={isSourceConnected}
          >
            {databaseTypeOptions.map(option => (
              <SelectItem key={option.id} value={option.id} text={option.text} />
            ))}
          </Select>
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="source-host"
            labelText="Host/Server"
            value={formData.sourceHost}
            onChange={(e) => handleInputChange('sourceHost', e.target.value)}
            disabled={isSourceConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="source-port"
            labelText="Port"
            value={formData.sourcePort}
            onChange={(e) => handleInputChange('sourcePort', e.target.value)}
            disabled={isSourceConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="source-database-name"
            labelText="Database Name"
            value={formData.sourceDatabaseName}
            onChange={(e) => handleInputChange('sourceDatabaseName', e.target.value)}
            disabled={isSourceConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="source-username"
            labelText="Username"
            value={formData.sourceUsername}
            onChange={(e) => handleInputChange('sourceUsername', e.target.value)}
            disabled={isSourceConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="source-password"
            labelText="Password"
            type="password"
            value={formData.sourcePassword}
            onChange={(e) => handleInputChange('sourcePassword', e.target.value)}
            disabled={isSourceConnected}
          />
        </Column>
        {/* <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <Select
            id="source-schema"
            labelText="Schema"
            value={formData.sourceSchema}
            onChange={(e) => handleInputChange('sourceSchema', (e.target as HTMLSelectElement).value)}
            disabled={isSourceConnected}
          >
            {schemaOptions.map(option => (
              <SelectItem key={option.id} value={option.id} text={option.text} />
            ))}
          </Select>
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <Select
            id="source-table"
            labelText="Table"
            value={formData.sourceTable}
            onChange={(e) => handleInputChange('sourceTable', (e.target as HTMLSelectElement).value)}
            disabled={isSourceConnected}
          >
            {tableOptions.map(option => (
              <SelectItem key={option.id} value={option.id} text={option.text} />
            ))}
          </Select>
        </Column> */}
      </Grid>
      
      {!isSourceConnected && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button 
            kind="primary" 
            onClick={handleSourceConnection}
            disabled={isLoading || !formData.sourceDatabaseType || !formData.sourceHost}
          >
            {isLoading ? 'Connecting...' : 'Connect to Source'}
          </Button>
        </div>
      )}
    </Tile>
  );

  const renderTargetTable = () => (
    <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 className="cds--productive-heading-04">
          Target Database Connection
        </h3>
        {isTargetConnected && (
          <Tag type="green">Connected</Tag>
        )}
      </div>
      
      <Grid>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <Select
            id="target-database-type"
            labelText="Database Type"
            value={formData.targetDatabaseType}
            onChange={(e) => handleInputChange('targetDatabaseType', (e.target as HTMLSelectElement).value)}
            disabled={isTargetConnected}
          >
            {databaseTypeOptions.map(option => (
              <SelectItem key={option.id} value={option.id} text={option.text} />
            ))}
          </Select>
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="target-host"
            labelText="Host/Server"
            value={formData.targetHost}
            onChange={(e) => handleInputChange('targetHost', e.target.value)}
            disabled={isTargetConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="target-port"
            labelText="Port"
            value={formData.targetPort}
            onChange={(e) => handleInputChange('targetPort', e.target.value)}
            disabled={isTargetConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="target-database-name"
            labelText="Database Name"
            value={formData.targetDatabaseName}
            onChange={(e) => handleInputChange('targetDatabaseName', e.target.value)}
            disabled={isTargetConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="target-username"
            labelText="Username"
            value={formData.targetUsername}
            onChange={(e) => handleInputChange('targetUsername', e.target.value)}
            disabled={isTargetConnected}
          />
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <TextInput
            id="target-password"
            labelText="Password"
            type="password"
            value={formData.targetPassword}
            onChange={(e) => handleInputChange('targetPassword', e.target.value)}
            disabled={isTargetConnected}
          />
        </Column>
        {/* <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <Select
            id="target-schema"
            labelText="Schema"
            value={formData.targetSchema}
            onChange={(e) => handleInputChange('targetSchema', (e.target as HTMLSelectElement).value)}
            disabled={isTargetConnected}
          >
            {schemaOptions.map(option => (
              <SelectItem key={option.id} value={option.id} text={option.text} />
            ))}
          </Select>
        </Column>
        <Column lg={4} md={4} sm={4} style={{ marginBottom: '1rem' }}>
          <Select
            id="target-table"
            labelText="Table"
            value={formData.targetTable}
            onChange={(e) => handleInputChange('targetTable', (e.target as HTMLSelectElement).value)}
            disabled={isTargetConnected}
          >
            {tableOptions.map(option => (
              <SelectItem key={option.id} value={option.id} text={option.text} />
            ))}
          </Select>
        </Column> */}
      </Grid>
      
      {!isTargetConnected && currentStep >= 2 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Button 
            kind="primary" 
            onClick={handleTargetConnection}
            disabled={isLoading || !formData.targetDatabaseType || !formData.targetHost}
          >
            {isLoading ? 'Connecting...' : 'Connect to Target'}
          </Button>
        </div>
      )}
    </Tile>
  );

  const renderComparisonOptions = () => (
    <div>
      {/* Comparison Type Selection */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Comparison Type
        </h3>
        <RadioButtonGroup
          legendText="Select comparison type"
          name="comparison-type"
          value={comparisonType}
          onChange={(value) => setComparisonType(value as string)}
        >
          <RadioButton labelText="Single Table" value="single" id="single" />
          <RadioButton labelText="Full Schema" value="full" id="full" />
        </RadioButtonGroup>
      </Tile>

      {/* Column Selection */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Column Selection
        </h3>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Select
              id="column-selection-type"
              labelText="Column Selection Type"
              value={columnSelectionType}
              onChange={(e) => {
                const value = (e.target as HTMLSelectElement).value;
                setColumnSelectionType(value);
                handleInputChange('includeColumns', []);
                handleInputChange('excludeColumns', []);
              }}
            >
              {columnSelectionOptions.map(option => (
                <SelectItem key={option.id} value={option.id} text={option.text} />
              ))}
            </Select>
          </Column>
          {columnSelectionType === 'include' && (
            <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
              <MultiSelect
                id="include-columns"
                titleText="Include Columns"
                label="Select columns to include"
                items={columnOptions}
                itemToString={(item) => (item ? item.text : '')}
                onChange={({ selectedItems }) => 
                  handleInputChange('includeColumns', selectedItems.map(item => item.id))
                }
              />
            </Column>
          )}
          {columnSelectionType === 'exclude' && (
            <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
              <MultiSelect
                id="exclude-columns"
                titleText="Exclude Columns"
                label="Select columns to exclude"
                items={columnOptions}
                itemToString={(item) => (item ? item.text : '')}
                onChange={({ selectedItems }) => 
                  handleInputChange('excludeColumns', selectedItems.map(item => item.id))
                }
              />
            </Column>
          )}
        </Grid>
      </Tile>

      {/* Comparison Options */}
      <Tile style={{ padding: '2rem', marginBottom: '2rem' }}>
        <h3 className="cds--productive-heading-04" style={{ marginBottom: '1.5rem' }}>
          Validation Options
        </h3>
        <Grid>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <Toggle
              id="enable-checksum"
              labelText="Enable Checksum Comparison"
              toggled={formData.enableChecksum}
              onToggle={(toggled) => handleInputChange('enableChecksum', toggled)}
            />
            {formData.enableChecksum && (
              <div style={{ marginTop: '1rem' }}>
                <TextInput
                  id="checksum-type"
                  labelText="Hash Type"
                  value="SHA2"
                  readOnly
                />
              </div>
            )}
          </Column>
          <Column lg={8} md={4} sm={4} style={{ marginBottom: '1rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <Toggle
                id="enable-row-count"
                labelText="Quick Row Count Check"
                toggled={formData.enableRowCount}
                onToggle={(toggled) => handleInputChange('enableRowCount', toggled)}
              />
            </div>
            {formData.enableRowCount && (
              <Button kind="secondary" size="sm">
                Check Now
              </Button>
            )}
          </Column>
        </Grid>
      </Tile>

      <div style={{ textAlign: 'center', marginTop: '2rem' }}>
        <Button kind="primary" onClick={handleCompareData}>
          Run Data Validation
        </Button>
      </div>
    </div>
  );

  return (
    <div className="cds--content" style={{ padding: '6rem 2rem 2rem' }}>
      <Grid className="cds--grid--full-width">
        <Column lg={16} md={8} sm={4}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Button
              kind="ghost"
              onClick={() => onNavigate('data-validation-dashboard')}
              style={{ marginBottom: '2rem' }}
            >
              ← Back to Dashboard
            </Button>
            
            {/* Workspace Info */}
            {workspaceData && (
              <Tile style={{ padding: '2rem', marginBottom: '2rem', backgroundColor: '#f4f4f4' }}>
                <h2 className="cds--productive-heading-05" style={{ marginBottom: '0.5rem' }}>
                  {workspaceData.name}
                </h2>
                <p className="cds--body-long-01" style={{ color: '#6f6f6f' }}>
                  {workspaceData.description}
                </p>
              </Tile>
            )}
            
            <h1 className="cds--productive-heading-06" style={{ marginBottom: '2rem' }}>
              Data Validation Dashboard
            </h1>

            {/* Progress Indicator */}
            <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <Tag type={currentStep >= 1 ? 'green' : 'gray'}>
                1. Source Database
              </Tag>
              <Tag type={currentStep >= 2 ? 'green' : 'gray'}>
                2. Target Database
              </Tag>
              <Tag type={currentStep >= 3 ? 'green' : 'gray'}>
                3. Comparison Setup
              </Tag>
            </div>

            {isLoading && (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Loading description="Establishing connection..." />
              </div>
            )}
            
            {!isLoading && (
              <div>
                {/* Source Table - Always shown */}
                {renderSourceTable()}
                
                {/* Target Table - Shown after source connection */}
                {currentStep >= 2 && renderTargetTable()}
                
                {/* Comparison Options - Shown after target connection */}
                {currentStep >= 3 && renderComparisonOptions()}
              </div>
            )}
          </div>
        </Column>
      </Grid>
    </div>
  );
};

export default DataValidation;
